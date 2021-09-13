// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputFunctionerDatabaseRemove,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseRemove = async (
    input: InputFunctionerDatabaseRemove,
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
            id,
        } = input;

        // check token has access to the key with id


        delog({
            text: 'databaseRemove success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'databaseRemove error',
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
export default databaseRemove;
// #endregion exports
