// #region imports
    // #region libraries
    import express from 'express';

    import {
        json as jsonParser,
    } from 'body-parser';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DeserveRequest,
        DeserveRouterLogic,
    } from './data/interfaces';

    import {
        PORT,
        REGISTRATION_PATH,
    } from './data/constants';

    import {
        handlePaths,
        handleRegistration,
    } from './handlers';
    // #endregion external
// #endregion imports



// #region module
const server: express.Application = express();


const main = (
    logic: DeserveRouterLogic,
) => {
    if (!logic.handleGetPath) {
        delog({
            text: 'deserve router handleGetPath not defined',
            level: 'trace',
        });
    }


    // Middlewares.
    server.use(
        jsonParser(),
        (request, _, next) => {
            (request as DeserveRequest).deserveLogic = logic;
            next();
        },
    );


    // Paths.
    server.post(
        REGISTRATION_PATH,
        handleRegistration,
    );

    server.get(
        '*',
        handlePaths,
    );


    // Listen.
    const httpServer = server.listen(PORT, () => {
        delog({
            text: `deserve router server started · http://localhost:${PORT}`,
            level: 'info',
        });
    });


    return {
        expressServer: server,
        httpServer,
    };
}
// #endregion module



// #region exports
export * from './data/interfaces';

export {
    server,
};

export default main;
// #endregion exports
