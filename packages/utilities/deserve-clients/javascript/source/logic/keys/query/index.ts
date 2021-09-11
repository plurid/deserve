// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_KEYS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const query = (
    graphqlClient: GraphqlClient,
): KeysQuery => async (
    filter,
    count,
    start,
) => {
    try {
        const request = await graphqlClient.query({
            query: QUERY_QUERY_KEYS,
            variables: {
                input: {
                    filter,
                    count,
                    start,
                },
            },
        });
        const response = request.data.queryKeys;

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default query;
// #endregion exports
