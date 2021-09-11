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
    graphqlClient: GraphqlClient,
): BlobsStore => async (
    id,
) => {
    try {

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
