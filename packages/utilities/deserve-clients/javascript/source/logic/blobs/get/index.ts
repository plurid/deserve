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
    graphqlClient: GraphqlClient,
): BlobsGet => async (
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
export default get;
// #endregion exports
