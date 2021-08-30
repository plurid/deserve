// #region module
const {
    accessToken,
    readSetup,
} = require('./services');


const hooks = {
    checkToken: (
        payload: {
            token: string | undefined,
        },
    ) => {
        const {
            token,
        } = payload;

        const setup = readSetup.get();
        if (
            !setup
            && !token
        ) {
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
