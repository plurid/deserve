// #region imports
    // #region external
    import {
        Context,
        InputRegisterOwner,
    } from '#server/data/interfaces';

    import {
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const registerOwner = async (
    input: InputRegisterOwner,
    context: Context,
) => {
    try {
        const {
            identonym,
            key,
        } = input;

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
export default registerOwner;
// #endregion exports
