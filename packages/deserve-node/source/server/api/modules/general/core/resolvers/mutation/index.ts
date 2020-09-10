// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Core,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    registerCore: (
        _: any,
        { input }: any,
        context: Context,
    ) => Core.Mutation.registerCore(
        input,
        context,
    ),
    deregisterCore: (
        _: any,
        { input }: any,
        context: Context,
    ) => Core.Mutation.deregisterCore(
        input,
        context,
    ),
};
// #endregion exports
