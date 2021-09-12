// #region imports
    // #region libraries
    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        InputRunFunction,
        Context,
        StoredFunction,
    } from '~server/data/interfaces';

    import {
        FUNCTIONER_DATABASE_ENDPOINT,
        FUNCTIONER_NETWORK,
    } from '~server/data/constants';

    import database, {
        getDeserveFunctionsArgumentsCollection,
        getDeserveFunctionersCollection,
    } from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import docker from '~server/logic/docker';

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

        const functionExecutionID = uuid.multiple(3);

        const deserveFunctionsArgumentsCollection = await getDeserveFunctionsArgumentsCollection();
        const deserveFunctionersCollection = await getDeserveFunctionersCollection();
        if (
            !deserveFunctionsArgumentsCollection
            || !deserveFunctionersCollection
        ) {
            return;
        }

        await database.updateDocument(
            deserveFunctionsArgumentsCollection,
            functionExecutionID,
            {
                value: normalizedArguments,
            },
        );

        await generateToken(
            functionExecutionID,
            {
                type: 'database',
                constraints: functionData.database,
            },
        );

        const functioner = await database.getBy<any>(
            deserveFunctionersCollection,
            'functionID',
            functionData.id,
        );
        if (!functioner) {
            return;
        }

        const {
            imageneName,
        } = functioner;
        if (!imageneName) {
            return;
        }

        // docker run with the appropriate tokens the custom imagene for the function
        const databaseToken = functioner.databaseToken?.value;

        await new Promise((resolve, reject) => {
            docker.run(
                imageneName,
                ['yarn', 'start'],
                process.stdout,
                {
                    HostConfig: {
                        NetworkMode: FUNCTIONER_NETWORK,
                    },
                    Env: [
                        `DESERVE_DATABASE_ENDPOINT=${FUNCTIONER_DATABASE_ENDPOINT}`,
                        `DESERVE_DATABASE_TOKEN=${databaseToken}`,
                    ],
                },
                (error: any, data: any, container: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    container.remove();

                    resolve(true);
                }
            );
        });

        // query for the result
        // and return it

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
