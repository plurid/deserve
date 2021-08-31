// #region imports
    // #region libraries
    import {
        Hooks,
    } from '@plurid/bluefig-server';
    // #endregion libraries
// #endregion imports



// #region module
const {
    accessToken,
    readSetup,
} = require('./services');


const hooks: Hooks = {
    checkToken: async (
        payload,
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
    // beforeAction: async (
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
