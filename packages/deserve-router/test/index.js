const deserveRouter = require('../distribution').default;



const verifyIdentonymKey = async (
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


deserveRouter(logic);
