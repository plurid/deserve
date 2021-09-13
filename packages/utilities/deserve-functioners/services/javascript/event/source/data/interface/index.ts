// #region module
export type EventEmit = (
    type: string,
    data?: string | any,
) => Promise<boolean>;


export interface Event {
    emit: EventEmit;
}
// #endregion module
