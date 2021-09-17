// #region module
export const DESERVE_ENDPOINT = process.env.DESERVE_ENDPOINT || ''
export const DESERVE_ENDPOINT_RESOLVED = DESERVE_ENDPOINT.endsWith('/')
    ? DESERVE_ENDPOINT.slice(0, DESERVE_ENDPOINT.length - 1)
    : DESERVE_ENDPOINT;

export const DATABASE_ENDPOINT = DESERVE_ENDPOINT_RESOLVED + '/deserve';

export const STORAGE_ENDPOINT = DESERVE_ENDPOINT_RESOLVED;
export const STORAGE_TOKEN = process.env.DESERVE_STORAGE_TOKEN;
// #endregion module
