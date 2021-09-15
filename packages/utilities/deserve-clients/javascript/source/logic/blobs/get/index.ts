// #region imports
    // #region external
    import {
        GraphqlClient,

        BlobsGet,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const get = (
    graphqlClient: GraphqlClient | undefined,
): BlobsGet => async (
    id,
) => {
    try {
        if (!graphqlClient) {
            return {
                status: false,
            };
        }

        return {
            status: false,
        };
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
