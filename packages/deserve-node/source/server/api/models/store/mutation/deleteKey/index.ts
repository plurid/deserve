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
            owner,
        } = context;

        const core = await getCoreFromRequest(
            collections,
            request,
            owner,
            input.coreID,
        );
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

        const {
            ownerID,
        } = core;

        // TODO:
        // mark as deleted
        // and set for obliteration following the obliteration policy

        const keyData: any = await database.getById(
            collections.keys,
            id,
        );
        if (!keyData) {
            delog({
                text: 'deleteKey key not found',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (keyData.ownerID !== ownerID) {
            delog({
                text: 'deleteKey unauthorized',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (keyData.deleted) {
            delog({
                text: 'deleteKey already deleted',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const markedDeleted = await database.updateDocument(
            collections.keys,
            id,
            {
                deleted: true,
                deletedAt: Date.now(),
            },
        );
        if (!markedDeleted) {
            delog({
                text: 'deleteKey not marked deleted',
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
