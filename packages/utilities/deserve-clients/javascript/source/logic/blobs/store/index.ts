// #region imports
    // #region libraries
    import fetch from 'cross-fetch';
    import FormData from 'form-data';
    // #endregion libraries


    // #region external
    import {
        GraphqlClient,

        BlobsStore,
    } from '~data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const store = (
    graphqlClient: GraphqlClient | undefined,
): BlobsStore => async (
    stream,
) => {
    try {
        if (!graphqlClient) {
            return {
                status: false,
            };
        }

        const storedID = await new Promise(async (resolve, reject) => {
            const form = new FormData();
            form.append('file', stream);

            const response = await fetch('uri', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    ...form.getHeaders(),
                },
                body: form.getBuffer(),
            });

            if (response.status === 200) {
                resolve(true);
            } else {
                reject();
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
