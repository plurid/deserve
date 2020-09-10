// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCores = async (
    context: Context,
) => {
    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default getCores;
// #endregion exports
