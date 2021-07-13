// #region methods
export interface Response {
    status: boolean;
    error?: Error;
}



export interface ResponseRequestedKey {
    status: boolean;
    error?: Error;
    data?: string;
}

export interface ResponseRequestedKeys {
    status: boolean;
    error?: Error;
    data?: string[];
}


export interface ResponseQueriedKeys {
    status: boolean;
    error?: Error;
    data?: string[];
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


export interface StoredKey {
    id: string;
}
// #endregion methods
