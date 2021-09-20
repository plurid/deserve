// #region module
export const PORT = parseInt(process.env.PORT || '') || 3366;

export const HEALTH_CHECK_ENDPOINT = '/service-check/health';


export const DATA_OWNERS = '/data/owners';
export const DATA_CORES = '/data/cores';
export const DATA_OWNERSPACE = '/data/ownerspace';

export const DATA_OWNERSPACE_CORES = '/cores';
export const DATA_OWNERSPACE_FILES = '/files';


export const COOKIE_OWNER_TOKEN = 'OWNTKN';
export const COOKIE_EMPTY_VALUE = '';


export const ONE_DAY = 1_000 * 60 * 60 * 24;
// #endregion module
