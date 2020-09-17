// #region module
export type StorageType =
    | StorageTypeFilesystem;

export type StorageTypeFilesystem = 'filesystem';

export interface StorageTypeData {
    filesystem: StorageTypeFilesystem;
}


export interface Storage {
    download: StorageDownload;
    downloadAll: StorageDownloadAll;
    upload: StorageUpload;
    obliterate: StorageObliterate;
    obliterateAll: StorageObliterateAll;
    generateLocations: StorageGenerateLocations;
}

export type StorageDownload = (
    filename: string,
) => Promise<string | undefined>;

export type StorageDownloadAll = (
    directory: string,
) => Promise<any[]>;

export type StorageUpload = (
    filename: string,
    data: Buffer,
    kind?: StorageUploadKind,
) => Promise<true | void>;

export type StorageObliterate = (
    filename: string,
) => Promise<true | undefined>;

export type StorageObliterateAll = (
    path: string,
) => Promise<true | undefined>;

export type StorageGenerateLocations = () => Promise<true | undefined>;


export type StorageUploadKind =
    | 'write'
    | 'append';
// #endregion module
