const k8s = require('@kubernetes/client-node');



const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);


const read = async () => {
    const serviceQuery = await k8sApi.readNamespacedService(
        'plurid-xxx-backends-servers-data-core-identonym',
        'default',
    );

    const selectors = serviceQuery.body.spec?.selector;
    if (!selectors) {
        return;
    }
    const selector = selectors.app;
    if (!selector) {
        return;
    }

    const podQuery = await k8sApi.listNamespacedPod(
        'default',
        undefined,
        undefined,
        undefined,
        undefined,
        `app=${selector}`,
    );
    const pod = podQuery.body.items.shift();
    if (!pod) {
        return;
    }
    return pod.status.podIP;
}


const main = async () => {
    const podIP = await read();
    console.log(podIP);
}

main();
