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
        DatabaseCollections,
        StoredFunction,
        Token,
        TokenAuthorization,
        Functioner,
    } from '~server/data/interfaces';

    import {
        FUNCTIONER_DESERVE_ENDPOINT,
        FUNCTIONER_NETWORK,
    } from '~server/data/constants';

    import database from '~server/services/database';

    import {
        getDeserveFunctionersCollection,
        getDeserveTokensCollection,
    } from '~server/logic/database/collections';

    import docker, {
        findDockerImagene,
    } from '~server/logic/docker';

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
    collections: DatabaseCollections,
    functionData: StoredFunction,
) => {
    const {
        id: functionID,
        database: databaseConstraints,
        coreID,
    } = functionData;

    const databaseToken = await generateToken(
        functionData.ownedBy,
        functionID,
        coreID,
        {
            type: 'database',
            constraints: databaseConstraints,
        },
        collections.tokens,
    );


    const id = uuid.multiple(3);
    const functioner: Functioner = {
        id,
        functionID,
        generatedAt: Date.now(),
        ownedBy: functionData.ownedBy,
    };

    await database.updateDocument(
        collections.functioners,
        id,
        functioner,
    );


    return {
        functioner,
        databaseToken,
    };
}


export const prepareFunctioner = async (
    collections: DatabaseCollections,
    functionData: StoredFunction,
) => {
    const functionerData = await writeFunctioner(
        collections,
        functionData,
    );
    if (!functionerData) {
        return false;
    }

    const {
        functioner,
        databaseToken,
    } = functionerData;

    const {
        language,
        ownedBy
    } = functionData;


    const functionerBaseImageneName = `deserve-functioner-${language}`;
    const baseImagene = await findDockerImagene(functionerBaseImageneName);
    if (!baseImagene) {
        return false;
    }


    // create imagene based on functionData and functioner
    const functionerRunImageneName = `functioner-${ownedBy}-${uuid.generate()}`;

    // docker run - obtain container with custom function data
    //              from deserve-functioner-language
    // docker commmit - obtain new imagene from the custom function container
    await new Promise((resolve, reject) => {
        docker.run(
            functionerBaseImageneName,
            [],
            process.stdout,
            {
                HostConfig: {
                    NetworkMode: FUNCTIONER_NETWORK,
                },
                Env: [
                    `DESERVE_ENDPOINT=${FUNCTIONER_DESERVE_ENDPOINT}`,
                    `DESERVE_DATABASE_TOKEN=${databaseToken.value}`,
                ],
            },
            (error: any, data: any, container: Container) => {
                if (error) {
                    // cleanup

                    reject(error);
                    return;
                }

                container.commit(
                    {
                        repo: functionerRunImageneName,
                    },
                    async (error, result) => {
                        if (error) {
                            // cleanup

                            reject(error);
                            return;
                        }

                        await container.remove();

                        database.deleteDocument(
                            collections.tokens,
                            databaseToken.id,
                        );

                        resolve(true);
                    },
                );
            },
        );
    });


    await database.updateDocument(
        collections.functioners,
        functioner.id,
        {
            imageneName: functionerRunImageneName,
        },
    );


    return true;
}


export const generateToken = async (
    ownedBy: string,
    functionID: string,
    coreID: string,
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
        coreID,
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
