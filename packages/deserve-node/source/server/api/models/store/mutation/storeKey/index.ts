// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputStoreKey,
        ResponseStoredKey,
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
const storeKey = async (
    input: InputStoreKey,
    context: Context,
): Promise<ResponseStoredKey> => {
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
        if (
            !deserveDataCollection
        ) {
            // console.log('No database');

            return {
                status: false,
            };
        }


        const {
            data,
        } = input;

        const dataID = core.ownerID + '-' + uuid.generate();

        await database.updateDocument(
            deserveDataCollection,
            dataID,
            {
                value: dataToObjectOrDefault(data),
            },
        );


        return {
            status: true,
            data: {
                id: dataID,
            },
        };
    } catch (error) {
        // console.log('Error', error);

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default storeKey;
// #endregion exports
