// #region module
const {
    accessToken,
    readSetup,
} = require('./services');


const hooks = {
    checkToken: (
        token: string | undefined,
    ) => {
        // console.log('checkToken hook called', token);

        const setup = readSetup.get();
        if (!setup) {
            return '/root-registration';
        }

        if (!token) {
            return '/admin-login';
        }

        const validToken = accessToken.verify(token);
        if (!validToken) {
            return '/admin-login';
        }

        return true;
    },
    // beforeAction: (
    //     payload: any,
    // ) => {
    //     console.log('beforeAction hook called', payload);

    //     return true;
    // },
};
// #endregion module



// #region exports
module.exports = hooks;
// #endregion exports
