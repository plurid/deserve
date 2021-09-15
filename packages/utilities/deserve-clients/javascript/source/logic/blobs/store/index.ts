// #region imports
    // #region external
    import {
        GraphqlClient,

        BlobsStore,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const store = (
    graphqlClient: GraphqlClient | undefined,
): BlobsStore => async (
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
export default store;
// #endregion exports
