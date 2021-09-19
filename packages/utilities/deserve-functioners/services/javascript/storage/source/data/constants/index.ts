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

export const STORAGE_ENDPOINT = DESERVE_ENDPOINT;
export const STORAGE_TOKEN = process.env.DESERVE_STORAGE_TOKEN;

export const DOWNLOAD_ENDPOINT = DESERVE_ENDPOINT + '/download';
export const UPLOAD_ENDPOINT = DESERVE_ENDPOINT + '/upload';
// #endregion module
