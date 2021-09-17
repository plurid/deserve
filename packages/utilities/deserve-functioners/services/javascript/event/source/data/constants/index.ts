// #region imports
    // #region libraries
    import {
        url,
    } from '@plurid/plurid-functions';
    // #endregion libraries
// #endregion imports



// #region module
export const DESERVE_ENDPOINT = url.removeTrailingSlash(process.env.DESERVE_ENDPOINT || '');

export const DATABASE_ENDPOINT = DESERVE_ENDPOINT + '/deserve';
export const EVENT_TOKEN = process.env.DESERVE_EVENT_TOKEN;
// #endregion module
