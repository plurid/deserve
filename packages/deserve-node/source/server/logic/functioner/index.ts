// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions'
    // #endregion libraries


    // #region external
    import database from '~server/services/database';

    import {
        getDeserveTokensCollection,
    } from '~server/logic/database/collections';
    // #endregion external
// #endregion imports



// #region module
export const generateToken = async (
    functionID: string,
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
