// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_BLOBS,
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
            query: QUERY_QUERY_BLOBS,
            variables: {
                input: {
                    filter,
                    count,
                    start,
                },
            },
        });
        const response = request.data.queryBlobs;

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
