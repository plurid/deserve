// #region module
export interface InputOf<T> {
    input: T;
}


export interface InputValueString {
    value: string;
}


export interface InputRegisterCore {
    register: string;
    identonym: string;
    key: string;
}

export interface InputDeregisterCore {
    id: string;
}


export interface InputRegisterOwner {
    identonym: string;
    key: string;
}

export interface InputLogin {
    identonym: string;
    key: string;
}




export interface InputRequestBlob {
    id: string;
}

export interface InputRequestBlobs {
    ids: string[];
}

export interface InputQueryBlobs {
    coreID?: string;
    filter: string;
    count?: number;
    start?: string;
}


export interface InputRequestKey {
    id: string;
}

export interface InputRequestKeys {
    ids: string[];
}

export interface InputQueryKeys {
    coreID?: string;
    filter: string;
    count?: number;
    start?: string;
}


export interface InputStoreKey {
    data: string;
}


export interface InputUpdateKey {
    id: string;
    data: string;
    field?: string;
}


export interface InputDeleteBlob {
    id: string;
}

export interface InputDeleteKey {
    id: string;
}
// #endregion module
