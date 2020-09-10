// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterCore = async (
    input: any,
    context: Context,
) => {
    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default deregisterCore;
// #endregion exports
