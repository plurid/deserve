// #region imports
    // #region external
    import {
        Context,

        InputDeleteKey,

        Response,
    } from '~server/data/interfaces';

    import database, {
        getDeserveDataCollection,
    } from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const deleteKey = async (
    input: InputDeleteKey,
    context: Context,
): Promise<Response> => {
    try {
        const {
            owner,
        } = context;

        if (!owner) {
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
        } = input;

        await database.deleteDocument(
            deserveDataCollection,
            id,
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
export default deleteKey;
// #endregion exports
