// #region imports
    // #region external
    import {
        Database,
    } from '~data/interface';
    // #endregion external


    // #region internal
    import getFunctionData from './getFunctionData';
    import getFunctionArguments from './getFunctionArguments';

    import get from './get';
    import query from './query';
    import set from './set';
    import remove from './remove';
    // #endregion internal
// #endregion imports



// #region module
const database: Database = {
    getFunctionData,
    getFunctionArguments,

    get,
    query,
    set,
    remove,
};
// #endregion module



// #region exports
export default database;
// #endregion exports
