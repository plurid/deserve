// #region module
export interface DeserverData {
    rootKeyHash?: string;
    adminKeyHash?: string;
}


export interface DeserveData {
    owners?: {
        identonym: string;
        hashedKey: string;
    }[];
    registration?: boolean;
}
// #endregion module
