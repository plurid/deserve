// #region imports
    // #region external
    import {
        Context,
        InputOf,

        InputStoreKey,

        InputUpdateKey,

        InputDeleteBlob,
        InputDeleteKey,

        InputStoreFunction,
        InputUpdateFunction,
        InputDeleteFunction,

        InputRunFunction,
    } from '~server/data/interfaces';

    import {
        Store,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
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


    storeFunction: (
        _: any,
        { input }: InputOf<InputStoreFunction>,
        context: Context,
    ) => Store.Mutation.storeFunction(
        input,
        context,
    ),
    updateFunction: (
        _: any,
        { input }: InputOf<InputUpdateFunction>,
        context: Context,
    ) => Store.Mutation.updateFunction(
        input,
        context,
    ),
    deleteFunction: (
        _: any,
        { input }: InputOf<InputDeleteFunction>,
        context: Context,
    ) => Store.Mutation.deleteFunction(
        input,
        context,
    ),

    runFunction: (
        _: any,
        { input }: InputOf<InputRunFunction>,
        context: Context,
    ) => Store.Mutation.runFunction(
        input,
        context,
    ),
};
// #endregion exports
