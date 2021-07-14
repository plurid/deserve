// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputDeleteKey,

        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const deleteKey = async (
    input: InputDeleteKey,
    context: Context,
): Promise<Response> => {
    try {
        const {
            request,
            collections,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            delog({
                text: 'deleteKey no core',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            id,
        } = input;

        // TODO:
        // mark as deleted
        // and set for obliteration following the obliteration policy

        const deleted = await database.deleteDocument(
            collections.keys,
            id,
        );

        if (!deleted) {
            delog({
                text: 'deleteKey not deleted',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        delog({
            text: 'deleteKey success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deleteKey error',
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
export default deleteKey;
// #endregion exports
