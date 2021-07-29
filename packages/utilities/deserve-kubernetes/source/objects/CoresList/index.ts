// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';

    import k8s from '@kubernetes/client-node';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        REQUERY_TIME,
        TUNNEL_PORT,

        APP_SELECTOR,
        HOST_PATTERN,
        CORE_PATTERN,

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
 * e.g. from the `host` `'one.data.domain.com'` obtains the `identonym` `'one'`,
 * given that the `HOST_PATTERN` is `'.data.domain.com'`
 *
 * @param host
 * @returns
 */
const identonymFromHost = (
    host: string,
) => {
    return host.replace(HOST_PATTERN, '');
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


class CoresList {
    private addresses: Record<string, {
        host: string,
        port: number,
    }> = {};
    private lastQueried: Record<string, number> = {};


    private async getAddress(
        host: string,
    ) {
        if (this.addresses[host]) {
            if (this.lastQueried[host] > Date.now() - REQUERY_TIME) {
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


    public async get(
        request: Request,
    ) {
        try {
            const host = request.header('host');

            delog({
                text: `deserve kubernetes request ${request.method} ${host}`,
                level: 'trace',
            });

            if (!host) {
                delog({
                    text: `deserve kubernetes no host`,
                    level: 'warn',
                });

                return;
            }

            const serviceAddress = await this.getAddress(host);
            if (!serviceAddress) {
                delog({
                    text: `deserve kubernetes no serviceAddress`,
                    level: 'warn',
                });

                return;
            }

            return serviceAddress;
        } catch (error) {
            delog({
                text: `deserve kubernetes CoresList.get error`,
                level: 'error',
                error,
            });

            return;
        }
    }

    public getData() {
        return {
            targets: this.addresses,
        };
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
