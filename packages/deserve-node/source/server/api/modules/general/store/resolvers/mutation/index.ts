// #region imports
    // #region external
    import {
        Context,
        InputOf,

        InputStoreBlob,
        InputStoreKey,

        InputUpdateKey,

        InputDeleteBlob,
        InputDeleteKey,
    } from '~server/data/interfaces';

    import {
        Store,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    storeBlob: (
        _: any,
        { input }: InputOf<InputStoreBlob>,
        context: Context,
    ) => Store.Mutation.storeBlob(
        input,
        context,
    ),
    storeKey: (
        _: any,
        { input }: InputOf<InputStoreKey>,
        context: Context,
    ) => Store.Mutation.storeKey(
        input,
        context,
    ),


    updateKey: (
        _: any,
        { input }: InputOf<InputUpdateKey>,
        context: Context,
    ) => Store.Mutation.updateKey(
        input,
        context,
    ),


    deleteBlob: (
        _: any,
        { input }: InputOf<InputDeleteBlob>,
        context: Context,
    ) => Store.Mutation.deleteBlob(
        input,
        context,
    ),
    deleteKey: (
        _: any,
        { input }: InputOf<InputDeleteKey>,
        context: Context,
    ) => Store.Mutation.deleteKey(
        input,
        context,
    ),
};
// #endregion exports
