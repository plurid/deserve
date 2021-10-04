// #region imports
    import {
        Buffer,
    } from 'buffer';

    import {
        Readable,
    } from 'stream';

    // #region libraries
    import {
        ApolloClient,
        NormalizedCacheObject,
    } from '@apollo/client';
    // #endregion libraries
// #endregion imports



// #region exports
export type GraphqlClient = ApolloClient<NormalizedCacheObject>;

export interface ClientData {
    token: string;
    clientHost: string,
    clientOrigin: string | undefined;
    graphqlClient: GraphqlClient | undefined;
}


export type ClientResponse<D = any> =
    | ClientErrorResponse<any>
    | ClientSuccessResponse<D>;

export interface ClientErrorResponse<E = any> {
    status: false;
    error?: E;
}

export interface ClientSuccessResponse<D = any> {
    status: true;
    data: D;
}


/**
 * The selector can be a `string` id or a filter `record`.
 */
export type DataSelector = string | Record<string, any>;



export type BlobsGet = (
    id: string,
) => Promise<ClientResponse<Response | undefined>>;

export interface BlobsStoreOptions {
    contentType?: string;
    metadata?: any;
}

export type BlobsStore = (
    storeable: string | Buffer | Readable,
    options?: BlobsStoreOptions,
) => Promise<ClientResponse<any>>;

export type BlobsDelete = (
    id: string,
) => Promise<ClientResponse<boolean>>;

export type BlobsQuery = (
    selector: DataSelector,
    count?: number,
    start?: string,
) => Promise<ClientResponse<any>>;



export type KeysGet = <T = any>(
    selector: DataSelector,
) => Promise<ClientResponse<T | undefined>>;

export type KeysStore = <T = any>(
    data: T,
) => Promise<
    ClientResponse<{
        id: string,
    }>
>;

export type KeysUpdate = <T = any>(
    selector: DataSelector,
    data: T,
    field?: string,
) => Promise<ClientResponse<boolean>>;

export type KeysDelete =(
    selector: DataSelector,
) => Promise<ClientResponse<boolean>>;

export type KeysQuery = <T = any>(
    selector: DataSelector,
    count?: number,
    start?: string,
) => Promise<ClientResponse<T[] | undefined>>;



export type FunctionsGet = <T = any>(
    value: string | string[],
    /**
     * Type of `value`.
     *
     * Default `'id-or-name'`
     */
    type?: 'id' | 'name' | 'id-or-name',
) => Promise<ClientResponse<T | undefined>>;

export type FunctionsStore = (
    data: {
        name: string;
        text: string;
        language: string;
        database?: string;
        storage?: string;
        externals?: string;
        addins?: string;
    },
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
    selector: DataSelector,
    count?: number,
    start?: string,
) => Promise<ClientResponse<T[] | undefined>>;

export type FunctionsRun = <T = any>(
    id: string,
    args?: string | any,
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
    /**
     * Specific `router` to be used by the deserve client.
     */
    router?: string;

    /**
     * Specific `host` to be used by the deserve client.
     */
    host?: string;

    /**
     * Specific `origin` to be used by the deserve client.
     */
    origin?: string;
}




export type RecordOf<T> = Record<string, T | undefined>;

export interface DeserveClientsManagerOptions {
    /**
     * Interval time to run the client cleanup. (ms)
     *
     * Default: one hour
     */
    cleanupInterval: number;
    /**
     * Client expiration time. (ms)
     *
     * Default: one day.
     */
    expiration: number;
}

export interface DeserveClientsManagerMetadata {
    generatedAt: number;
}

export type DeserveClients = RecordOf<IDeserveClient>;
// #endregion exports
