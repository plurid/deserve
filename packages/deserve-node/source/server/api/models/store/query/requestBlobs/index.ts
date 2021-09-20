// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputRequestBlobs,
        ResponseRequestedBlobs,

        Blob,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        blobFromData,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const requestBlobs = async (
    input: InputRequestBlobs,
    context: Context,
): Promise<ResponseRequestedBlobs> => {
    try {
        const {
            request,
            collections,
        } = context;

        const core = await getCoreFromRequest(
            collections,
            request,
        );
        if (!core) {
            delog({
                text: 'requestBlobs no core',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            ids,
        } = input;

        const data: Blob[] = [];

        for (const id of ids) {
            const idData: any = await database.getById(
                collections.blobs,
                id,
            );

            if (!idData) {
                continue;
            }

            const blob = blobFromData(idData);
            data.push(blob);
        }


        delog({
            text: 'requestBlobs success',
            level: 'trace',
        });


        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'requestBlobs error',
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
export default requestBlobs;
// #endregion exports
