// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';

    import {
        Collection,
    } from 'mongodb';

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
        Token,
        TokenAuthorization,
    } from '~server/data/interfaces';

    import {
        FUNCTIONER_DATABASE_ENDPOINT,
        FUNCTIONER_NETWORK,
    } from '~server/data/constants';

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
    const deserveTokensCollection = await getDeserveTokensCollection();
    const deserveFunctionersCollection = await getDeserveFunctionersCollection();
    if (
        !deserveTokensCollection
        || !deserveFunctionersCollection
    ) {
        return;
    }


    const {
        id: functionID,
        database: databaseConstraints,
        storage: storageConstraints,
    } = functionData;


    const databaseToken = await generateToken(
        functionData.ownedBy,
        functionID,
        {
            type: 'database',
            constraints: databaseConstraints,
        },
        deserveTokensCollection,
    )

    const storageToken = await generateToken(
        functionData.ownedBy,
        functionID,
        {
            type: 'storage',
            constraints: storageConstraints,
        },
        deserveTokensCollection,
    )

    const eventToken = await generateToken(
        functionData.ownedBy,
        functionID,
        {
            type: 'event',
        },
        deserveTokensCollection,
    );


    const id = uuid.multiple(3);
    const functioner = {
        id,
        functionID,
        database: databaseToken.value,
        storage: storageToken.value,
        event: eventToken.value,
        ownedBy: functionData.ownedBy,
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

    const databaseToken = functioner.database;

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
                    NetworkMode: FUNCTIONER_NETWORK,
                },
                Env: [
                    `DESERVE_DATABASE_ENDPOINT=${FUNCTIONER_DATABASE_ENDPOINT}`,
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
    ownedBy: string,
    functionID: string,
    authorization: TokenAuthorization,
    deserveTokensCollection: Collection<any>,
) => {
    const id = uuid.multiple(3);
    const value = uuid.multiple(4);

    const token: Token = {
        id,
        value,
        ownedBy,
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
        return false;
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
