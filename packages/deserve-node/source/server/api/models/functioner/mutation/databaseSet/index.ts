// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputFunctionerDatabaseSet,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const databaseSet = async (
    input: InputFunctionerDatabaseSet,
    context: Context,
): Promise<Response> => {
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


        const {
            data,
            id,
        } = input;

        if (id === '__deserve-function-result__') {
            const result = JSON.parse(data);

            database.updateDocument(
                collections.functionsResults,
                token.functionID,
                {
                    ...result,
                },
            );

            return {
                status: true,
            };
        }


        delog({
            text: 'databaseSet success',
            level: 'trace',
        });

        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'databaseSet error',
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
export default databaseSet;
// #endregion exports
