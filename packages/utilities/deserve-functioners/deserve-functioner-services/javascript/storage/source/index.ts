const storageToken = process.env.DESERVE_STORAGE_TOKEN;



// #region module
/**
 * General methods for storage access.
 */
const storage = {
    get: () => {
        if (!storageToken) {
            return;
        }
    },
};
// #endregion module



// #region exports
export default storage;
// #endregion exports
