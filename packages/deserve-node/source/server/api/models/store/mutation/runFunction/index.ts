// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputRunFunction,

        StoredFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
export const parseArguments = (
    functionArguments: string | undefined,
) => {
    try {
        if (!functionArguments) {
            return;
        }

        return JSON.parse(functionArguments);
    } catch (error) {
        return;
    }
}


export const executeFunction = async (
    functionData: StoredFunction,
    functionArguments: string | undefined,
) => {
    try {
        const parsedArguments = parseArguments(functionArguments);

        // based on data and arguments run the appropriate docker imagene

        return true;
    } catch (error) {
        return;
    }
}


const runFunction = async (
    input: InputRunFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;

        const {
            id: functionID,
            arguments: functionArguments,
        } = input;

        const core = await getCoreFromRequest(request);

        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const functionData = await database.getById<StoredFunction>(
            collections.functions,
            functionID,
        );
        if (!functionData) {
            return {
                status: false,
            };
        }


        const functionResult = await executeFunction(
            functionData,
            functionArguments,
        );

        if (!functionResult) {
            return {
                status: false,
            };
        }

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
