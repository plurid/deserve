// #region imports
    // #region libraries
    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputRunFunction,

        StoredFunction,
    } from '~server/data/interfaces';

    import database, {
        getDeserveFunctionsArgumentsCollection,
    } from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        generateToken,
    } from '~server/logic/functioner';
    // #endregion external
// #endregion imports



// #region module
export const normalizeArguments = (
    functionArguments: string | undefined,
) => {
    if (!functionArguments) {
        return '{}';
    }

    return functionArguments;
}


export const executeFunction = async (
    functionData: StoredFunction,
    functionArguments: string | undefined,
) => {
    try {
        const normalizedArguments = normalizeArguments(functionArguments);

        const functionExecutionID = uuid.generate() + uuid.generate() + uuid.generate();

        const deserveFunctionsArgumentsCollection = await getDeserveFunctionsArgumentsCollection();
        if (!deserveFunctionsArgumentsCollection) {
            return;
        }
        await database.updateDocument(
            deserveFunctionsArgumentsCollection,
            functionExecutionID,
            {
                value: normalizedArguments,
            },
        );

        const databaseToken = await generateToken(
            functionExecutionID,
            {
                type: 'database',
                constraints: functionData.database,
            },
        );

        // based on
            // functionData
            // databaseToken
                // run the appropriate docker imagene

        // docker run with the appropriate tokens the custom imagene for the function

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
