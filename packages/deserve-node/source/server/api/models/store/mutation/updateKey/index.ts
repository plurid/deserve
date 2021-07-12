// #region imports
    // #region external
    import {
        Context,

        InputUpdateKey,
        Response,
    } from '~server/data/interfaces';

    import database, {
        getDeserveDataCollection,
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


        const deserveDataCollection = await getDeserveDataCollection();
        if (!deserveDataCollection) {
            return {
                status: false,
            };
        }


        const {
            id,
            data,
        } = input;

        await database.updateDocument(
            deserveDataCollection,
            id,
            {
                value: dataToObjectOrDefault(data),
            },
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
