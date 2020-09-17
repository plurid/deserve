// #region imports
    // #region external
    import {
        StorageTypeData,
        StorageTypeFilesystem,
    } from '#server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const storageTypeFilesystem: StorageTypeFilesystem = 'filesystem';

export const storageType: StorageTypeData = {
    filesystem: storageTypeFilesystem,
};
// #endregion module
