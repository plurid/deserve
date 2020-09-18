// #region imports
    // #region external
    import {
        ClientOwner,
    } from '#server/data/interfaces/general';
    // #endregion external
// #endregion imports



// #region module
export const SET_VIEW_LOADING = 'SET_VIEW_LOADING';
export interface SetViewLoadingAction {
    type: typeof SET_VIEW_LOADING;
    payload: boolean;
}


export const SET_VIEW_TYPE = 'SET_VIEW_TYPE';

export type ViewType =
    | 'indexView'
    | 'indexGeneralView'
    | 'indexGeneralSelector';

export interface SetViewTypePayload {
    type: ViewType;
    value: string;
}

export interface SetViewTypeAction {
    type: typeof SET_VIEW_TYPE;
    payload: SetViewTypePayload;
}


export const SET_VIEW_COMPACT_SELECTORS = 'SET_VIEW_COMPACT_SELECTORS';
export interface SetViewCompactSelectorsAction {
    type: typeof SET_VIEW_COMPACT_SELECTORS;
    payload: boolean;
}


export const SET_VIEW_OWNER = 'SET_VIEW_OWNER';
export interface SetViewOwnerAction {
    type: typeof SET_VIEW_OWNER;
    payload: ClientOwner;
}



export interface State {
    loading: boolean;
    indexView: string;
    indexGeneralSelector: string;
    indexGeneralView: string;
    compactSelectors: boolean;
    owner: ClientOwner;
}


export type Actions =
    | SetViewLoadingAction
    | SetViewTypeAction
    | SetViewCompactSelectorsAction
    | SetViewOwnerAction;
// #endregion module
