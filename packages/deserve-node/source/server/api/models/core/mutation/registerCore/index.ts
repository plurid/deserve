// #region imports
    // #region external
    import {
        Context,
        InputRegisterCore,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const registerCore = async (
    input: InputRegisterCore,
    context: Context,
) => {
    const {
        domain,
    } = input;


    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default registerCore;
// #endregion exports
