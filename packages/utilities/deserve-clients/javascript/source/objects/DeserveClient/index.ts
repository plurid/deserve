// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,
        ClientData,
    } from '~data/interfaces';

    import GraphqlClient from '~objects/GraphqlClient';

    import logic from '~logic/index';

    import {
        resolveOrigin,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
const DeserveClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
): IDeserveClient => {
    const clientOrigin = resolveOrigin(
        identonym,
        options,
    );

    const graphqlClient = GraphqlClient(
        clientOrigin,
        token,
    );

    const clientData: ClientData = {
        token,
        clientOrigin,
        graphqlClient,
    };


    return {
        blobs: {
            get: logic.blobs.get(clientData),
            store: logic.blobs.store(clientData),
            delete: logic.blobs.delete(clientData),
            query: logic.blobs.query(clientData),
        },

        keys: {
            get: logic.keys.get(clientData),
            store: logic.keys.store(clientData),
            update: logic.keys.update(clientData),
            delete: logic.keys.delete(clientData),
            query: logic.keys.query(clientData),
        },

        functions: {
            get: logic.functions.get(clientData),
            store: logic.functions.store(clientData),
            update: logic.functions.update(clientData),
            delete: logic.functions.delete(clientData),
            query: logic.functions.query(clientData),
            run: logic.functions.query(clientData),
        },
    };
};
// #endregion module



// #region exports
export default DeserveClient;
// #endregion exports
