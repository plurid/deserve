// #region imports
    // #region external
    import {
        Context,

        InputStoreBlob,
        ResponseStoredBlob,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const storeBlob = async (
    input: InputStoreBlob,
    context: Context,
): Promise<ResponseStoredBlob> => {
    try {
        const {
            request,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');

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
