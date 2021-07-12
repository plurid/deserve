// #region imports
    // #region external
    import {
        Context,

        InputRequestKeys,
        ResponseRequestedKeys,
    } from '~server/data/interfaces';

    import database, {
        getDeserveDataCollection,
    } from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const requestKeys = async (
    input: InputRequestKeys,
    context: Context,
): Promise<ResponseRequestedKeys> => {
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
export default requestKeys;
// #endregion exports
