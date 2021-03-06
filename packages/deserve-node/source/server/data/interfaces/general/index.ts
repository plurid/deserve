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
    blobs: mongodb.Collection;
}


export interface DeserveEntity {
    type: 'file' | 'field';
    id: string;
}
// #endregion module
