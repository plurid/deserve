// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        createHttpLink,
        InMemoryCache,
    } from '@apollo/client';
    // #endregion libraries


    // #region external
    import {
        DeserveClientOptions,
    } from '~data/interfaces';

    import {
        resolveURI,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
/**
 * Generates a reusable graphql client
 * to make requests to `<identonym><domain>`
 * where `<domain>` is defined through `options` (`host`)
 * or by the `DESERVE_CLIENT_HOST` environment variable.
 *
 * @param identonym
 * @param token
 * @param options
 * @returns
 */
const GraphqlClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
) => {
    const clientURI = resolveURI(
        identonym,
        options,
    );

    if (!clientURI) {
        return;
    }

    const client = new ApolloClient({
        link: createHttpLink({
            uri: clientURI,
            credentials: 'include',
            fetch,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        }),
        cache: new InMemoryCache(),
    });

    return client;
}
// #endregion module



// #region exports
export default GraphqlClient;
// #endregion exports
