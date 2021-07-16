// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


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
            owner,
        } = context;

        const core = await getCoreFromRequest(
            request,
            owner,
            input.coreID,
        );
        if (!core) {
            delog({
                text: 'deleteBlob no core',
                level: 'warn',
            });

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

        const blobData: any = await database.getById(
            collections.blobs,
            id,
        );
        if (!blobData) {
            delog({
                text: 'deleteBlob blob not found',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (blobData.ownerID !== ownerID) {
            delog({
                text: 'deleteBlob unauthorized',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const blobLocation = ownerID + '/' + id;

        const obliterated = await storage.object.obliterate(
            DESERVE_BLOBS,
            blobLocation,
        );

        if (!obliterated) {
            delog({
                text: 'deleteBlob not obliterated',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const deleted = await database.deleteDocument(
            collections.blobs,
            id,
        );

        if (!deleted) {
            delog({
                text: 'deleteBlob not deleted',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        delog({
            text: 'deleteBlob success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deleteBlob error',
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
export default deleteBlob;
// #endregion exports
