// #region module
const hooks = {
    beforeRead: (
        view: string,
    ) => {
        // check if root key set

        // check if admin key set

        console.log('beforeRead hook called', view);
        return true;
    },
    beforeWrite: (
        view: string,
    ) => {
        console.log('beforeWrite hook called', view);
        return true;
    },
};
// #endregion module



// #region exports
module.exports = hooks;
// #endregion exports
