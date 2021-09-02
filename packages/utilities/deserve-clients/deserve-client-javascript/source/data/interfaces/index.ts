// #region exports
export interface IDeserveClient {
    blobs: {
        get: (
            id: string,
        ) => Promise<ReadableStream | undefined>;
    };
    keys: {
        get: <T = any>(
            id: string,
        ) => Promise<T | undefined>;
    };
}

export interface DeserveClientOptions {
    host?: string;
}
// #endregion exports
