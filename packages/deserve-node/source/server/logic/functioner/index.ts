// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions'
    // #endregion libraries


    // #region external
    import database from '~server/services/database';

    import {
        getDeserveFunctionersCollection,
        getDeserveTokensCollection,
    } from '~server/logic/database/collections';
    // #endregion external
// #endregion imports



// #region module
export const writeFunctioner = async (
    functionData: any,
) => {
    const deserveFunctionersCollection = await getDeserveFunctionersCollection();
    if (!deserveFunctionersCollection) {
        return;
    }


    const {
        functionID,
        database: databaseConstraints,
        storage: storageConstraints,
    } = functionData;


    const databaseToken = databaseConstraints ? await generateToken(
        functionID,
        {
            type: 'database',
            constraints: databaseConstraints,
        },
    ) : undefined;

    const storageToken = storageConstraints ? await generateToken(
        functionID,
        {
            type: 'storage',
            constraints: storageConstraints,
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
    functionData: any,
) => {
    const functioner = await writeFunctioner(
        functionData,
    );

    // run the docker functioner imagene

    // create imagene based on function
}


export const generateToken = async (
    functionID: string,
    authorization: any,
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
