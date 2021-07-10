// #region imports
    // #region external
    import {
        Context,

        InputDeleteKey,

        Response,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deleteKey = async (
    input: InputDeleteKey,
    context: Context,
): Promise<any> => {
    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default deleteKey;
// #endregion exports
