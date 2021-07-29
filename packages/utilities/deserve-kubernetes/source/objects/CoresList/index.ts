// #region imports
    // #region libraries
    import k8s from '@kubernetes/client-node';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        CORE_PATTERN,

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


    private async getPods() {
        const podQuery = await k8sApi.listNamespacedPod(
            CORES_NAMESPACE,
        );
        const pods = [
            ...podQuery
                .body
                .items
                .filter(pod => pod.metadata?.name?.startsWith(CORE_PATTERN)),
        ];
        return pods;
    }

    private async getFromIPAddress(
        address: string,
    ) {
        delog({
            text: `deserve kubernetes TCP server CoresList getFromIPAddress ${address}`,
            level: 'trace',
        });

        const pods = await this.getPods();
        const pod = pods.find(pod => pod.status?.podIP === address);
        if (!pod) {
            delog({
                text: `deserve kubernetes TCP server CoresList getFromIPAddress pod not found for ${address}`,
                level: 'warn',
            });

            return false;
        }

        this.addresses[address] = {
            host: address,
            port: TUNNEL_PORT,
        };
        this.lastQueried[address] = Date.now();

        return true;
    }


    public async loadAddresses() {
        const pods = await this.getPods();

        for (const pod of pods) {
            const podIP = pod.status?.podIP;
            if (!podIP) {
                continue;
            }

            this.addresses[podIP] = {
                host: podIP,
                port: TUNNEL_PORT,
            };
            this.lastQueried[podIP] = Date.now();
        }
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
        delog({
            text: `deserve kubernetes TCP server CoresList check address ${address}`,
            level: 'trace',
        });

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
