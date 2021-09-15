// #region imports
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
): BlobsGet => async (
    id,
) => {
    try {
        if (!origin) {
            return {
                status: false,
            };
        }

        return {
            status: false,
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
