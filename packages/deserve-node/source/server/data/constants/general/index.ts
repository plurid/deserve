// #region module
const PORT = process.env.PORT || 3366;

const HEALTH_CHECK_ENDPOINT = '/service-check/health';


const DATA_OWNERS = '/data/owners';
// #endregion module



// #region exports
export {
    PORT,

    HEALTH_CHECK_ENDPOINT,

    DATA_OWNERS,
};
// #endregion exports
