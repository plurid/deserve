// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        DeserveLogic,
    } from '#server/data/interfaces';
    // #endregion external


    // #region internal
    import setupGlobal from './global';
    import setupMiddleware from './middleware';
    import setupGraphQL from './graphql';
    import setupRegistry from './registry';
    // #endregion internal
// #endregion imports



// #region module
const setupHandlers = (
    server: PluridServer,
    logic?: DeserveLogic,
) => {
    const instance = server.instance();

    setupGlobal();
    setupMiddleware(
        instance,
        logic,
    );
    setupGraphQL(
        instance,
        logic,
    );

    setupRegistry(
        instance,
        logic,
    );
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
