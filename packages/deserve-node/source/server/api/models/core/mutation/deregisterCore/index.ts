// #region imports
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
            return {
                status: false,
            }
        }


        tunnelsManager.remove(id);

        await database.deleteDocument(
            collections.cores,
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
export default deregisterCore;
// #endregion exports
