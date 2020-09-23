// #region module
const CORE_ID = process.env.DESERVE_CORE_ID || '';

const PORT = parseInt(process.env.PORT || '') || 3355;
const TUNNEL_PORT = process.env.DESERVE_TUNNEL_PORT;
// #endregion module



// #region exports
export {
    CORE_ID,

    PORT,
    TUNNEL_PORT,
};
// #endregion exports
