// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const REGISTER_PATH = process.env.DESERVE_REGISTER_PATH || '/register';

const CORE_ID = process.env.DESERVE_CORE_ID || '';

const PORT = parseInt(process.env.PORT || '') || 3355;
const TUNNEL_PORT = process.env.DESERVE_CORE_TUNNEL_PORT;

const DEFAULT_MAX_SOCKETS = parseInt(process.env.DESERVE_CORE_MAX_SOCKETS || '') || 10;


const FAVICON_PATH = process.env.DESERVE_CORE_FAVICON_PATH || path.join(
    __dirname,
    './assets/favicon.ico',
);
// #endregion module



// #region exports
export {
    REGISTER_PATH,

    CORE_ID,

    PORT,
    TUNNEL_PORT,

    DEFAULT_MAX_SOCKETS,

    FAVICON_PATH,
};
// #endregion exports
