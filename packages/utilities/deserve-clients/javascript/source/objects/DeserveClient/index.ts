// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,
    } from '~data/interfaces';

    import GraphqlClient from '~objects/GraphqlClient';

    import logic from '~logic/index';

    import {
        resolveURI,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
const DeserveClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
): IDeserveClient => {
    const clientOrigin = resolveURI(
        identonym,
        options,
        true,
    );

    const graphqlClient = GraphqlClient(
        identonym,
        token,
        options,
    );


    return {
        blobs: {
            get: logic.blobs.get(clientOrigin, token),
            store: logic.blobs.store(clientOrigin, token),
            delete: logic.blobs.delete(graphqlClient),
            query: logic.blobs.query(graphqlClient),
        },

        keys: {
            get: logic.keys.get(graphqlClient),
            store: logic.keys.store(graphqlClient),
            update: logic.keys.update(graphqlClient),
            delete: logic.keys.delete(graphqlClient),
            query: logic.keys.query(graphqlClient),
        },

        functions: {
            get: logic.functions.get(graphqlClient),
            store: logic.functions.store(graphqlClient),
            update: logic.functions.update(graphqlClient),
            delete: logic.functions.delete(graphqlClient),
            query: logic.functions.query(graphqlClient),
            run: logic.functions.query(graphqlClient),
        },
    };
};
// #endregion module



// #region exports
export default DeserveClient;
// #endregion exports
