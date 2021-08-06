// #region module
export interface Event {
    emit: (
        data: any,
    ) => Promise<boolean>;
}
// #endregion module
