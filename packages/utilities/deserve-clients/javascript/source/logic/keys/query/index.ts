// #region imports
    // #region external
    import {
        ClientData,

        KeysQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_KEYS,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const query = (
    clientData: ClientData,
): KeysQuery => async (
    filter,
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


        const filterInput = typeof filter === 'string'
            ? filter
            : JSON.stringify(filter);

        const request = await graphqlClient.query({
            query: QUERY_QUERY_KEYS,
            variables: {
                input: {
                    filter: filterInput,
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
