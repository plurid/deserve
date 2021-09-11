// #region imports
    // #region libraries
    import fs from 'fs';
    // #endregion libraries
// #endregion imports



// #region module
export type StorageGet = (
    id?: string,
) => Promise<ReadableStream<Uint8Array> | null>;

export type StorageUpload = (
    stream: fs.ReadStream,
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
