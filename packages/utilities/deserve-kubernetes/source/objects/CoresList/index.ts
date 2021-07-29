// #region imports
    // #region libraries
    import k8s from '@kubernetes/client-node';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        REQUERY_TIME,
        TUNNEL_PORT,

        CORES_NAMESPACE,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


class CoresList {
    private addresses: Record<string, {
        host: string,
        port: number,
    }> = {};
    private lastQueried: Record<string, number> = {};


    private async getFromIPAddress(
        address: string,
    ) {
        const podQuery = await k8sApi.listNamespacedPod(
            CORES_NAMESPACE,
        );

        const pod = podQuery.body.items.find(pod => pod.status?.podIP === address);
        if (!pod) {
            return false;
        }

        this.addresses[address] = {
            host: address,
            port: TUNNEL_PORT,
        }
        this.lastQueried[address] = Date.now();

        return true;
    }


    public getData() {
        return {
            targets: Object.values(this.addresses),
        };
    }

    /**
     * If the `address` exists
     *   it returns `'exists'`,
     * if the `address` does not exist,
     *   it queries and if it finds the address it returns `'found'`,
     *   else it returns `'not-found'`.
     *
     * @param address
     * @returns
     */
    public async check(
        address: string,
    ) {
        if (this.addresses[address]) {
            return 'exists';
        }

        const found = await this.getFromIPAddress(address);
        if (found) {
            return 'found';
        }

        return 'not-found';
    }


    public async cacheReset () {
        this.addresses = {};
        this.lastQueried = {};
    }
}
// #endregion module



// #region exports
export default CoresList;
// #endregion exports
