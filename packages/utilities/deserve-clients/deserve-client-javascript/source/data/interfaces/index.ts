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


export type BlobsGet = (
    id: string | string[],
) => Promise<ReadableStream | undefined>;

export type BlobsStore = (
    stream: ReadableStream,
) => Promise<any>;

export type BlobsDelete = (
    id: string,
) => Promise<boolean>;

export type BlobsQuery = (
    filter: string,
    count?: number,
    start?: string,
) => Promise<any>;



export type KeysGet =<T = any>(
    id: string | string[],
) => Promise<T | undefined>;

export type KeysStore = <T = any>(
    data: T,
) => Promise<any>;

export type KeysUpdate = <T = any>(
    id: string,
    data: T,
    field?: string,
) => Promise<boolean>;

export type KeysDelete =(
    id: string,
) => Promise<boolean>;

export type KeysQuery =(
    filter: string,
    count?: number,
    start?: string,
) => Promise<any>;



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
}

export interface DeserveClientOptions {
    host?: string;
}
// #endregion exports
