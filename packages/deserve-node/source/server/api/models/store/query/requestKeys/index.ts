// #region imports
    // #region external
    import {
        Context,

        InputRequestKeys,
        ResponseRequestedKeys,
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
            ids,
        } = input;

        const data = [];

        for (const id of ids) {
            const idData: any = await database.getById(
                deserveKeysCollection,
                id,
            );
            data.push(JSON.stringify(idData.value));
        }


        return {
            status: true,
            data,
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
