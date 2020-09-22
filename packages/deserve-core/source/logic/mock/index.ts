// #region imports
    // #region internal
    import {
        DeserveCoreLogic,
    } from '../../data/interfaces';
    // #endregion internal
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
