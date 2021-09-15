// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    import FormData from 'form-data';
    // #endregion libraries


    // #region external
    import {
        BlobsStore,
    } from '~data/interfaces';

    import {
        UPLOAD_PATH,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const store = (
    origin: string | undefined,
    token: string,
): BlobsStore => async (
    stream,
) => {
    try {
        if (!origin) {
            return {
                status: false,
            };
        }

        const storedID = await new Promise(async (resolve, reject) => {
            const form = new FormData();
            form.append('blob', stream);

            const response = await fetch(origin + UPLOAD_PATH, {
                method: 'POST',
                headers: {
                    'Deserve-Token': token,
                    'Content-Type': 'application/octet-stream',
                    ...form.getHeaders(),
                },
                body: form.getBuffer(),
            });

            if (response.status === 200) {
                const json = await response.json();
                resolve(json.id);
            } else {
                reject('deserve client could not store');
            }
        });

        if (!storedID) {
            return {
                status: false,
            };
        }

        return {
            status: true,
            data: {
                id: storedID,
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
