// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysGet,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const get = (
    graphqlClient: GraphqlClient,
): KeysGet => async (
    id,
) => {
    return undefined;
}
// #endregion module



// #region exports
export default get;
// #endregion exports
