// #region imports
    // #region libraries
    import delog from '@plurid/delog';

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
            delog({
                text: 'storeKey no core',
                level: 'warn',
            });

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

        const stored = await database.updateDocument(
            collections.keys,
            dataID,
            {
                ownerID,
                storedAt,
                sha: keySHA,
                value,
            },
        );

        if (!stored) {
            delog({
                text: 'storeKey not stored',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        delog({
            text: 'storeKey success',
            level: 'trace',
        });


        return {
            status: true,
            data: {
                id: dataID,
            },
        };
    } catch (error) {
        delog({
            text: 'storeKey error',
            level: 'error',
            error,
        });

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default storeKey;
// #endregion exports
