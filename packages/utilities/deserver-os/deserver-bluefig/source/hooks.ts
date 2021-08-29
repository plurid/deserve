// #region module
const hooks = {
    checkToken: (
        token: string | undefined,
        notify: any,
    ) => {
        console.log('checkToken hook called', token);

        if (!token) {
            return false;
        }

        return true;
    },
    beforeAction: (
        payload: any,
        notify: any,
    ) => {
        console.log('beforeAction hook called', payload);

        return true;
    },
};
// #endregion module



// #region exports
module.exports = hooks;
// #endregion exports
