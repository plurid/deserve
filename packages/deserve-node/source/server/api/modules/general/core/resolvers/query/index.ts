// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Core,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getCores: (
        _: any,
        __: any,
        context: Context,
    ) => Core.Query.getCores(
        context,
    ),
};
// #endregion exports
