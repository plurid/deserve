// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputUpdateFunction,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const updateFunction = async (
    input: InputUpdateFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            id,
            name: functionName,
            text: functionText,
            database: functionDatabase,
            storage: functionStorage,
            externals: functionExternals,
        } = input;

        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'updateFunction error',
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
export default updateFunction;
// #endregion exports
