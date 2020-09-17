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


export const SET_VIEW_OWNER_ID = 'SET_VIEW_OWNER_ID';
export interface SetViewOwnerIDAction {
    type: typeof SET_VIEW_OWNER_ID;
    payload: string;
}



export interface State {
    loading: boolean;
    indexView: string;
    indexGeneralSelector: string;
    indexGeneralView: string;
    compactSelectors: boolean;
    ownerID: string;
}


export type Actions =
    | SetViewLoadingAction
    | SetViewTypeAction
    | SetViewCompactSelectorsAction
    | SetViewOwnerIDAction;
// #endregion module
