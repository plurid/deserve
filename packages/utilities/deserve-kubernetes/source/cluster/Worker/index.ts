// #region imports
    // #region libraries
    import cluster from 'cluster';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        WORKER_CLOSE_TIMEOUT,
    } from '~data/constants';

    import {
        WorkerMessage,
    } from '~data/interfaces';

    import LoadBalancer from '~objects/LoadBalancer';
    // #endregion external
// #endregion imports



// #region module
const Worker = () => {
    if (!cluster.isWorker) {
        return;
    }


    let balancer: LoadBalancer | null = null;

    process.on('message', (
        message: WorkerMessage,
    ) => {
        try {
            switch (message.type) {
                case 'initialize':
                    balancer = new LoadBalancer(message.data);

                    balancer.on('error', (error: NodeJS.ErrnoException) => {
                        delog({
                            text: `deserve kubernetes Worker balancer error`,
                            level: 'error',
                            error,
                        });
                    });

                    break;
                case 'destroy':
                    if (balancer) {
                        balancer.close(() => {
                            process.exit();
                        });
                    }

                    // If the balancer takes too long to close.
                    setTimeout(
                        () => {
                            process.exit();
                        },
                        WORKER_CLOSE_TIMEOUT,
                    );
                    break;
            }
        } catch (error) {
            delog({
                text: `deserve kubernetes Worker error`,
                level: 'error',
                error,
            });
        }
    });
}
// #endregion module



// #region exports
export default Worker;
// #endregion exports
