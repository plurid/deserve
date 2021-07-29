// #region module
const TCP_PORT = parseInt(process.env.TCP_PORT || '') || 3388;
const HTTP_PORT = parseInt(process.env.HTTP_PORT || '') || 3389;
const TUNNEL_PORT = parseInt(process.env.DESERVE_CORE_TUNNEL_PORT || '') || 53179;

const SIX_HOURS = 1_000 * 60 * 60 * 6;
const REQUERY_TIME = parseInt(process.env.DESERVE_REQUERY_TIME || '') || SIX_HOURS;

const APP_SELECTOR = process.env.DESERVE_APP_SELECTOR || 'app';
const HOST_PATTERN = process.env.DESERVE_HOST_PATTERN || '';
const CORE_PATTERN = process.env.DESERVE_CORE_PATTERN || '';

const CORES_NAMESPACE = process.env.DESERVE_CORES_NAMESPACE || 'default';

const CACHE_RESET_PATH = process.env.DESERVE_CACHE_RESET_PATH || '/__deserve-cache-reset__';
const DEFAULT_CACHE_RESET_TOKEN = 'cache-reset-token';
const CACHE_RESET_TOKEN = process.env.DESERVE_CACHE_RESET_TOKEN || DEFAULT_CACHE_RESET_TOKEN;
// #endregion module



// #region exports
export {
    TCP_PORT,
    HTTP_PORT,
    TUNNEL_PORT,

    REQUERY_TIME,

    APP_SELECTOR,
    HOST_PATTERN,
    CORE_PATTERN,

    CORES_NAMESPACE,

    CACHE_RESET_PATH,
    DEFAULT_CACHE_RESET_TOKEN,
    CACHE_RESET_TOKEN,
};
// #endregion exports
