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
const databaseGetFunctionData = async (
    input: any,
    context: Context,
): Promise<any> => {
    try {
        console.log('databaseGetFunctionData', input);

        delog({
            text: 'databaseGetFunctionData success',
            level: 'trace',
        });


        return {
            status: true,
            data: {
                name: 'test',
                text: `
                    const test = (
                        args, services
                    ) => {
                        console.log(args, services);
                    }

                    module.exports = {
                        test,
                    };
                `,
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
