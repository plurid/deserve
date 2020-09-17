// #region imports
    // #region external
    import {
        STORAGE_TYPE,
    } from '#server/data/constants';

    import Storage from '#server/logic/storage';
    // #endregion external
// #endregion imports



// #region module
const storage = new Storage(STORAGE_TYPE);
// #endregion module



// #region exports
export default storage;
// #endregion exports
