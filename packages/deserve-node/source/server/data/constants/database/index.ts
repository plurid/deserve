// #region module
export const DESERVE_DATABASE = process.env.DESERVE_NODE_DATABASE_NAME || 'deserve';
export const DESERVE_GLOBAL = 'global';
export const DESERVE_OWNERS = 'owners';
export const DESERVE_CORES = 'cores';
export const DESERVE_KEYS = 'keys';
export const DESERVE_FUNCTIONS = 'functions';
export const DESERVE_FUNCTIONERS = 'functioners';
export const DESERVE_BLOBS = 'blobs';
export const DESERVE_TOKENS = 'tokens';


export const DESERVE_MONGO_CONNECTION_STRING = process.env.DESERVE_NODE_MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:57057/';

export const DESERVE_MONGO_USERNAME = process.env.DESERVE_NODE_MONGO_USERNAME || '';
export const DESERVE_MONGO_PASSWORD = process.env.DESERVE_NODE_MONGO_PASSWORD || '';

export const DESERVE_DATABASE_URI = DESERVE_MONGO_USERNAME && DESERVE_MONGO_PASSWORD
    ? DESERVE_MONGO_CONNECTION_STRING.replace('mongodb://', `mongodb://${DESERVE_MONGO_USERNAME}:${DESERVE_MONGO_PASSWORD}@`)
    : DESERVE_MONGO_CONNECTION_STRING;
// #endregion module
