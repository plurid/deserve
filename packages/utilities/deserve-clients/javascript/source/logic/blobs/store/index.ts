// #region imports
    // #region libraries
    import FormData from 'form-data';
    import axios from 'axios';
    // #endregion libraries


    // #region external
    import {
        ClientData,
        BlobsStore,
    } from '~data/interfaces';

    import {
        UPLOAD_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const store = (
    clientData: ClientData,
): BlobsStore => async (
    storeable,
    options,
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

        const stored = await new Promise<any>(async (resolve, reject) => {
            try {
                const form = new FormData();
                form.append(
                    'blob',
                    storeable,
                    {
                        contentType: options?.contentType,
                    },
                );
                form.append(
                    'metadata',
                    JSON.stringify(options?.metadata),
                );

                const formHeaders = form.getHeaders();

                const response = await axios.post(
                    clientOrigin + UPLOAD_PATH,
                    form,
                    {
                        headers: {
                            'Deserve-Token': token,
                            'Host': clientHost,
                            ...formHeaders,
                        },
                    },
                );

                if (response.status !== 200) {
                    reject('deserve client could not store');
                    return;
                }

                resolve(response.data);
            } catch (error) {
                reject(error);
            }
        });

        if (!stored) {
            return {
                status: false,
            };
        }

        return {
            status: true,
            data: {
                ...stored,
            },
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default store;
// #endregion exports
