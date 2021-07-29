// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        HOST_PATTERN,
        CORE_PATTERN,

        DEFAULT_CACHE_RESET_TOKEN,
        CACHE_RESET_TOKEN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const logWarnings = () => {
    if (!HOST_PATTERN) {
        delog({
            text: `deserve kubernetes 'DESERVE_HOST_PATTERN' not defined`,
            level: 'warn',
        });
    }

    if (!CORE_PATTERN) {
        delog({
            text: `deserve kubernetes 'DESERVE_CORE_PATTERN' not defined`,
            level: 'warn',
        });
    }

    if (CACHE_RESET_TOKEN === DEFAULT_CACHE_RESET_TOKEN) {
        delog({
            text: `deserve kubernetes 'DESERVE_CACHE_RESET_TOKEN' has default value '${DEFAULT_CACHE_RESET_TOKEN}'`,
            level: 'warn',
        });
    }
}
// #endregion module



// #region exports
export default logWarnings;
// #endregion exports
