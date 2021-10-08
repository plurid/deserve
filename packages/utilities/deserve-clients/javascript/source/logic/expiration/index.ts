// #region imports
    // #region external
    import {
        ClientData,

        ExpirationGet,
    } from '~data/interfaces';

    import {
        QUERY_EXPIRATION,
    } from '~services/graphql';
    // #endregion external
// #endregion imports



// #region module
const get = (
    clientData: ClientData,
): ExpirationGet => async () => {
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
            query: QUERY_EXPIRATION,
        });

        const response = request.data.expiration;

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
