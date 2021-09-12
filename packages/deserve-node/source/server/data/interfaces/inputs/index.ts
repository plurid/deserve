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


export interface InputGetFunctions {
    coreID?: string;
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
    coreID?: string;
    id: string;
}

export interface InputDeleteKey {
    coreID?: string;
    id: string;
}



export interface InputStoreFunction {
    name: string;
    text: string;
    language: string;
    database?: string;
    storage?: string;
    externals?: string;
}

export interface InputUpdateFunction {
    id: string;
    name?: string;
    text?: string;
    database?: string;
    storage?: string;
    externals?: string;
}

export interface InputDeleteFunction {
    id: string;
}


export interface InputRunFunction {
    id: string;
    arguments?: string;
}








export interface InputFunctionerDatabaseGet {
    id?: string;
}

export interface InputFunctionerDatabaseQuery {
    filter?: string;
    pagination?: string;
}


export interface InputFunctionerEventEmit {
    data: string;
}



export interface InputFunctionerDatabaseSet {
    id: string;
    data: string;
}

export interface InputFunctionerDatabaseRemove {
    id: string;
}


export interface InputFunctionerStorageRemove {
    id: string;
}
// #endregion module
