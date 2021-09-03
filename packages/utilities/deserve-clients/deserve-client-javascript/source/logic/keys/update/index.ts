// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysUpdate,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const update = (
    graphqlClient: GraphqlClient,
): KeysUpdate => async (
    id,
) => {
    return true;
}
// #endregion module



// #region exports
export default update;
// #endregion exports
