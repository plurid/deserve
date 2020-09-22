// #region imports
    // #region external
    import {
        DeserveCoreLogic,
    } from '#data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const mock: DeserveCoreLogic = {
    verifyToken: async (
        coreID,
        token,
    ) => {
        return true;
    },
};
// #endregion module



// #region exports
export default mock;
// #endregion exports
