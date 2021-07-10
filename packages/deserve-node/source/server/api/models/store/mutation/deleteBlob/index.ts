// #region imports
    // #region external
    import {
        Context,

        InputDeleteBlob,

        Response,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deleteBlob = async (
    input: InputDeleteBlob,
    context: Context,
): Promise<any> => {
    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default deleteBlob;
// #endregion exports
