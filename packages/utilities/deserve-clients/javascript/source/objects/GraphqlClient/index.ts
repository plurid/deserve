// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        createHttpLink,
        InMemoryCache,
    } from '@apollo/client/core';
    // #endregion libraries


    // #region external
    import {
        GRAPHQL_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
/**
 * Generates a reusable GraphQL client to make requests to the `clientOrigin`
 * with the adequate `token`.
 *
 * @param clientOrigin
 * @param token
 * @returns
 */
const GraphqlClient = (
    clientOrigin: string | undefined,
    clientHost: string,
    token: string,
) => {
    if (!clientOrigin) {
        return;
    }

    const client = new ApolloClient({
        link: createHttpLink({
            uri: clientOrigin + GRAPHQL_PATH,
            credentials: 'include',
            fetch,
            headers: {
                'Deserve-Token': `${token}`,
                'Host': clientHost,
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
