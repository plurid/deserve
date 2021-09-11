// #region module
export type EventEmit = (
    data: any,
) => Promise<boolean>;


export interface Event {
    emit: EventEmit;
}
// #endregion module
