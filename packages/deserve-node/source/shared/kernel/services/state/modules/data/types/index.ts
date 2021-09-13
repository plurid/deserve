// #region imports
    // #region libraries
    import {
        ClientCore,
    } from '~server/data/interfaces';
    // #endregion libraries
// #endregion imports



// #region module
export type AddableEntityType =
    | 'core';

export const ADD_ENTITY = 'ADD_ENTITY';
export interface AddEntityPayload {
    type: AddableEntityType;
    data: any;
}
export interface AddEntityAction {
    type: typeof ADD_ENTITY;
    payload: AddEntityPayload;
}


export type RemovableEntityType =
    | 'core';

export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export interface RemoveEntityPayload {
    type: RemovableEntityType;
    id: string;
}
export interface RemoveEntityAction {
    type: typeof REMOVE_ENTITY;
    payload: RemoveEntityPayload;
}


export const SET_CORES = 'SET_CORES';
export interface SetCoresAction {
    type: typeof SET_CORES;
    payload: ClientCore[];
}


export const ACTIVATE_CORE = 'ACTIVATE_CORE';
export interface ActivateCorePayload {
    id: string;
    value: boolean;
}
export interface ActivateCoreAction {
    type: typeof ACTIVATE_CORE;
    payload: ActivateCorePayload;
}


export const CLEAR_DATA = 'CLEAR_DATA';
export interface ClearDataAction {
    type: typeof CLEAR_DATA;
    payload: undefined;
}


export const PUSH_DATA = 'PUSH_DATA';
export interface PushDataPayload {
    type: 'blobs' | 'keys' | 'functions';
    coreID: string;
    data: any;
}
export interface PushDataAction {
    type: typeof PUSH_DATA;
    payload: PushDataPayload;
}


export const REMOVE_DATA = 'REMOVE_DATA';
export interface RemoveDataPayload {
    type: 'blobs' | 'keys' | 'functions';
    coreID: string;
    id: string;
}
export interface RemoveDataAction {
    type: typeof REMOVE_DATA;
    payload: RemoveDataPayload;
}



export interface State {
    cores: ClientCore[];
    blobs: Record<string, any[] | undefined>;
    keys: Record<string, any[] | undefined>;
    functions: Record<string, any[] | undefined>;
}


export type Actions =
    | AddEntityAction
    | RemoveEntityAction
    | SetCoresAction
    | ActivateCoreAction
    | ClearDataAction
    | PushDataAction
    | RemoveDataAction;
// #endregion module
