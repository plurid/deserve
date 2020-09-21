// #region imports
    // #region external
    import {
        DatabaseType,
        StorageType,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const LOG_LEVEL = process.env.DESERVE_LOG_LEVEL || '7';
export const QUIET = process.env.DESERVE_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const DATABASE_TYPE = (process.env.PERFORMER_DATABASE_TYPE as DatabaseType | undefined)
    || 'filesystem';

export const STORAGE_TYPE = (process.env.PERFORMER_STORAGE_TYPE as StorageType | undefined)
    || 'filesystem';


export const BASE_PATH = process.env.DESERVE_BASE_PATH || process.cwd();


export const COOKIE_DOMAIN = process.env.DESERVE_COOKIE_DOMAIN || 'localhost';
// #endregion module
