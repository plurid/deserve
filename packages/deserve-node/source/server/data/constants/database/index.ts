// #region imports
    // #region external
    import {
        DatabaseTypeData,
        DatabaseTypeFilesystem,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const databaseTypeFilesystem: DatabaseTypeFilesystem = 'filesystem';

export const databaseType: DatabaseTypeData = {
    filesystem: databaseTypeFilesystem,
};
// #endregion module
