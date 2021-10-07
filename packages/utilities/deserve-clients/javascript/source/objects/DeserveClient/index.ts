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
        resolveHost,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
/**
 * Generates a reusable deserve client
 * to make requests to the `identonym`'s deserve core.
 *
 * ```
 * // global host to be used to form the client origin
 * process.env.DESERVE_CLIENT_HOST = '.data.example.com';
 * const deserveClient = DeserveClient('identonym', 'token');
 *
 * // or custom client origin
 * // const deserveClient = DeserveClient(
 * //    'identonym',
 * //    'token',
 * //    { origin: 'https://custom.client.origin' },
 * // );
 *
 * const blob = await deserveClient.blobs.get('blob-id');
 * const key = await deserveClient.keys.get('key-id');
 * ````
 *
 * @param identonym
 * @param token
 * @param options
 * @returns
 */
const DeserveClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
): IDeserveClient => {
    const clientOrigin = resolveOrigin(
        identonym,
        options,
    );
    const clientHost = resolveHost(
        clientOrigin,
        options,
    );

    const graphqlClient = GraphqlClient(
        clientOrigin,
        clientHost,
        token,
    );

    const clientData: ClientData = {
        token,
        clientOrigin,
        clientHost,
        graphqlClient,
    };


    return {
        blobs: {
            get: logic.blobs.get(clientData),
            partial: logic.blobs.partial(clientData),
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
