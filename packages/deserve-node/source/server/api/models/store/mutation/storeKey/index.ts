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
        getDeserveCoresCollection,
        getDeserveDataCollection,
    } from '~server/services/database';

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

        const origin = request.header('Host');
        const token = request.header('Deserve-Token');
        // console.log(origin, token);
        if (!origin || !token) {
            return {
                status: false,
            };
        }


        const deserveDataCollection = await getDeserveDataCollection();
        const deserveCoresCollection = await getDeserveCoresCollection();
        if (
            !deserveDataCollection
            || !deserveCoresCollection
        ) {
            return {
                status: false,
            };
        }

        const cores: any[] = await database.getAllWhere(
            deserveCoresCollection,
            {
                token,
            },
        );
        const core = cores[0];
        if (!core) {
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
            dataToObjectOrDefault(data),
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
