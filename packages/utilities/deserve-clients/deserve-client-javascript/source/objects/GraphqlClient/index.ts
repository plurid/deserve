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
        DESERVE_CLIENT_HOST,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const GraphqlClient = (
    identonym: string,
    token: string,
    options?: DeserveClientOptions,
) => {
    const host = options?.host || DESERVE_CLIENT_HOST;
    if (!host) {
        return;
    }

    const clientURI = identonym + host;
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
