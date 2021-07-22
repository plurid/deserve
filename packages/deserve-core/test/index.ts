// #region imports
    // #region external
    import {
        VerifyToken,
        HandleNotFound,
        DeserveCoreLogic,
    } from '../distribution';
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


const handleNotFound: HandleNotFound = async (
    request,
    response,
) => {
    response.send('Not found');
}


const mock: DeserveCoreLogic = {
    verifyToken,
    handleNotFound,
};
// #endregion module



// #region exports
export default mock;
// #endregion exports
