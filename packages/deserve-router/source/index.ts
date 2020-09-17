// #region imports
    // #region libraries
    import express from 'express';

    import bodyParser from 'body-parser';
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

    import mockLogic from './logic/mock';
    // #endregion external
// #endregion imports



// #region module
const server = express();


const main = (
    logic: DeserveRouterLogic,
) => {
    // Middlewares.
    server.use(
        bodyParser.json(),
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
    server.listen(PORT, () => {
        console.log(`\n\tDeserve Router Server on /, port ${PORT}\n\thttp://localhost:${PORT}`);
    });
}


main(
    mockLogic,
);
// #endregion module



// #region exports
export default main;

export {
    server,
};

export * from './data/interfaces';
// #endregion exports
