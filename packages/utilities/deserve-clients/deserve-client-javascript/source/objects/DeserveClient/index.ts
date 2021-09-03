// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,
    } from '~data/interfaces';

    import GraphqlClient from '~objects/GraphqlClient';

    import logic from '~logic/index';
    // #endregion external
// #endregion imports



// #region module
const DeserveClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
): IDeserveClient | undefined => {
    // generate a reusable graphqlClient
    // which will make calls to identonym.data.example.com
    // where '.data.example' is defined through options (host) or environment variable
    const graphqlClient = GraphqlClient(identonym, token, options);
    if (!graphqlClient) {
        return;
    }


    return {
        blobs: {
            get: logic.blobs.get(graphqlClient),
            store: logic.blobs.store(graphqlClient),
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
    };
};
// #endregion module



// #region exports
export default DeserveClient;
// #endregion exports
