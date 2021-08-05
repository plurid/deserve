// #region imports
    // #region libraries
    import mongodb from 'mongodb';
    // #endregion libraries


    // #region external
    import {
        DESERVE_DATABASE,
        DESERVE_GLOBAL,
        DESERVE_OWNERS,
        DESERVE_CORES,
        DESERVE_KEYS,
        DESERVE_FUNCTIONS,
        DESERVE_BLOBS,
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
export const getDeserveBlobsCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_BLOBS);


export const loadCollections = async () => {
    const deserveGlobalCollection = await getDeserveGlobalCollection();
    const deserveOwnersCollection = await getDeserveOwnersCollection();
    const deserveCoresCollection = await getDeserveCoresCollection();
    const deserveKeysCollection = await getDeserveKeysCollection();
    const deserveFunctionsCollection = await getDeserveFunctionsCollection();
    const deserveBlobsCollection = await getDeserveBlobsCollection();

    if (
        !deserveGlobalCollection
        || !deserveOwnersCollection
        || !deserveCoresCollection
        || !deserveKeysCollection
        || !deserveFunctionsCollection
        || !deserveBlobsCollection
    ) {
        return;
    }

    return {
        global: deserveGlobalCollection,
        owners: deserveOwnersCollection,
        cores: deserveCoresCollection,
        keys: deserveKeysCollection,
        functions: deserveFunctionsCollection,
        blobs: deserveBlobsCollection,
    };
}
// #endregion module
