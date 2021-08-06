// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseGetFunctionArguments = async (
    input: any,
    context: Context,
): Promise<Response> => {
    try {
        delog({
            text: 'databaseGetFunctionArguments success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'databaseGetFunctionArguments error',
            level: 'error',
            error,
        });

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default databaseGetFunctionArguments;
// #endregion exports
