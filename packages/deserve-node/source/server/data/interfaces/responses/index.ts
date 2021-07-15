// #region imports
    // #region external
    import {
        Blob,
        Key,
        StoredKey,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface Response {
    status: boolean;
    error?: Error;
}



export interface ResponseRequestedBlob {
    status: boolean;
    error?: Error;
    data?: Blob;
}

export interface ResponseRequestedBlobs {
    status: boolean;
    error?: Error;
    data?: Blob[];
}

export interface ResponseQueriedBlobs {
    status: boolean;
    error?: Error;
    data?: Blob[];
}



export interface ResponseRequestedKey {
    status: boolean;
    error?: Error;
    data?: Key;
}

export interface ResponseRequestedKeys {
    status: boolean;
    error?: Error;
    data?: Key[];
}

export interface ResponseQueriedKeys {
    status: boolean;
    error?: Error;
    data?: Key[];
}


export interface ResponseStoredKey {
    status: boolean;
    error?: Error;
    data?: StoredKey;
}


export interface Error {
    path: string;
    message: string;
}
// #endregion module
