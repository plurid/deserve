// #region imports
    // #region external
    import {
        DeserveRouterLogic,
        VerifyIdentonymKey,
        HandleGetPath,
    } from '../../distribution';
    // #endregion external
// #endregion imports



// #region module
const verifyIdentonymKey: VerifyIdentonymKey = async (
    input,
) => {
    return {
        status: true,
        data: {
            core: 'http://localhost:3355/register',
            token: '123',
        },
    };
};


const handleGetPath: HandleGetPath = async (
    _,
    response,
) => {
    response.send('Deserve Router');
};


const logic: DeserveRouterLogic = {
    verifyIdentonymKey,
    handleGetPath,
};
// #endregion module



// #region exports
export default logic;
// #endregion exports
