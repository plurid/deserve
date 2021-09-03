// #region imports
    // #region external
    import {
        GraphqlClient,

        KeysQuery,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const query = (
    graphqlClient: GraphqlClient,
): KeysQuery => async (
    filter,
    count,
    start,
) => {
    return undefined;
}
// #endregion module



// #region exports
export default query;
// #endregion exports
