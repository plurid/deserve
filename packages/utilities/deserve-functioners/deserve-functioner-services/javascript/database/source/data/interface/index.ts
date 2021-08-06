// #region module
export type DatabaseGet = (
    id?: string,
) => Promise<any>;

export type DatabaseQuery = (
    filter: any,
    pagination?: any,
) => Promise<any>;

export type DatabaseSet = (
    id: string,
    data: any,
) => Promise<boolean>;

export type DatabaseRemove = (
    id: string | string[],
) => Promise<boolean>;


export interface Database {
    getFunctionData: () => Promise<any>;
    getFunctionArguments: () => Promise<any>;

    get: DatabaseGet;
    query: DatabaseQuery;
    set: DatabaseSet;
    remove: DatabaseRemove;
}
// #endregion module
