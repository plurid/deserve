// #region imports
    // #region libraries
    import request from 'request';
    // #endregion libraries


    // #region external
    import {
        StorageUpload,
    } from '~data/interface';

    import {
        STORAGE_ENDPOINT,
        STORAGE_TOKEN,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const upload: StorageUpload = async (
    stream,
) => {
    try {
        if (!STORAGE_ENDPOINT || !STORAGE_TOKEN) {
            return false;
        }


        const requested = request.post(
            STORAGE_ENDPOINT,
            {
                headers: {
                    'Deserve-Functioner': STORAGE_TOKEN,
                },
            },
        );
        stream.pipe(requested);


        const result: boolean = await new Promise((resolve, _) => {
            stream.on('error', () => {
                resolve(false);
            });

            stream.on('end', () => {
                resolve(true);
            });
        });

        return result;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export default upload;
// #endregion exports
