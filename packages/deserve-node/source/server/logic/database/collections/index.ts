// #region imports
    // #region libraries
    import mongodb from 'mongodb';
    // #endregion libraries


    // #region external
    import {
        DESERVE_DATABASE,
        DESERVE_GLOBAL,
        DESERVE_DATA,
    } from '~server/data/constants';

    import {
        database,
    } from '../connection';
    // #endregion external
// #endregion imports



// #region module
export const getDeserveDatabase = async () => (await database)?.db(DESERVE_DATABASE);

export const getDeserveGlobalCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_GLOBAL);

export const getDeserveDataCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_DATA);
// #endregion module
