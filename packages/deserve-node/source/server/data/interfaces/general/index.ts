// #region imports
    // #region libraries
    import {
        Application,
        Request,
        Response,
    } from 'express';

    import mongodb from 'mongodb';
    // #endregion libraries


    // #region external
    import {
        LogLevels,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export interface Context {
    request: Request;
    response: Response;

    instance: Application;

    logLevel: number;
    logLevels: LogLevels;

    owner: ClientOwner | undefined;
    functioner: string | undefined;

    collections: DatabaseCollections;
}


export interface Owner {
    id: string;
    identonym: string;
    key: string;
}

export type ClientOwner = Omit<Owner, 'key'> & {
    cores: ClientCore[];
};


export interface Core {
    id: string;
    identonym: string;
    link: string;
    register: string;
    key: string;
    ownerID: string;
    tokens: string[];
    origins: string[];
}

export type ClientCore = Omit<Core, 'key' | 'ownerID'> & {
    active: boolean;
};


export interface DatabaseCollections {
    global: mongodb.Collection;
    owners: mongodb.Collection;
    cores: mongodb.Collection;
    keys: mongodb.Collection;
    functions: mongodb.Collection;
    executions: mongodb.Collection;
    functioners: mongodb.Collection;
    blobs: mongodb.Collection;
    tokens: mongodb.Collection;
}


export interface DeserveEntity {
    type: 'file' | 'field';
    id: string;
}




export interface Blob {
    id: string;
    ownerID: string;
    storedAt: number;
    blobSHA: string;
    mimetype: string;
    size: number;
    origin: string;
    metadata: string;
}


export interface Key {
    id: string;
    value: string;
    storedAt: number;
    sha: string;
    updatedAt?: number;
}


export interface StoredKey {
    id: string;
}


export interface StoredFunction {
    id: string;
    name: string;
    text: string;
    language: string;
    database: string | string[];
    storage: string | string[];
    externals: Record<string, string>[];
    addins: Record<string, any>[];
    sha: string;
    storedAt: number;
    ownedBy: string;
    coreID: string;
}



export interface Token {
    id: string;
    value: string;
    functionID: string;
    ownedBy: string;
    coreID: string;
    authorization: TokenAuthorization;
}

export interface TokenAuthorization {
    type: 'database' | 'storage' | 'event';
    constraints?: string | string[];
}
// #endregion module
