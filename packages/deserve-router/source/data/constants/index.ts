// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const PORT = process.env.PORT || 3344;

const REGISTRATION_PATH = process.env.DESERVE_ROUTER_REGISTRATION_PATH || '/register';

const FAVICON_PATH = process.env.DESERVE_ROUTER_FAVICON_PATH || path.join(
    __dirname,
    './assets/favicon.ico',
);
// #endregion module



// #region exports
export {
    PORT,

    REGISTRATION_PATH,

    FAVICON_PATH,
};
// #endregion exports
