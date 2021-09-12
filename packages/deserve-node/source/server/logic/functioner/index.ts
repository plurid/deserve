// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';

    import {
        Container,
    } from 'dockerode';

    import {
        uuid,
    } from '@plurid/plurid-functions'
    // #endregion libraries


    // #region external
    import {
        StoredFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getDeserveFunctionersCollection,
        getDeserveTokensCollection,
    } from '~server/logic/database/collections';

    import docker from '~server/logic/docker';

    import {
        dataToObjectOrDefault,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getFunctioner = (
    request: Request,
) => {
    const functioner = request.headers['deserve-functioner'];
    if (typeof functioner !== 'string') {
        return;
    }

    return functioner;
}


export const validateDatabaseConstraints = async (
    ownerID: string,
    databaseConstraints: string | undefined,
) => {
    if (!databaseConstraints) {
        return '*';
    }

    const data: string | string[] = dataToObjectOrDefault(databaseConstraints);

    if (typeof data === 'string') {
        if (data === '*') {
            return data;
        }

        // check the owner has access to the id (data)
    }

    for (const item of data) {
        // check the owner has access to the id (item)
    }

    return data;
}


export const validateStorageConstraints = async (
    ownerID: string,
    storageConstraints: string | undefined,
) => {
    if (!storageConstraints) {
        return '*';
    }

    const data: string | string[] = dataToObjectOrDefault(storageConstraints);

    if (typeof data === 'string') {
        if (data === '*') {
            return data;
        }

        // check the owner has access to the id (data)
    }

    for (const item of data) {
        // check the owner has access to the id (item)
    }

    return data;
}


export const writeFunctioner = async (
    functionData: StoredFunction,
) => {
    const deserveFunctionersCollection = await getDeserveFunctionersCollection();
    if (!deserveFunctionersCollection) {
        return;
    }


    const {
        id: functionID,
        database: databaseConstraints,
        storage: storageConstraints,
    } = functionData;


    const databaseToken = await generateToken(
        functionID,
        {
            type: 'database',
            constraints: databaseConstraints,
        },
    )

    const storageToken = await generateToken(
        functionID,
        {
            type: 'storage',
            constraints: storageConstraints,
        },
    )

    const eventToken = await generateToken(
        functionID,
        {
            type: 'event',
        },
    );


    const id = uuid.multiple(3);
    const functioner = {
        id,
        functionID,
        databaseToken,
        storageToken,
        eventToken,
    };

    await database.updateDocument(
        deserveFunctionersCollection,
        id,
        functioner,
    );

    return functioner;
}


export const prepareFunctioner = async (
    functionData: StoredFunction,
) => {
    const functioner = await writeFunctioner(
        functionData,
    );
    if (!functioner) {
        return false;
    }

    const {
        language,
        ownedBy
    } = functionData;


    // create imagene based on functionData and functioner
    const imageneName = `functioner-${ownedBy}-${uuid.generate()}`;

    const databaseEndpoint = 'http://host.docker.internal:3366/deserve';
    const databaseToken = functioner.databaseToken?.value;
    console.log('databaseEndpoint', databaseEndpoint);
    console.log('databaseToken', databaseToken);
    const network = 'host';

    // docker run - obtain container with custom function data
    //              from deserve-functioner-language
    // docker commmit - obtain new imagene from the custom function container
    await new Promise((resolve, reject) => {
        docker.run(
            `deserve-functioner-${language}`,
            [],
            process.stdout,
            {
                HostConfig: {
                    NetworkMode: network,
                },
                Env: [
                    `DESERVE_DATABASE_ENDPOINT=${databaseEndpoint}`,
                    `DESERVE_DATABASE_TOKEN=${databaseToken}`,
                ],
            },
            (error: any, data: any, container: Container) => {
                if (error) {
                    reject(error);
                    return;
                }

                container.commit(
                    {
                        repo: imageneName,
                    },
                    async (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }

                        await container.remove();

                        resolve(true);
                    },
                );
            },
        );
    });


    // save imageneName to database
    const deserveFunctionersCollection = await getDeserveFunctionersCollection();
    if (!deserveFunctionersCollection) {
        return;
    }

    await database.updateDocument(
        deserveFunctionersCollection,
        functioner.id,
        {
            imageneName,
        },
    );

    return true;
}


export const generateToken = async (
    functionID: string,
    authorization: {
        type: 'database' | 'storage' | 'event',
        constraints?: string | string[],
    },
) => {
    const deserveTokensCollection = await getDeserveTokensCollection();
    if (!deserveTokensCollection) {
        return;
    }


    const id = uuid.multiple(3);
    const value = uuid.multiple(4);

    const token = {
        id,
        value,
        functionID,
        authorization,
    };


    await database.updateDocument(
        deserveTokensCollection,
        id,
        token,
    );

    return token;
}


export const deleteToken = async (
    tokenValue: string,
) => {
    const deserveTokensCollection = await getDeserveTokensCollection();
    if (!deserveTokensCollection) {
        return;
    }


    const token: any = await database.getBy(
        deserveTokensCollection,
        'value',
        tokenValue,
    );

    if (!token) {
        return true;
    }


    const deleted = await database.deleteDocument(
        deserveTokensCollection,
        token.id,
    );

    if (!deleted) {
        return false;
    }

    return true;
}
// #endregion module
