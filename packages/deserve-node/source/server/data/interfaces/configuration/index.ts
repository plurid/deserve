// #region module
export interface ConfigurationOwner {
    identonym: string;
    hashedKey: string;
}

export interface ConfigurationFile {
    owners?: ConfigurationOwner[];
    registration?: boolean;
}
// #endregion module
