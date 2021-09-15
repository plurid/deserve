// #region imports
    // #region external
    import {
        ClientData,

        KeysQuery,
    } from '~data/interfaces';

    import {
        QUERY_QUERY_BLOBS,
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
