// #region imports
    // #region external
    import {
        GraphqlClient,

        BlobsDelete,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const blobsDelete = (
    graphqlClient: GraphqlClient,
): BlobsDelete => async (
    id,
) => {
    return true;
}
// #endregion module



// #region exports
export default blobsDelete;
// #endregion exports
