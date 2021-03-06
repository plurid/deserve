// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region internal
    import setupMiddleware from './middleware';
    import setupGraphQL from './graphql';
    import setupBlobs from './blobs';
    // #endregion internal
// #endregion imports



// #region module
const setupHandlers = (
    server: PluridServer,
) => {
    const instance = server.instance();

    setupMiddleware(
        instance,
    );

    setupGraphQL(
        instance,
    );

    setupBlobs(
        instance,
    );
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
