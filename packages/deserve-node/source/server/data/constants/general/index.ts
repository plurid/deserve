// #region module
const PORT = process.env.PORT || 3366;

const HEALTH_CHECK_ENDPOINT = '/service-check/health';


const DATA_OWNERS = '/data/owners';
const DATA_CORES = '/data/cores';
const DATA_OWNERSPACE = '/data/ownerspace';

const DATA_OWNERSPACE_CORES = '/cores';
const DATA_OWNERSPACE_FILES = '/files';


const COOKIE_OWNER_TOKEN = 'OWNTKN';
// #endregion module



// #region exports
export {
    PORT,

    HEALTH_CHECK_ENDPOINT,

    DATA_OWNERS,
    DATA_CORES,
    DATA_OWNERSPACE,
    DATA_OWNERSPACE_CORES,
    DATA_OWNERSPACE_FILES,

    COOKIE_OWNER_TOKEN,
};
// #endregion exports
