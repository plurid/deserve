// #region imports
    // #region external
    import {
        Context,

        InputRequestKey,
        ResponseRequestedKey,
    } from '~server/data/interfaces';

    import database, {
        getDeserveKeysCollection,
    } from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const requestKey = async (
    input: InputRequestKey,
    context: Context,
): Promise<ResponseRequestedKey> => {
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


        const deserveKeysCollection = await getDeserveKeysCollection();
        if (
            !deserveKeysCollection
        ) {
            // console.log('No database');

            return {
                status: false,
            };
        }


        const {
            id,
        } = input;

        const data: any = await database.getById(
            deserveKeysCollection,
            id,
        );

        return {
            status: true,
            data: JSON.stringify(data.value),
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default requestKey;
// #endregion exports
