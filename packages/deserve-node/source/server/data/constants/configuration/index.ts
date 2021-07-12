// #region module
export const LOG_LEVEL = process.env.DESERVE_LOG_LEVEL || '7';
export const QUIET = process.env.DESERVE_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const BASE_PATH = process.env.DESERVE_BASE_PATH || process.cwd();


export const COOKIE_DOMAIN = process.env.DESERVE_COOKIE_DOMAIN || 'localhost';
// #endregion module
