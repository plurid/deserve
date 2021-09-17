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
export const DATABASE_TOKEN = process.env.DESERVE_DATABASE_TOKEN;
// #endregion module
