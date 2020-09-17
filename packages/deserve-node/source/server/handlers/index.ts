// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


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
) => {
    const instance = server.instance();

    setupGlobal();
    setupMiddleware(
        instance,
    );
    setupGraphQL(
        instance,
    );

    setupRegistry(
        instance,
    );
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
