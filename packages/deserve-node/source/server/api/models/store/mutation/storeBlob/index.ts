// #region imports
    // #region external
    import {
        Context,

        InputStoreBlob,
        ResponseStoredBlob,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const storeBlob = async (
    input: InputStoreBlob,
    context: Context,
): Promise<any> => {
    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default storeBlob;
// #endregion exports
