// #region imports
    // #region external
    import deserveRouter from '../distribution';
    // #endregion external
// #endregion imports



// #region module
const verifyIdentonymKey = async (
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


const handleGetPath = async (
    _,
    response,
) => {
    response.send('Deserve Router');
};


const logic = {
    verifyIdentonymKey,
    handleGetPath,
};
// #endregion module



// #region run
deserveRouter(logic);
// #endregion run
