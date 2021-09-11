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
        DATABASE_ENDPOINT,
        EVENT_TOKEN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const client = new ApolloClient({
    link: createHttpLink({
        uri: DATABASE_ENDPOINT,
        credentials: 'include',
        fetch,
        headers: {
            'Deserve-Functioner': EVENT_TOKEN,
        },
    }),
    cache: new InMemoryCache(),
});
// #endregion module



// #region exports
export default client;
// #endregion exports
