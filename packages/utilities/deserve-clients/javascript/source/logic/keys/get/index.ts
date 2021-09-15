// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysGet,
    } from '~data/interfaces';

    import {
        QUERY_REQUEST_KEY,
        QUERY_REQUEST_KEYS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const get = (
    graphqlClient: GraphqlClient | undefined,
): KeysGet => async (
    id,
) => {
    try {
        if (!graphqlClient) {
            return {
                status: false,
            };
        }

        const singular = typeof id === 'string';

        const query = singular
            ? QUERY_REQUEST_KEY
            : QUERY_REQUEST_KEYS;

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
            ? 'requestKey'
            : 'requestKeys';

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
