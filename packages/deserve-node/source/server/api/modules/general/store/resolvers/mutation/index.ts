// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Store,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    requestBlob: (
        _: any,
        { input }: any,
        context: Context,
    ) => Store.Mutation.requestBlob(
        input,
        context,
    ),
    storeBlob: (
        _: any,
        { input }: any,
        context: Context,
    ) => Store.Mutation.requestBlob(
        input,
        context,
    ),
    requestKey: (
        _: any,
        { input }: any,
        context: Context,
    ) => Store.Mutation.requestData(
        input,
        context,
    ),
    storeKey: (
        _: any,
        { input }: any,
        context: Context,
    ) => Store.Mutation.requestData(
        input,
        context,
    ),
};
// #endregion exports
