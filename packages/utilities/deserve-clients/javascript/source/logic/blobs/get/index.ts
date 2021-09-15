// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        BlobsGet,
    } from '~data/interfaces';

    import {
        DOWNLOAD_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const get = (
    origin: string | undefined,
    token: string,
): BlobsGet => async (
    id,
) => {
    try {
        if (!origin) {
            return;
        }

        const response = await fetch(
            origin + DOWNLOAD_PATH + '?blob=' + id,
            {
                method: 'GET',
                headers: {
                    'Deserve-Token': token,
                },
            },
        );

        return response;
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
