// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCurrentOwner = async (
    context: Context,
) => {
    try {
        // const {
        //     request,
        // } = context;

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
export default getCurrentOwner;
// #endregion exports
