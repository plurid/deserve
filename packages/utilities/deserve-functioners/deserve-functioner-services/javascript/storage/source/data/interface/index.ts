// #region imports
    // #region libraries
    import stream from 'stream';
    // #endregion libraries
// #endregion imports



// #region module
export type StorageGet = (
    id?: string,
) => stream.Readable | undefined;

export type StorageUpload = (
    stream: stream.Readable,
) => Promise<boolean>;

export type StorageRemove = (
    id?: string,
) => Promise<boolean>;


export interface Storage {
    get: StorageGet;
    upload: StorageUpload;
    remove: StorageRemove;
}
// #endregion module
