// #region module
export const DESERVE_ENDPOINT = process.env.DESERVE_ENDPOINT || ''
export const DESERVE_ENDPOINT_RESOLVED = DESERVE_ENDPOINT.endsWith('/')
    ? DESERVE_ENDPOINT.slice(0, DESERVE_ENDPOINT.length - 1)
    : DESERVE_ENDPOINT;

export const DATABASE_ENDPOINT = DESERVE_ENDPOINT_RESOLVED + '/deserve';
export const EVENT_TOKEN = process.env.DESERVE_EVENT_TOKEN;
// #endregion module
