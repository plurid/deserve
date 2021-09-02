// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,
    } from '~data/interfaces';

    import GraphqlClient from '~objects/GraphqlClient';
    // #endregion external
// #endregion imports



// #region module
const DeserveClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
): IDeserveClient => {
    // generate a reusable graphqlClient
    // which will make calls to identonym.data.example.com
    // where '.data.example' is defined through options (host) or environment variable
    const graphqlClient = GraphqlClient(identonym, token, options);

    return {
        blobs: {
            get: async (
                id,
            ) => {
                return undefined;
            },
        },

        keys: {
            get: async (
                id,
            ) => {
                return undefined;
            },
        },
    };
};
// #endregion module



// #region exports
export default DeserveClient;
// #endregion exports
