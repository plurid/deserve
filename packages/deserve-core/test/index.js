// #region imports
    // #region external
    const deserveCore = require('../distribution').default;
    // #endregion external
// #endregion imports



// #region module
const verifyToken = async (
    coreID,
    token,
) => {
    if (!token) {
        return false;
    }

    return true;
};


const handleNotFound = async (
    request,
    response,
) => {
    response.send('Not found');
}


const logic = {
    verifyToken,
};
// #endregion module



// #region run
deserveCore(logic);
// #endregion run
