const storageToken = process.env.DESERVE_STORAGE_TOKEN;


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



module.exports = {
    storage,
};
