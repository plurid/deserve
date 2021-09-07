// #region imports
    // #region libraries
    import {
        ApolloClient,
        NormalizedCacheObject,
    } from '@apollo/client';
    // #endregion libraries
// #endregion imports



// #region exports
export type GraphqlClient = ApolloClient<NormalizedCacheObject>;


export type ClientResponse<D = any> =
    | ClientErrorResponse<any>
    | ClientSuccessResponse<D>;

export interface ClientErrorResponse<E = any> {
    status: false;
    error: E;
}

export interface ClientSuccessResponse<D = any> {
    status: true;
    data: D;
}


export type BlobsGet = (
    id: string | string[],
) => Promise<ClientResponse<ReadableStream | undefined>>;

export type BlobsStore = (
    stream: ReadableStream,
) => Promise<ClientResponse<any>>;

export type BlobsDelete = (
    id: string,
) => Promise<ClientResponse<boolean>>;

export type BlobsQuery = (
    filter: string,
    count?: number,
    start?: string,
) => Promise<ClientResponse<any>>;



export type KeysGet = <T = any>(
    id: string | string[],
) => Promise<ClientResponse<T | undefined>>;

export type KeysStore = <T = any>(
    data: T,
) => Promise<ClientResponse<boolean>>;

export type KeysUpdate = <T = any>(
    id: string,
    data: T,
    field?: string,
) => Promise<ClientResponse<boolean>>;

export type KeysDelete =(
    id: string,
) => Promise<ClientResponse<boolean>>;

export type KeysQuery = <T = any>(
    filter: string,
    count?: number,
    start?: string,
) => Promise<ClientResponse<T[] | undefined>>;



export type FunctionsGet = <T = any>(
    id: string | string[],
) => Promise<ClientResponse<T | undefined>>;

export type FunctionsStore = <T = any>(
    data: T,
) => Promise<ClientResponse<boolean>>;

export type FunctionsUpdate = <T = any>(
    id: string,
    data: T,
    field?: string,
) => Promise<ClientResponse<boolean>>;

export type FunctionsDelete =(
    id: string,
) => Promise<ClientResponse<boolean>>;

export type FunctionsQuery = <T = any>(
    filter: string,
    count?: number,
    start?: string,
) => Promise<ClientResponse<T[] | undefined>>;

export type FunctionsRun = <T = any>(
    id: string,
    args?: string,
) => Promise<ClientResponse<T[] | undefined>>;



export interface IDeserveClient {
    blobs: {
        get: BlobsGet,
        store: BlobsStore,
        delete: BlobsDelete,
        query: BlobsQuery,
    };
    keys: {
        get: KeysGet,
        store: KeysStore,
        update: KeysUpdate,
        delete: KeysDelete,
        query: KeysQuery,
    };
    functions: {
        get: FunctionsGet,
        store: FunctionsStore,
        update: FunctionsUpdate,
        delete: FunctionsDelete,
        query: FunctionsQuery,
        run: FunctionsQuery,
    };
}

export interface DeserveClientOptions {
    host?: string;
}
// #endregion exports
