// #region imports
    // #region libraries
    import os from 'os';
    import cluster, {
        Worker,
    } from 'cluster';
    // #endregion libraries


    // #region external
    import CoresList from '~objects/CoresList';
    // #endregion external
// #endregion imports



// #region module
const Primary = () => {
    if (!cluster.isPrimary) {
        return;
    }

    cluster.schedulingPolicy = cluster.SCHED_NONE;


    const options = {
        workerCount: os.cpus().length,
    };


    const coresList = new CoresList();
    const workers: Worker[] = [];
    let alive = true;
    let terminatedCount = 0;

    const launchWorker = (
        i: number,
    ) => {
        const worker = cluster.fork();

        worker.send({
            type: 'initialize',
            data: coresList.getData(),
        });

        workers[i] = worker;

        worker.on('exit', () => {
            const overProvided = ++terminatedCount >= workers.length;

            if (alive) {
                launchWorker(i);
            } else if (overProvided) {
                process.exit();
            }
        });
    };


    for (let i = 0; i < options.workerCount; i++) {
        launchWorker(i);
    }


    process.on('SIGTERM',(_) => {
        alive = false;

        for (const worker of workers) {
            worker.send({
                type: 'destroy',
            });
        }
    });
}
// #endregion module



// #region exports
export default Primary;
// #endregion exports
