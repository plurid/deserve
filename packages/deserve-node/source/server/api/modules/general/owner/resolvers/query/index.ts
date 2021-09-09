// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Owner,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region module
const Query = {
    getCurrentOwner: (
        _: any,
        __: any,
        context: Context,
    ) => Owner.Query.getCurrentOwner(
        context,
    ),
    getGlobalData: (
        _: any,
        __: any,
        context: Context,
    ) => Owner.Query.getGlobalData(
        context,
    ),
};
// #endregion module



// #region exports
export default Query;
// #endregion exports
