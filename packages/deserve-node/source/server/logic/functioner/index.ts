// #region imports
    // #region libraries
    import {
        Request,
    } from 'express';

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

    const validDatabaseConstraints = await validateDatabaseConstraints(databaseConstraints);
    const validStorageConstraints = await validateStorageConstraints(storageConstraints);


    const databaseToken = validDatabaseConstraints ? await generateToken(
        functionID,
        {
            type: 'database',
            constraints: validDatabaseConstraints,
        },
    ) : undefined;

    const storageToken = validStorageConstraints ? await generateToken(
        functionID,
        {
            type: 'storage',
            constraints: validStorageConstraints,
        },
    ) : undefined;

    const eventToken = await generateToken(
        functionID,
        {
            type: 'event',
        },
    );


    const id = uuid.generate() + uuid.generate() + uuid.generate();

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

    // create imagene based on functionData and functioner
    const imageneName = `functioner-${functionData.name}-${uuid.generate()}`;

    // docker.buildImage(
    //     {
    //         context: '',
    //         src: [],
    //     },
    //     {
    //         t: imageneName,
    //     },
    //     (err, response) => {
    //         //...
    //     },
    // );

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


    const id = uuid.generate() + uuid.generate() + uuid.generate();
    const value = uuid.generate() + uuid.generate() + uuid.generate() + uuid.generate();

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
