// #region imports
    // #region external
    import {
        VerifyToken,
        DeserveCoreLogic,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const verifyToken: VerifyToken = async (
    coreID,
    token,
) => {
    if (!token) {
        return false;
    }

    return true;
};


const mock: DeserveCoreLogic = {
    verifyToken,
};
// #endregion module



// #region exports
export default mock;
// #endregion exports
