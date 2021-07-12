// #region imports
    // #region external
    import {
        Context,

        InputRequestBlob,
        ResponseRequestedBlob,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const requestBlob = async (
    input: InputRequestBlob,
    context: Context,
): Promise<any> => {
    try {
        const {
            owner,
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }


        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default requestBlob;
// #endregion exports
