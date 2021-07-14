// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputValueString,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import tunnelsManager from '~server/services/tunnelsManager';
    // #endregion external
// #endregion imports



// #region module
const deactivateCore = async (
    input: InputValueString,
    context: Context,
) => {
    try {
        const {
            owner,
            collections,
        } = context;

        if (!owner) {
            delog({
                text: 'deactivateCore no owner',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            value: id,
        } = input;

        const databaseCore: any = await database.getById(
            collections.cores,
            id,
        );

        if (!databaseCore) {
            delog({
                text: 'deactivateCore no databaseCore',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (databaseCore.ownerID !== owner.id) {
            delog({
                text: 'deactivateCore core not owned by owner',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        tunnelsManager.remove(
            id,
        );


        delog({
            text: 'deactivateCore success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deactivateCore error',
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
export default deactivateCore;
// #endregion exports
