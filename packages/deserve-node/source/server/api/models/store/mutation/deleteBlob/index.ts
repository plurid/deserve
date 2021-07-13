// #region imports
    // #region external
    import {
        Context,

        InputDeleteBlob,

        Response,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import storage, {
        DESERVE_BLOBS,
    } from '~server/services/storage';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const deleteBlob = async (
    input: InputDeleteBlob,
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
        } = input;

        const {
            ownerID,
        } = core;

        // TODO:
        // mark as deleted
        // and set for obliteration following the obliteration policy

        const blobID = ownerID + '/' + id;

        const obliterated = await storage.object.obliterate(
            DESERVE_BLOBS,
            blobID,
        );

        if (!obliterated) {
            return {
                status: false,
            };
        }


        await database.deleteDocument(
            collections.blobs,
            blobID,
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
export default deleteBlob;
// #endregion exports
