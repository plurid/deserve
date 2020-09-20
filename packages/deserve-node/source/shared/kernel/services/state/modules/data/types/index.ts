// #region imports
    // #region libraries
    import {
        ClientCore,
    } from '#server/data/interfaces';
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


export const CLEAR_DATA = 'CLEAR_DATA';
export interface ClearDataAction {
    type: typeof CLEAR_DATA;
    payload: undefined;
}



export interface State {
    cores: ClientCore[];
}


export type Actions =
    | AddEntityAction
    | RemoveEntityAction
    | SetCoresAction
    | ClearDataAction;
// #endregion module
