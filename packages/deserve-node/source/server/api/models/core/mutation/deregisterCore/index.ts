// #region imports
    // #region external
    import {
        Context,
        InputDeregisterCore,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deregisterCore = async (
    input: InputDeregisterCore,
    context: Context,
) => {
    const {
        id,
    } = input;


    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default deregisterCore;
// #endregion exports
