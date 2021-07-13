// #region imports
    // #region external
    import {
        Context,

        InputUpdateKey,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        dataToObjectOrDefault,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const updateKey = async (
    input: InputUpdateKey,
    context: Context,
): Promise<Response> => {
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
            id,
            data,
            field,
        } = input;

        if (field) {
            await database.updateField(
                collections.keys,
                id,
                'value.' + field,
                dataToObjectOrDefault(data),
            );
        } else {
            await database.updateField(
                collections.keys,
                id,
                'value',
                dataToObjectOrDefault(data),
            );
        }

        await database.updateField(
            collections.keys,
            id,
            'updatedAt',
            Date.now(),
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
export default updateKey;
// #endregion exports
