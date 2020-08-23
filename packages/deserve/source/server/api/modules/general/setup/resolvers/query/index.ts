// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Setup,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getSetup: (
        _: any,
        __: any,
        context: Context,
    ) => Setup.Query.getSetup(
        context,
    ),
};
// #endregion exports
