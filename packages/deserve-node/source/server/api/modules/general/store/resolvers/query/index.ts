// #region imports
    // #region external
    import {
        Context,
        InputOf,

        InputRequestKey,
        InputRequestKeys,

        InputQueryKeys,
    } from '~server/data/interfaces';

    import {
        Store,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    requestKey: (
        _: any,
        { input }: InputOf<InputRequestKey>,
        context: Context,
    ) => Store.Query.requestKey(
        input,
        context,
    ),
    requestKeys: (
        _: any,
        { input }: InputOf<InputRequestKeys>,
        context: Context,
    ) => Store.Query.requestKeys(
        input,
        context,
    ),


    queryKeys: (
        _: any,
        { input }: InputOf<InputQueryKeys>,
        context: Context,
    ) => Store.Query.queryKeys(
        input,
        context,
    ),
};
// #endregion exports
