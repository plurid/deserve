// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        StorageGet,
    } from '~data/interface';

    import {
        STORAGE_ENDPOINT,
        STORAGE_TOKEN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const get: StorageGet = async (
    id,
) => {
    try {
        if (!STORAGE_ENDPOINT) {
            return null;
        }

        const response = await fetch(STORAGE_ENDPOINT, {
            body: JSON.stringify({
                id,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${STORAGE_TOKEN}`,
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
