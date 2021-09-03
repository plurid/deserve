// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysStore,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const store = (
    graphqlClient: GraphqlClient,
): KeysStore => async (
    id,
) => {
    return {};
}
// #endregion module



// #region exports
export default store;
// #endregion exports
