// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        StorageGet,
    } from '~data/interface';

    import {
        DOWNLOAD_ENDPOINT,
        STORAGE_TOKEN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const get: StorageGet = async (
    id,
) => {
    try {
        if (!DOWNLOAD_ENDPOINT || !STORAGE_TOKEN) {
            return null;
        }

        const response = await fetch(DOWNLOAD_ENDPOINT + `?blob=${id}`, {
            headers: {
                'Deserve-Functioner': STORAGE_TOKEN,
            },
        });

        return response.body;
    } catch (error) {
        return null;
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
