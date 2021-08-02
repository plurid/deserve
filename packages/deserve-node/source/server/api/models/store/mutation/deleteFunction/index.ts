// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputDeleteFunction,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const deleteFunction = async (
    input: InputDeleteFunction,
    context: Context,
): Promise<any> => {
    try {
        return {
            status: true,
            data: [],
        };
    } catch (error) {
        delog({
            text: 'deleteFunction error',
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
export default deleteFunction;
// #endregion exports
