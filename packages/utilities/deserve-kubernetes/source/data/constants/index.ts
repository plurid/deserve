// #region imports
    // #region libraries
    import os from 'os';
    // #endregion libraries
// #endregion imports



// #region module
export const TCP_PORT = parseInt(process.env.DESERVE_TCP_PORT || '') || 3388;
export const HTTP_PORT = parseInt(process.env.DESERVE_HTTP_PORT || '') || 3389;
export const TUNNEL_PORT = parseInt(process.env.DESERVE_CORE_TUNNEL_PORT || '') || 53179;


export const SIX_HOURS = 1_000 * 60 * 60 * 6;
export const REQUERY_TIME = parseInt(process.env.DESERVE_REQUERY_TIME || '') || SIX_HOURS;


export const WORKER_COUNT = parseInt(process.env.DESERVE_WORKER_COUNT || '') || os.cpus().length;
export const WORKER_CLOSE_TIMEOUT = parseInt(process.env.DESERVE_WORKER_CLOSE_TIMEOUT || '') || 10_000;


export const APP_SELECTOR = process.env.DESERVE_APP_SELECTOR || 'app';
export const HOST_PATTERN = process.env.DESERVE_HOST_PATTERN || '';
export const CORE_PATTERN = process.env.DESERVE_CORE_PATTERN || '';


export const CORES_NAMESPACE = process.env.DESERVE_CORES_NAMESPACE || 'default';


export const CACHE_RESET_PATH = process.env.DESERVE_CACHE_RESET_PATH || '/__deserve-cache-reset__';
export const DEFAULT_CACHE_RESET_TOKEN = 'cache-reset-token';
export const CACHE_RESET_TOKEN = process.env.DESERVE_CACHE_RESET_TOKEN || DEFAULT_CACHE_RESET_TOKEN;
// #endregion module
