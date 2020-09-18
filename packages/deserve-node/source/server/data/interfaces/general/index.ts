// #region imports
    // #region libraries
    import {
        Application,
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        LogLevels,
    } from '#server/data/interfaces';
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
}


export interface Owner {
    id: string;
    identonym: string;
    key: string;
}

export type ClientOwner = Omit<Owner, 'key'>;


export interface Core {
    id: string;
    domain: string;
    identonym: string;
    key: string;
}

export type ClientCore = Omit<Core, 'key'>;



export interface DeserveEntity {
    type: 'file' | 'field';
    id: string;
}
// #endregion module
