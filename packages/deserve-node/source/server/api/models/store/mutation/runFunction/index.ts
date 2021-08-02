// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputRunFunction,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const runFunction = async (
    input: InputRunFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            id,
            arguments: functionArguments,
        } = input;

        // check for permission

        // query for function data

        // assemble function context

        // execute function
        const functionResult = '';

        return {
            status: true,
            data: functionResult,
        };
    } catch (error) {
        delog({
            text: 'runFunction error',
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
export default runFunction;
// #endregion exports
