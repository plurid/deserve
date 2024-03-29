// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    // #endregion libraries
// #endregion imports



// #region module
export const LOG_LEVEL = process.env.DESERVE_NODE_LOG_LEVEL || '7';
export const QUIET = process.env.DESERVE_NODE_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const BASE_PATH = process.env.DESERVE_NODE_BASE_PATH || process.cwd();
export const DATA_PATH = path.join(
    BASE_PATH,
    'data',
);


export const COOKIE_DOMAIN = process.env.DESERVE_NODE_COOKIE_DOMAIN || 'localhost';



export const DEFAULT_TUNNEL_HOST = process.env.DESERVE_NODE_DEFAULT_TUNNEL_HOST || 'https://deserve.plurid.cloud';

export const FUNCTIONER_DESERVE_ENDPOINT = process.env.DESERVE_NODE_FUNCTIONER_DESERVE_ENDPOINT || '';
export const FUNCTIONER_NETWORK = process.env.DESERVE_NODE_FUNCTIONER_NETWORK || '';


export const defaultConfigurationPath = path.join(
    os.homedir(),
    '.deserve/data.deon',
);
export const CONFIGURATION_PATH = process.env.DESERVE_NODE_CONFIGURATION_PATH || defaultConfigurationPath;



export const TEST_MODE = process.env.DESERVE_NODE_TEST_MODE === 'true';
// #endregion module
