// #region imports
    // #region external
    import {
        Context,
        InputOf,

        InputRequestBlob,
        InputRequestBlobs,

        InputQueryBlobs,

        InputRequestKey,
        InputRequestKeys,

        InputQueryKeys,

        InputGetFunction,
        InputGetFunctions,

        InputGetExecutions,
        InputGetExecution,
    } from '~server/data/interfaces';

    import {
        Store,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    requestBlob: (
        _: any,
        { input }: InputOf<InputRequestBlob>,
        context: Context,
    ) => Store.Query.requestBlob(
        input,
        context,
    ),
    requestBlobs: (
        _: any,
        { input }: InputOf<InputRequestBlobs>,
        context: Context,
    ) => Store.Query.requestBlobs(
        input,
        context,
    ),
    queryBlobs: (
        _: any,
        { input }: InputOf<InputQueryBlobs>,
        context: Context,
    ) => Store.Query.queryBlobs(
        input,
        context,
    ),

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


    getFunction: (
        _: any,
        { input }: InputOf<InputGetFunction>,
        context: Context,
    ) => Store.Query.getFunction(
        input,
        context,
    ),
    getFunctions: (
        _: any,
        { input }: InputOf<InputGetFunctions>,
        context: Context,
    ) => Store.Query.getFunctions(
        input,
        context,
    ),

    getExecutions: (
        _: any,
        { input }: InputOf<InputGetExecutions>,
        context: Context,
    ) => Store.Query.getExecutions(
        input,
        context,
    ),
    getExecution: (
        _: any,
        { input }: InputOf<InputGetExecution>,
        context: Context,
    ) => Store.Query.getExecution(
        input,
        context,
    ),
};
// #endregion exports
