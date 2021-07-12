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
    try {
        const {
            owner,
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }


        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default storeBlob;
// #endregion exports
