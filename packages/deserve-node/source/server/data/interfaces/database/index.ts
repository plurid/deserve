// #region module
export type DatabaseType =
    | DatabaseTypeFilesystem;

export type DatabaseTypeFilesystem = 'filesystem';

export interface DatabaseTypeData {
    filesystem: DatabaseTypeFilesystem;
}


export interface Database {
    get: DatabaseGet;
    getAll: DatabaseGetAll;
    query: DatabaseQuery;
    store: DatabaseStore;
    update: DatabaseUpdate;
    obliterate: DatabaseObliterate;
    obliterateAll: DatabaseObliterateAll;
}

export type DatabaseGet = (
    entity: string,
    id: string,
) => Promise<any>;


export type DatabaseGetAll = (
    entity: string,
) => Promise<any[]>;


export type DatabaseQuery = (
    entity: string,
    field: string,
    value: string,
) => Promise<any>;


export type DatabaseStore = (
    entity: string,
    id: string,
    data: any,
) => Promise<any>;


export type DatabaseUpdate = (
    entity: string,
    id: string,
    field: string,
    value: any,
) => Promise<any>;


export type DatabaseObliterate = (
    entity: string,
    id: string,
) => Promise<any>;


export type DatabaseObliterateAll = (
    entity: string,
) => Promise<any>;
// #endregion module
