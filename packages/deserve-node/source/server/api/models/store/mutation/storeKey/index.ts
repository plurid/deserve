// #region imports
    // #region libraries
    import {
        uuid,
        sha,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputStoreKey,
        ResponseStoredKey,
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
const storeKey = async (
    input: InputStoreKey,
    context: Context,
): Promise<ResponseStoredKey> => {
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
            data,
        } = input;

        const {
            ownerID,
        } = core;

        const dataID = ownerID + '/' + uuid.generate() + uuid.generate() + uuid.generate();
        const storedAt = Date.now();
        const keySHA = await sha.compute(ownerID + storedAt + data);
        const value = dataToObjectOrDefault(data);

        await database.updateDocument(
            collections.keys,
            dataID,
            {
                ownerID,
                storedAt,
                sha: keySHA,
                value,
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
