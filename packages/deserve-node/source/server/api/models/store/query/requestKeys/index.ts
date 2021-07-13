// #region imports
    // #region external
    import {
        Context,

        InputRequestKeys,
        ResponseRequestedKeys,

        Key,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

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
            collections,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');

            return {
                status: false,
            };
        }


        const {
            ids,
        } = input;

        const data: Key[] = [];

        for (const id of ids) {
            const idData: any = await database.getById(
                collections.keys,
                id,
            );

            const {
                value,
                storedAt,
                updatedAt,
            } = idData;

            data.push({
                value: JSON.stringify(value),
                storedAt,
                updatedAt,
            });
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
