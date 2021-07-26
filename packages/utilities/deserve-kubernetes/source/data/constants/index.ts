// #region module
const PORT = parseInt(process.env.PORT || '') || 3388;
const TUNNEL_PORT = parseInt(process.env.DESERVE_CORE_TUNNEL_PORT || '') || 53179;

const SIX_HOURS = 1_000 * 60 * 60 * 6;
const REQUERY_TIME = parseInt(process.env.DESERVE_REQUERY_TIME || '') || SIX_HOURS;

const APP_SELECTOR = process.env.DESERVE_APP_SELECTOR || 'app';
const HOST_PATTERN = process.env.DESERVE_HOST_PATTERN || '';
const CORE_PATTERN = process.env.DESERVE_CORE_PATTERN || '';

const CORES_NAMESPACE = process.env.DESERVE_CORES_NAMESPACE || 'default';
// #endregion module



// #region exports
export {
    PORT,
    TUNNEL_PORT,

    REQUERY_TIME,

    APP_SELECTOR,
    HOST_PATTERN,
    CORE_PATTERN,

    CORES_NAMESPACE,
};
// #endregion exports
