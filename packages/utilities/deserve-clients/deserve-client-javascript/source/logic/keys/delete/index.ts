// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysDelete,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const keysDelete = (
    graphqlClient: GraphqlClient,
): KeysDelete => async (
    id,
) => {
    return true;
}
// #endregion module



// #region exports
export default keysDelete;
// #endregion exports
