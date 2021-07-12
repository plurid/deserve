// #region imports
    // #region external
    import {
        Context,

        InputDeleteKey,

        Response,
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
const deleteKey = async (
    input: InputDeleteKey,
    context: Context,
): Promise<Response> => {
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


        const deserveDataCollection = await getDeserveDataCollection();
        if (!deserveDataCollection) {
            return {
                status: false,
            };
        }


        const {
            id,
        } = input;

        await database.deleteDocument(
            deserveDataCollection,
            id,
        );


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
export default deleteKey;
// #endregion exports
