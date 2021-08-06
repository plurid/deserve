// #region module
export interface Database {
    getFunctionData: () => Promise<any>;
    getFunctionArguments: () => Promise<any>;
}
// #endregion module
