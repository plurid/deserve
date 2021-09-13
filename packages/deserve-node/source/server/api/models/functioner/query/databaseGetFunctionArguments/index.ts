// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseGetFunctionArguments = async (
    _: any,
    context: Context,
): Promise<any> => {
    try {
        const {
            functioner,
            collections,
        } = context;
        if (!functioner) {
            return {
                status: false,
            };
        }


        const token = await database.getBy<any>(
            collections.tokens,
            'value',
            functioner,
        );
        if (!token) {
            return {
                status: false,
            };
        }

        const functionArgumentsData = await database.getById<any>(
            collections.functionsArguments,
            token.functionID,
        );
        if (!functionArgumentsData) {
            return {
                status: false,
            };
        }

        delog({
            text: 'databaseGetFunctionArguments success',
            level: 'trace',
        });


        return {
            status: true,
            data: {
                value: functionArgumentsData.value,
            },
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
