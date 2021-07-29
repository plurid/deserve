// #region imports
    // #region libraries
    import cluster from 'cluster';
    // #endregion libraries


    // #region external
    import LoadBalancer from '~objects/LoadBalancer';
    // #endregion external
// #endregion imports



// #region module
export const BALANCER_CLOSE_TIMEOUT = 10_000;


export type WorkerMessage =
    | {
        type: 'initialize';
        data: any;
    }
    | {
        type: 'destroy';
    };


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
                        console.log(error.stack || error.message);
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
                        BALANCER_CLOSE_TIMEOUT,
                    );
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    });
}
// #endregion module



// #region exports
export default Worker;
// #endregion exports
