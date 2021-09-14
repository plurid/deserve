// #region imports
    // #region external
    import {
        GraphqlClient,

        FunctionsQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_FUNCTIONS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const query = (
    graphqlClient: GraphqlClient,
): FunctionsQuery => async (
    filter,
    count,
    start,
) => {
    try {
        const request = await graphqlClient.query({
            query: QUERY_QUERY_FUNCTIONS,
            variables: {
                input: {
                    filter,
                    count,
                    start,
                },
            },
        });
        const response = request.data.queryFunctions;

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
