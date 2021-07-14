// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputDeregisterCore,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import tunnelsManager from '~server/services/tunnelsManager';
    // #endregion external
// #endregion imports



// #region module
const deregisterCore = async (
    input: InputDeregisterCore,
    context: Context,
) => {
    try {
        const {
            owner,
            collections,
        } = context;

        if (!owner) {
            delog({
                text: 'deregisterCore no owner',
                level: 'warn',
            });

            return {
                status: false,
            }
        }


        const {
            id,
        } = input;

        const core: any = await database.getById(
            collections.cores,
            id,
        );

        if (!core) {
            return {
                status: false,
            }
        }

        if (core.ownerID !== owner.id) {
            delog({
                text: 'deregisterCore core not owned by owner',
                level: 'warn',
            });

            return {
                status: false,
            }
        }


        tunnelsManager.remove(id);

        await database.deleteDocument(
            collections.cores,
            id,
        );


        delog({
            text: 'deregisterCore success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deregisterCore error',
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
export default deregisterCore;
// #endregion exports
