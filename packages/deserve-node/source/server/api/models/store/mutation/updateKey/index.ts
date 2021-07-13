// #region imports
    // #region external
    import {
        Context,

        InputUpdateKey,
        Response,
    } from '~server/data/interfaces';

    import database, {
        getDeserveKeysCollection,
    } from '~server/services/database';

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
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');

            return {
                status: false,
            };
        }


        const deserveKeysCollection = await getDeserveKeysCollection();
        if (!deserveKeysCollection) {
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
                deserveKeysCollection,
                id,
                'value.' + field,
                dataToObjectOrDefault(data),
            );
        } else {
            await database.updateDocument(
                deserveKeysCollection,
                id,
                {
                    value: dataToObjectOrDefault(data),
                },
            );
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
export default updateKey;
// #endregion exports
