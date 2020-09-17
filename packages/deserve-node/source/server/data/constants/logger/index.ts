// #region imports
    // #region external
    import {
        LogLevels,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const LOG_LEVEL_NONE = 7;
export const LOG_LEVEL_FATAL = 6;
export const LOG_LEVEL_ERROR = 5;
export const LOG_LEVEL_WARN = 4;
export const LOG_LEVEL_INFO = 3;
export const LOG_LEVEL_DEBUG = 2;
export const LOG_LEVEL_TRACE = 1;
export const LOG_LEVEL_ALL = 0;

export const logLevels: LogLevels = {
    none: LOG_LEVEL_NONE,
    fatal: LOG_LEVEL_FATAL,
    error: LOG_LEVEL_ERROR,
    warn: LOG_LEVEL_WARN,
    info: LOG_LEVEL_INFO,
    debug: LOG_LEVEL_DEBUG,
    trace: LOG_LEVEL_TRACE,
    all: LOG_LEVEL_ALL,
};
// #endregion module
