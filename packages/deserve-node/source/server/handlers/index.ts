// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        loadCollections,
    } from '~server/logic/database';

    import Obliterator from '~server/objects/Obliterator';
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

    const obliterator = new Obliterator(
        collections,
    );

    const instance = server.instance();


    const configuration = await setupConfiguration(
        collections,
    );

    const middleware = await setupMiddleware(
        collections,
        instance,
    );

    const graphql = await setupGraphQL(
        collections,
        instance,
        obliterator,
    );

    const blobs = await setupBlobs(
        collections,
        instance,
    );


    const successfulSetup = (
        configuration
        && middleware
        && graphql
        && blobs
    );

    return successfulSetup;
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
