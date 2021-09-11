// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysGet,
    } from '~data/interfaces';

    import {
        QUERY_REQUEST_FUNCTION,
        QUERY_REQUEST_FUNCTIONS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const get = (
    graphqlClient: GraphqlClient,
): KeysGet => async (
    id,
) => {
    try {
        const singular = typeof id === 'string';

        const query = singular
            ? QUERY_REQUEST_FUNCTION
            : QUERY_REQUEST_FUNCTIONS;

        const input = singular
            ? { id }
            : { ids: id };

        const request = await graphqlClient.query({
            query,
            variables: {
                input,
            },
        });


        const responseName = singular
            ? 'requestFunction'
            : 'requestFunctions';

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