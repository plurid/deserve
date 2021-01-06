// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCores = async (
    context: Context,
) => {
    const {
        owner,
    } = context;

    if (!owner) {
        return {
            status: false,
        };
    }

    const {
        cores,
    } = owner;

    return {
        status: true,
        data: [
            ...cores,
        ],
    };
}
// #endregion module



// #region exports
export default getCores;
// #endregion exports
