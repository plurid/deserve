// #region imports
    // #region libraries
    import cluster, {
        Worker,
    } from 'cluster';

    import express from 'express';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        TCP_PORT,
        HTTP_PORT,

        CACHE_RESET_PATH,
        CACHE_RESET_TOKEN,

        WORKER_COUNT,
    } from '~data/constants';

    import {
        WorkerMessage,
    } from '~data/interfaces';

    import CoresList from '~objects/CoresList';

    import logWarnings from '~utilities/warnings';
    // #endregion external
// #endregion imports



// #region module
const Primary = () => {
    if (!cluster.isPrimary) {
        return;
    }


    logWarnings();


    cluster.schedulingPolicy = cluster.SCHED_NONE;


    const options = {
        workerCount: WORKER_COUNT,
    };


    const coresList = new CoresList();
    const workers: Worker[] = [];
    let alive = true;
    let terminatedCount = 0;

    const launchWorker = (
        i: number,
    ) => {
        const worker = cluster.fork();

        const message: WorkerMessage = {
            type: 'initialize',
            data: {
                stickiness: true,
                ...coresList.getData(),
            },
        };
        worker.send(message);

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
            const message: WorkerMessage = {
                type: 'destroy',
            };
            worker.send(message);
        }
    });

    process.on('message', (message: any) => {
        switch (message.type) {
            case 'coreCheck':
                break;
        }
    });


    delog({
        text: `deserve kubernetes TCP server started · localhost:${TCP_PORT}`,
        level: 'info',
    });



    const server = express();

    server.post(CACHE_RESET_PATH, (
        request,
        response,
    ) => {
        const cacheResetToken = request.header('Deserve-Cache-Reset-Token');

        if (cacheResetToken === CACHE_RESET_TOKEN) {
            delog({
                text: `deserve kubernetes cache reset`,
                level: 'info',
            });

            coresList.cacheReset();

            response.json({
                status: true,
            });
            return;
        }

        response
            .status(403)
            .json({
                status: false,
            });
    });

    server.listen(HTTP_PORT, () => {
        delog({
            text: `deserve kubernetes HTTP server started · http://localhost:${HTTP_PORT}`,
            level: 'info',
        });
    });
}
// #endregion module



// #region exports
export default Primary;
// #endregion exports
