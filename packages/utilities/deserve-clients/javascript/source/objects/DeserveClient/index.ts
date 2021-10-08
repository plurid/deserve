// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,
        ClientData,

        ExpirationGet,
    } from '~data/interfaces';

    import {
        ONE_HOUR,
    } from '~data/constants';

    import GraphqlClient from '~objects/GraphqlClient';

    import logic from '~logic/index';

    import {
        resolveOrigin,
        resolveHost,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
interface InternalExpiration {
    function: ExpirationGet;
    value: number | undefined;
    lastQuery: number | undefined;
}


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

    const expiration: InternalExpiration = {
        function: logic.expiration(clientData),
        value: undefined,
        lastQuery: undefined,
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

        expiration: async () => {
            const now = Date.now();

            if (
                typeof expiration.value === 'number'
                && typeof expiration.lastQuery === 'number'
            ) {
                if (now < expiration.lastQuery + ONE_HOUR) {
                    return expiration.value;
                }
            }


            const newExpiration = await expiration.function();

            if (newExpiration.status) {
                expiration.value = newExpiration.data.value;
                expiration.lastQuery = now;

                return expiration.value;
            }


            return ONE_HOUR;
        },
    };
};
// #endregion module



// #region exports
export default DeserveClient;
// #endregion exports
