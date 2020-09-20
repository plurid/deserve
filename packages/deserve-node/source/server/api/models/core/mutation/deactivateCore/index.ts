// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import tunnelsManager from '#server/services/tunnelsManager';
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
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }


        const {
            value: id,
        } = input;

        const databaseCore = await database.get(
            'core',
            id,
        );

        if (!databaseCore) {
            return {
                status: false,
            };
        }

        if (databaseCore.ownerID !== owner.id) {
            return {
                status: false,
            };
        }


        tunnelsManager.remove(
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
export default deactivateCore;
// #endregion exports
