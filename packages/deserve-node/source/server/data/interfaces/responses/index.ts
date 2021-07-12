// #region methods
export interface Response {
    status: boolean;
    error?: Error;
}


export interface ResponseRequestedBlob {
    status: boolean;
    error?: Error;
    data?: Blob;
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


export interface ResponseStoredBlob {
    status: boolean;
    error?: Error;
    data?: StoredBlob;
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

export interface Blob {}
export interface Key {}
export interface StoredBlob {}

export interface StoredKey {
    id: string;
}
// #endregion methods
