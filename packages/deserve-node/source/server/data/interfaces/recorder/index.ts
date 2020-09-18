// #region module
export interface RecorderEntry {
    core: string;
    event: RecorderEvent;
    data: string;
}


export type RecorderStore = RecorderEntry & {
    id: string;
}


export type RecorderEvent =
    | 'upload-file'
    | 'download-file'
    | 'upload-data'
    | 'download-data';
// #endregion module
