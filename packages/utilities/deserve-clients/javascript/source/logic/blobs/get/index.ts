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

    import {
        resolveExpiration,
    } from '~utilities/index';
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
            clientHost,
            token,
        } = clientData;

        if (!clientOrigin) {
            return {
                status: false,
            };
        }

        const response = await fetch(
            clientOrigin + DOWNLOAD_PATH + '?blob=' + id,
            {
                method: 'GET',
                headers: {
                    'Deserve-Token': token,
                    'Host': clientHost,
                },
            },
        );

        if (response.status !== 200) {
            return {
                status: false,
            };
        }

        const expiration = resolveExpiration(response);

        return {
            status: true,
            data: response,
            expiration,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default get;
// #endregion exports
