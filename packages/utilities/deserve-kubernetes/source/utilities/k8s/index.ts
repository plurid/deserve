// #region imports
    // #region libraries
    import k8s from '@kubernetes/client-node';
    // #endregion libraries


    // #region external
    import {
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

export const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


/**
 * Obtains `identonym` from `host`.
 *
 * e.g. from the `host` `'one.data.domain.example'` obtains the `identonym` `'one'`,
 * given that the `HOST_PATTERN` is `'.data.domain.example'`
 *
 * @param host
 * @returns
 */
export const identonymFromHost = (
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
export const hostFromAppSelector = (
    selector: string | undefined,
) => {
    if (!selector) {
        return;
    }

    const identonym = selector.replace(CORE_PATTERN, '');
    const host = identonym + HOST_PATTERN;
    return host;
}


export const serviceQuery = async (
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
// #endregion module
