// #region imports
    // #region libraries
    import mongodb from 'mongodb';
    // #endregion libraries


    // #region external
    import {
        DatabaseCollections
    } from '~server/data/interfaces';

    import {
        DESERVE_DATABASE,
        DESERVE_GLOBAL,
        DESERVE_OWNERS,
        DESERVE_CORES,
        DESERVE_KEYS,
        DESERVE_FUNCTIONS,
        DESERVE_EXECUTIONS,
        DESERVE_FUNCTIONERS,
        DESERVE_BLOBS,
        DESERVE_TOKENS,
    } from '~server/data/constants';

    import {
        database,
    } from '../connection';
    // #endregion external
// #endregion imports



// #region module
export const getDeserveDatabase = async () => (await database)?.db(DESERVE_DATABASE);

export const getDeserveGlobalCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_GLOBAL);
export const getDeserveOwnersCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_OWNERS);
export const getDeserveCoresCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_CORES);
export const getDeserveKeysCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_KEYS);
export const getDeserveFunctionsCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_FUNCTIONS);
export const getDeserveExecutionsCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_EXECUTIONS);
export const getDeserveFunctionersCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_FUNCTIONERS);
export const getDeserveBlobsCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_BLOBS);
export const getDeserveTokensCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_TOKENS);


export const loadCollections = async () => {
    const deserveGlobalCollection = await getDeserveGlobalCollection();
    const deserveOwnersCollection = await getDeserveOwnersCollection();
    const deserveCoresCollection = await getDeserveCoresCollection();
    const deserveKeysCollection = await getDeserveKeysCollection();
    const deserveFunctionsCollection = await getDeserveFunctionsCollection();
    const deserveExecutionsCollection = await getDeserveExecutionsCollection();
    const deserveFunctionersCollection = await getDeserveFunctionersCollection();
    const deserveBlobsCollection = await getDeserveBlobsCollection();
    const deserveTokensCollection = await getDeserveTokensCollection();

    if (
        !deserveGlobalCollection
        || !deserveOwnersCollection
        || !deserveCoresCollection
        || !deserveKeysCollection
        || !deserveFunctionsCollection
        || !deserveExecutionsCollection
        || !deserveFunctionersCollection
        || !deserveBlobsCollection
        || !deserveTokensCollection
    ) {
        return;
    }

    const collections: DatabaseCollections = {
        global: deserveGlobalCollection,
        owners: deserveOwnersCollection,
        cores: deserveCoresCollection,
        keys: deserveKeysCollection,
        functions: deserveFunctionsCollection,
        executions: deserveExecutionsCollection,
        functioners: deserveFunctionersCollection,
        blobs: deserveBlobsCollection,
        tokens: deserveTokensCollection,
    };

    return collections;
}
// #endregion module
