// #region imports
    // #region libraries
    import express from 'express';

    import {
        json as jsonParser,
    } from 'body-parser';
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
    } from './logic/handlers';
    // #endregion external
// #endregion imports



// #region module
const server: express.Application = express();


const main = (
    logic: DeserveRouterLogic,
) => {
    // Middlewares.
    server.use(
        jsonParser() as any,
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

    if (logic.handleGetPath) {
        server.get(
            '*',
            handlePaths,
        );
    }


    // Listen.
    server.listen(PORT, () => {
        console.log(`\n\tDeserve Router Server on /, port ${PORT}\n\thttp://localhost:${PORT}`);
    });


    return server;
}
// #endregion module



// #region exports
export * from './data/interfaces';

export default main;

export {
    server,
};
// #endregion exports
