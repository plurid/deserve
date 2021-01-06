// #region imports
    // #region external
    import {
        logLevel,
    } from '~server/data/constants';

    import Logger from '~server/logic/logger';
    // #endregion external
// #endregion imports



// #region module
const logger = new Logger(logLevel);
// #endregion module



// #region exports
export default logger;
// #endregion exports
