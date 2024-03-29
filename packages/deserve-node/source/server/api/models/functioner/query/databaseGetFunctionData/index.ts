// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        Token,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseGetFunctionData = async (
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


        const token = await database.getBy<Token>(
            collections.tokens,
            'value',
            functioner,
        );
        if (
            !token
            || token.authorization.type !== 'database'
        ) {
            return {
                status: false,
            };
        }


        const functionData = await database.getById<any>(
            collections.functions,
            token.functionID,
        );
        if (!functionData) {
            return {
                status: false,
            };
        }


        const {
            name,
            text,
            externals,
            addins,
        } = functionData;

        delog({
            text: 'databaseGetFunctionData success',
            level: 'trace',
        });


        return {
            status: true,
            data: {
                name,
                text,
                externals: JSON.stringify(externals),
                addins: JSON.stringify(addins),
            },
        };
    } catch (error) {
        delog({
            text: 'databaseGetFunctionData error',
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
export default databaseGetFunctionData;
// #endregion exports
