// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        loadCollections,
    } from '~server/logic/database';
    // #endregion external


    // #region internal
    import setupConfiguration from './configuration';
    import setupMiddleware from './middleware';
    import setupGraphQL from './graphql';
    import setupBlobs from './blobs';
    // #endregion internal
// #endregion imports



// #region module
const setupHandlers = async (
    server: PluridServer,
) => {
    const collections = await loadCollections();
    if (!collections) {
        console.log('deserve node :: database not loaded');
        return false;
    }

    await setupConfiguration(
        collections,
    );


    const instance = server.instance();

    await setupMiddleware(
        collections,
        instance,
    );

    await setupGraphQL(
        collections,
        instance,
    );

    await setupBlobs(
        collections,
        instance,
    );

    return true;
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
