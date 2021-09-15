// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        ClientData,
        BlobsGet,
    } from '~data/interfaces';

    import {
        DOWNLOAD_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const get = (
    clientData: ClientData,
): BlobsGet => async (
    id,
) => {
    try {
        const {
            clientOrigin,
            token,
        } = clientData;

        if (!clientOrigin) {
            return;
        }

        const response = await fetch(
            clientOrigin + DOWNLOAD_PATH + '?blob=' + id,
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
