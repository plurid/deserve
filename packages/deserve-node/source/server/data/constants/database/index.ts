// #region module
export const DESERVE_DATABASE = process.env.DESERVE_NODE_DATABASE_NAME || 'deserve';
export const DESERVE_GLOBAL = 'global';
export const DESERVE_OWNERS = 'owners';
export const DESERVE_CORES = 'cores';
export const DESERVE_KEYS = 'keys';
export const DESERVE_BLOBS = 'blobs';


export const DESERVE_DATABASE_URI = process.env.DESERVE_NODE_MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:57057/';
// #endregion module
