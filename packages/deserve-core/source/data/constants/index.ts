// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
const CORE_ID = process.env.DESERVE_CORE_ID || '';

const PORT = parseInt(process.env.PORT || '') || 3355;
const TUNNEL_PORT = process.env.DESERVE_TUNNEL_PORT;


const FAVICON_PATH = process.env.DESERVE_FAVICON_PATH || path.join(
    __dirname,
    './assets/favicon.ico',
);



const DEFAULT_MAX_SOCKETS = 10;
// #endregion module



// #region exports
export {
    CORE_ID,

    PORT,
    TUNNEL_PORT,

    FAVICON_PATH,

    DEFAULT_MAX_SOCKETS,
};
// #endregion exports
