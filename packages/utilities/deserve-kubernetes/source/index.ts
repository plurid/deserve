// #region imports
    // #region libraries
    import express from 'express';

    import cors from 'cors';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region internal
    import {
        PORT,

        HOST_PATTERN,
        CORE_PATTERN,

        CACHE_RESET_PATH,
        DEFAULT_CACHE_RESET_TOKEN,
        CACHE_RESET_TOKEN,
    } from './data/constants';

    import CoresList from './objects/CoresList';

    import corsOptions from './utilities/cors';
    // #endregion internal
// #endregion imports



// #region module
const server: express.Application = express();

const coresList = new CoresList();

const logWarnings = () => {
    if (!HOST_PATTERN) {
        delog({
            text: `deserve kubernetes 'DESERVE_HOST_PATTERN' not defined`,
            level: 'warn',
        });
    }

    if (!CORE_PATTERN) {
        delog({
            text: `deserve kubernetes 'DESERVE_CORE_PATTERN' not defined`,
            level: 'warn',
        });
    }

    if (CACHE_RESET_TOKEN === DEFAULT_CACHE_RESET_TOKEN) {
        delog({
            text: `deserve kubernetes 'DESERVE_CACHE_RESET_TOKEN' has default value '${DEFAULT_CACHE_RESET_TOKEN}'`,
            level: 'warn',
        });
    }
}


const main = async () => {
    logWarnings();


    server.options('*', cors(corsOptions) as any);


    server.post(CACHE_RESET_PATH, (
        request,
        response,
        next,
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

        next();
    });

    server.all('*', async (
        request,
        response,
    ) => {
        try {
            const coreRequest = await coresList.get(request);
            if (!coreRequest) {
                response
                    .status(404)
                    .end();
                return;
            }

            response.pipe(coreRequest);
        } catch (error) {
            delog({
                text: `deserve kubernetes error`,
                level: 'error',
                error,
            });

            response
                .status(500)
                .end();
        }
    });


    server.listen(PORT, () => {
        delog({
            text: `deserve kubernetes server started · http://localhost:${PORT}`,
            level: 'info',
        });
    });
}

main();
// #endregion module
