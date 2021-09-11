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
const databaseGet = async (
    input: any,
    context: Context,
): Promise<Response> => {
    try {
        const {
            functioner,
            collections,
        } = context;

        if (!functioner) {
            delog({
                text: 'databaseGet no functioner',
                level: 'trace',
            });

            return {
                status: false,
            };
        }


        const token = await database.getBy<any>(
            collections.tokens,
            'value',
            functioner,
        );

        // based on the token access the database


        delog({
            text: 'databaseGet success',
            level: 'trace',
        });

        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'databaseGet error',
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
export default databaseGet;
// #endregion exports
