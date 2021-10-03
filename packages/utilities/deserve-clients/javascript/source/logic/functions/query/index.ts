// #region imports
    // #region external
    import {
        ClientData,

        FunctionsQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_FUNCTIONS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const query = (
    clientData: ClientData,
): FunctionsQuery => async (
    selector,
    count,
    start,
) => {
    try {
        const {
            graphqlClient,
        } = clientData;

        if (!graphqlClient) {
            return {
                status: false,
            };
        }


        const filterInput = typeof selector === 'string'
            ? selector
            : JSON.stringify(selector);

        const request = await graphqlClient.query({
            query: QUERY_QUERY_FUNCTIONS,
            variables: {
                input: {
                    filter: filterInput,
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
