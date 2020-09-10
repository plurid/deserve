// #region module
export interface InputOf<T> {
    input: T;
}

export interface InputRegisterCore {
    domain: string;
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
// #endregion module
