// #region imports
    // #region external
    import {
        Storage,
    } from '~data/interface';
    // #endregion external


    // #region internal
    import get from './get';
    import upload from './upload';
    import remove from './remove';
    // #endregion internal
// #endregion imports



// #region module
const storage: Storage = {
    get,
    upload,
    remove,
};
// #endregion module



// #region exports
export default storage;
// #endregion exports
