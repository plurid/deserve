// #region module
const PORT = parseInt(process.env.PORT || '') || 3388;
const TUNNEL_PORT = parseInt(process.env.DESERVE_CORE_TUNNEL_PORT || '') || 53179;

const HOST_PATTERN = process.env.DESERVE_HOST_PATTERN || '';
const CORE_PATTERN = process.env.DESERVE_CORE_PATTERN || '';
// #endregion module



// #region exports
export {
    PORT,
    TUNNEL_PORT,

    HOST_PATTERN,
    CORE_PATTERN,
};
// #endregion exports
