// #region imports
    // #region external
    import {
        Context,

        InputQueryKeys,
        ResponseQueriedKeys,
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
const queryKeys = async (
    input: InputQueryKeys,
    context: Context,
): Promise<ResponseQueriedKeys> => {
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
export default queryKeys;
// #endregion exports
