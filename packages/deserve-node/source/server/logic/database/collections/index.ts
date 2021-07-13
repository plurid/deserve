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
        DESERVE_DATA,
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
export const getDeserveDataCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_DATA);
export const getDeserveBlobsCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_BLOBS);
// #endregion module
