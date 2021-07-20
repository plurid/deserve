// #region imports
    // #region external
    import deserveRouter, {
        DeserveRouterLogic,
        VerifyIdentonymKey,
        HandleGetPath,
    } from '../distribution';
    // #endregion external
// #endregion imports



// #region module
const verifyIdentonymKey: VerifyIdentonymKey = async (
    input,
) => {
    if (
        input.identonym === 'a'
        && input.key === 'a'
    ) {
        return {
            status: true,
            data: {
                core: 'http://localhost:3355/register',
                token: '123',
            },
        };
    }

    return {
        status: false,
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



// #region run
deserveRouter(logic);
// #endregion run
