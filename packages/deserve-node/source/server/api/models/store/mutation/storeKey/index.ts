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
    // #endregion external
// #endregion imports



// #region module
const storeKey = async (
    input: InputStoreKey,
    context: Context,
): Promise<ResponseStoredKey> => {
    try {
        const {
            owner,
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }

        const {
            data,
        } = input;

        const deserveDataCollection = await getDeserveDataCollection();
        if (!deserveDataCollection) {
            return {
                status: false,
            };
        }

        const dataID = owner.id + '-' + uuid.generate();

        database.updateDocument(
            deserveDataCollection,
            dataID,
            data,
        );

        return {
            status: true,
            data: {
                id: dataID,
            },
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default storeKey;
// #endregion exports
