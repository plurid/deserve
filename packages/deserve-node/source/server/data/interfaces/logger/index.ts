// #region module
export interface Logger {
    log: (
        data: string,
        level?: number,
        error?: any,
    ) => void;
}

export interface LogLevels {
    none: number;
    fatal: number;
    error: number;
    warn: number;
    info: number;
    debug: number;
    trace: number;
    all: number;
}


export interface MethodLogs {
    infoStart: string;
    infoSuccess: string;
    infoEnd: string;

    errorEnd: string;

    infoHandlePrivateUsage: string;
    infoEndPrivateUsage: string;
    infoSuccessPrivateUsage: string;

    infoHandleCustomLogicUsage: string;
    infoEndCustomLogicUsage: string;
    infoSuccessCustomLogicUsage: string;
}
// #endregion module
