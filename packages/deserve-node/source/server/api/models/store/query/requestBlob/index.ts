// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputRequestBlob,
        ResponseRequestedBlob,
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
const requestBlob = async (
    input: InputRequestBlob,
    context: Context,
): Promise<ResponseRequestedBlob> => {
    try {
        const {
            request,
            collections,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            delog({
                text: 'requestBlob no core',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            id,
        } = input;

        const query: any = await database.getById(
            collections.blobs,
            id,
        );
        if (!query) {
            delog({
                text: 'requestBlob not found',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        const data = blobFromData(query);


        delog({
            text: 'requestBlob success',
            level: 'trace',
        });


        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'requestBlob error',
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
export default requestBlob;
// #endregion exports
