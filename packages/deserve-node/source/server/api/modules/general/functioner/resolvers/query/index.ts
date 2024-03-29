// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputFunctionerDatabaseGet,
        InputFunctionerDatabaseQuery,
    } from '~server/data/interfaces';

    import {
        Functioner,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    functionerDatabaseGet: (
        _: any,
        { input }: InputOf<InputFunctionerDatabaseGet>,
        context: Context,
    ) => Functioner.Query.databaseGet(
        input,
        context,
    ),
    functionerDatabaseQuery: (
        _: any,
        { input }: InputOf<InputFunctionerDatabaseQuery>,
        context: Context,
    ) => Functioner.Query.databaseQuery(
        input,
        context,
    ),
    functionerDatabaseGetFunctionArguments: (
        _: any,
        { input }: InputOf<any>,
        context: Context,
    ) => Functioner.Query.databaseGetFunctionArguments(
        input,
        context,
    ),
    functionerDatabaseGetFunctionData: (
        _: any,
        { input }: InputOf<any>,
        context: Context,
    ) => Functioner.Query.databaseGetFunctionData(
        input,
        context,
    ),
};
// #endregion exports
