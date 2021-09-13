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

        DatabaseCollections,
    } from '~server/data/interfaces';

    import {
        FUNCTIONER_DATABASE_ENDPOINT,
        FUNCTIONER_NETWORK,
    } from '~server/data/constants';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import docker, {
        findDockerImagene,
    } from '~server/logic/docker';

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
    collections: DatabaseCollections,
) => {
    try {
        const functioner = await database.getBy<any>(
            collections.functioners,
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

        const imagene = await findDockerImagene(
            imageneName,
        );
        if (!imagene) {
            return;
        }


        const {
            ownedBy,
        } = functionData;

        const normalizedArguments = normalizeArguments(functionArguments);
        const functionExecutionID = uuid.multiple(3);

        await database.updateDocument(
            collections.executions,
            functionExecutionID,
            {
                arguments: normalizedArguments,
                ownedBy,
                functionID: functionData.id,
            },
        );


        const databaseToken = await generateToken(
            ownedBy,
            functionExecutionID,
            {
                type: 'database',
                constraints: functionData.database,
            },
            collections.tokens,
        );

        const storageToken = await generateToken(
            ownedBy,
            functionExecutionID,
            {
                type: 'storage',
                constraints: functionData.storage,
            },
            collections.tokens,
        );

        const eventToken = await generateToken(
            ownedBy,
            functionExecutionID,
            {
                type: 'event',
            },
            collections.tokens,
        );


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
                        `DESERVE_DATABASE_TOKEN=${databaseToken.value}`,
                        `DESERVE_STORAGE_TOKEN=${storageToken.value}`,
                        `DESERVE_EVENT_TOKEN=${eventToken.value}`,
                    ],
                },
                (error: any, data: any, container: any) => {
                    if (error) {
                        reject(error);
                        return;
                    }

                    // cleanup
                    container.remove();

                    database.deleteDocument(
                        collections.tokens,
                        databaseToken.id,
                    );
                    database.deleteDocument(
                        collections.tokens,
                        storageToken.id,
                    );
                    database.deleteDocument(
                        collections.tokens,
                        eventToken.id,
                    );

                    resolve(true);
                }
            );
        });


        const resultData = await database.getById<any>(
            collections.executions,
            functionExecutionID,
        );
        if (!resultData) {
            return;
        }

        const result = typeof resultData.result === 'string'
            ? resultData.result
            : JSON.stringify(
                resultData.result,
                (_, value) => typeof value === 'undefined' ? null : value,
            );

        return result;
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
            collections,
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
