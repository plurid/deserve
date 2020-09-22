// #region imports
    // #region external
    import {
        DeserveRouterLogic,
        VerifyIdentonymKey,
        HandleGetPath,
        TriggerCoreGeneration,
    } from '../../data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const verifyIdentonymKey: VerifyIdentonymKey = async (
    input,
) => {
    return {
        status: true,
        data: {
            // core: 'https://a-core.data.domain.tld',
            core: 'http://localhost:3355/register',
            token: '123',
        },
    };
};


const handleGetPath: HandleGetPath = async (
    request,
    response,
) => {
    response.send('Deserve Router');
};


const triggerCoreGeneration: TriggerCoreGeneration = async (
) => {
};


const logic: DeserveRouterLogic = {
    verifyIdentonymKey,
    handleGetPath,
    triggerCoreGeneration,
};
// #endregion module



// #region exports
export default logic;
// #endregion exports
