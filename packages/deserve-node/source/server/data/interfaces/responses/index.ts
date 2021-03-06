// #region methods
export interface Response {
    status: boolean;
    error?: Error;
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


export interface Key {
    id: string;
    value: string;
    storedAt: number;
    sha: string;
    updatedAt?: number;
}

export interface StoredKey {
    id: string;
}
// #endregion methods
