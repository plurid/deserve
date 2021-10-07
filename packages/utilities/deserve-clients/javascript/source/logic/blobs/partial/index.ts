// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    // #endregion libraries


    // #region external
    import {
        ClientData,
        BlobsPartial,
    } from '~data/interfaces';

    import {
        DOWNLOAD_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const partial = (
    clientData: ClientData,
): BlobsPartial => async (
    id,
    start,
    end,
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
                    'Range': `bytes=${start}-${end}`,
                },
            },
        );

        if (response.status !== 200) {
            return {
                status: false,
            };
        }

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(
            new Uint8Array(arrayBuffer),
        );

        return {
            status: true,
            data: buffer,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default partial;
// #endregion exports
