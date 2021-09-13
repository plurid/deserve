// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputFunctionerDatabaseQuery,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseQuery = async (
    input: InputFunctionerDatabaseQuery,
    context: Context,
): Promise<Response> => {
    try {
        const {
            collections,
            functioner,
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


        const {
            filter,
            pagination,
        } = input;


        delog({
            text: 'databaseQuery success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'databaseQuery error',
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
export default databaseQuery;
// #endregion exports
