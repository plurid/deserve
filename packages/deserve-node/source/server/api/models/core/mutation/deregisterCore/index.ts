// #region imports
    // #region external
    import {
        Context,
        InputDeregisterCore,
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import tunnelsManager from '#server/services/tunnelsManager';
    // #endregion external
// #endregion imports



// #region module
const deregisterCore = async (
    input: InputDeregisterCore,
    context: Context,
) => {
    const {
        id,
    } = input;

    tunnelsManager.remove(id);

    // delete from database

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default deregisterCore;
// #endregion exports
