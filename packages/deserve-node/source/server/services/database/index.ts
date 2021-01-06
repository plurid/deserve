// #region imports
    // #region external
    import {
        DATABASE_TYPE,
    } from '~server/data/constants';

    import Database from '~server/logic/database';
    // #endregion external
// #endregion imports



// #region module
const database = new Database(DATABASE_TYPE);
// #endregion module



// #region exports
export default database;
// #endregion exports
