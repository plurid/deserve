// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputStoreFunction,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const storeFunction = async (
    input: InputStoreFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
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
            text: 'storeFunction error',
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
export default storeFunction;
// #endregion exports
