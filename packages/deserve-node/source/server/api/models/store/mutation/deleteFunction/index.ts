// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputDeleteFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const deleteFunction = async (
    input: InputDeleteFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;

        const {
            id,
        } = input;

        const core = await getCoreFromRequest(
            collections,
            request,
        );

        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const functionData = await database.getById<any>(
            collections.functions,
            id,
        );

        if (!functionData) {
            return {
                status: false,
            };
        }

        if (functionData.ownerID !== ownerID) {
            delog({
                text: 'deleteFunction unauthorized',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (functionData.deleted) {
            return {
                status: false,
            };
        }


        const markedDeleted = await database.updateDocument(
            collections.functions,
            id,
            {
                deleted: true,
                deletedAt: Date.now(),
            },
        );
        if (!markedDeleted) {
            return {
                status: false,
            };
        }


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deleteFunction error',
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
export default deleteFunction;
// #endregion exports
