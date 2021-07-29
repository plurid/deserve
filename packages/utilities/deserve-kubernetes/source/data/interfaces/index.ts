// #region exports
export type WorkerMessage =
    | {
        type: 'initialize';
        data: any;
    }
    | {
        type: 'destroy';
    };
// #endregion exports
