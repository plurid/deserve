// #region imports
    // #region libraries
    import k8s from '@kubernetes/client-node';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        APP_SELECTOR,
        HOST_PATTERN,
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


/**
 * Obtains `identonym` from `host`.
 *
 * e.g. from the `host` `'one.data.domain.example'` obtains the `identonym` `'one'`,
 * given that the `HOST_PATTERN` is `'.data.domain.example'`
 *
 * @param host
 * @returns
 */
const identonymFromHost = (
    host: string,
) => {
    return host.replace(HOST_PATTERN, '');
}


/**
 * Obtains `host` from the pod's `app` selector.
 *
 * e.g., from the `selector` `'domain-example-data-core-one'` obtains the `host` `'one.data.domain.example'`,
 * given that the `CORE_PATTERN` is `'domain-example-data-core-'`
 * and the `HOST_PATTERN` is `'.data.domain.example'`.
 *
 * @param selector
 * @returns
 */
const hostFromAppSelector = (
    selector: string | undefined,
) => {
    if (!selector) {
        return;
    }

    const identonym = selector.replace(CORE_PATTERN, '');
    const host = identonym + HOST_PATTERN;
    return host;
}


const serviceQuery = async (
    identonym: string,
) => {
    const serviceName = CORE_PATTERN.replace('#IDENTONYM', identonym);

    const serviceQuery = await k8sApi.readNamespacedService(
        serviceName,
        CORES_NAMESPACE,
    );

    const selectors = serviceQuery.body.spec?.selector;
    if (!selectors) {
        return;
    }
    const selector = selectors[APP_SELECTOR];
    if (!selector) {
        return;
    }

    const podQuery = await k8sApi.listNamespacedPod(
        CORES_NAMESPACE,
        undefined,
        undefined,
        undefined,
        undefined,
        `${APP_SELECTOR}=${selector}`,
    );
    const pod = podQuery.body.items.shift();
    if (!pod) {
        return;
    }

    return pod.status?.podIP;
}


export interface CoreAddress {
    host: string;
    port: number;
}



class CoresList {
    private addresses: Record<string, CoreAddress | undefined> = {};
    private lastQueried: Record<string, number | undefined> = {};


    private async getPods() {
        const coreStartName = CORE_PATTERN.replace('#IDENTONYM', '');

        const podQuery = await k8sApi.listNamespacedPod(
            CORES_NAMESPACE,
        );
        const pods = [
            ...podQuery
                .body
                .items
                .filter(pod => pod.metadata?.name?.startsWith(coreStartName)),
        ];
        return pods;
    }


    private async queryAddress(
        host: string,
    ) {
        if (this.addresses[host] && this.lastQueried[host] ) {
            if ((this.lastQueried[host] as any) > Date.now() - REQUERY_TIME) {
                return this.addresses[host];
            }
        }

        const identonym = identonymFromHost(host);
        if (!identonym) {
            delog({
                text: `deserve kubernetes no identonym from host '${host}'`,
                level: 'warn',
            });

            return;
        }

        const ipAddress = await serviceQuery(identonym);
        if (!ipAddress) {
            delog({
                text: `deserve kubernetes no IP address for identonym '${identonym}'`,
                level: 'warn',
            });

            return;
        }

        const serviceAddress = {
            host: ipAddress,
            port: TUNNEL_PORT,
        };

        this.addresses[host] = serviceAddress;
        this.lastQueried[host] = Date.now();

        return serviceAddress;
    }


    public async loadAddresses() {
        const pods = await this.getPods();

        for (const pod of pods) {
            const host = pod.metadata?.labels
                ? hostFromAppSelector(pod.metadata?.labels[APP_SELECTOR])
                : '';
            if (!host) {
                continue;
            }

            const podIP = pod.status?.podIP;
            if (!podIP) {
                continue;
            }

            this.addresses[host] = {
                host: podIP,
                port: TUNNEL_PORT,
            };
            this.lastQueried[host] = Date.now();
        }
    }

    public getData() {
        return {
            targets: Object.values(this.addresses),
        };
    }

    public getAddress(
        host: string,
    ) {
        return this.addresses[host];
    }

    /**
     * If the `host` exists
     *   it returns `'exists'`,
     * if the `host` does not exist,
     *   it queries and if it finds the host it returns `'found'`,
     *   else it returns `'not-found'`.
     *
     * @param host
     * @returns
     */
    public async check(
        host: string,
    ) {
        delog({
            text: `deserve kubernetes TCP server CoresList check address ${host}`,
            level: 'trace',
        });

        if (this.addresses[host]) {
            return 'exists';
        }

        const found = await this.queryAddress(host);
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
