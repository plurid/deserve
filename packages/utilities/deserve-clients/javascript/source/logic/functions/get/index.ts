// #region imports
    // #region external
    import {
        GraphqlClient,

        FunctionsGet,
    } from '~data/interfaces';

    import {
        QUERY_GET_FUNCTION,
        QUERY_GET_FUNCTIONS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const get = (
    graphqlClient: GraphqlClient,
): FunctionsGet => async (
    value,
    type,
) => {
    try {
        const singular = typeof value === 'string';

        const query = singular
            ? QUERY_GET_FUNCTION
            : QUERY_GET_FUNCTIONS;

        const input = singular
            ? {
                id: value,
                type,
            } : {
                ids: value,
                type
            };

        const request = await graphqlClient.query({
            query,
            variables: {
                input,
            },
        });


        const responseName = singular
            ? 'getFunction'
            : 'getFunctions';

        const response = request.data[responseName];

        return response;
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
