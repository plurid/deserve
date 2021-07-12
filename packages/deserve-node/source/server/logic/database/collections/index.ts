// #region imports
    // #region libraries
    import mongodb from 'mongodb';
    // #endregion libraries


    // #region external
    import {
        database,
    } from '../connection';
    // #endregion external
// #endregion imports



// #region module
export const getDeserveDatabase = async () => (await database)?.db(DESERVE_DATABASE);

export const getDeserveGlobalCollection = async <T = any>() => (await getDeserveDatabase())?.collection<T>(DESERVE_GLOBAL);
// #endregion module
