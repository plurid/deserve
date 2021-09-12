// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputFunctionerDatabaseSet,
        InputFunctionerDatabaseRemove,
        InputFunctionerStorageRemove,
    } from '~server/data/interfaces';

    import {
        Functioner,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    functionerDatabaseSet: (
        _: any,
        { input }: InputOf<InputFunctionerDatabaseSet>,
        context: Context,
    ) => Functioner.Mutation.databaseSet(
        input,
        context,
    ),
    functionerDatabaseRemove: (
        _: any,
        { input }: InputOf<InputFunctionerDatabaseRemove>,
        context: Context,
    ) => Functioner.Mutation.databaseRemove(
        input,
        context,
    ),


    functionerStorageRemove: (
        _: any,
        { input }: InputOf<InputFunctionerStorageRemove>,
        context: Context,
    ) => Functioner.Mutation.storageRemove(
        input,
        context,
    ),
};
// #endregion exports
