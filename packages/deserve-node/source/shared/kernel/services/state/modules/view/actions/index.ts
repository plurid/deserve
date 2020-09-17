// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
export const setViewLoading = (
    payload: boolean,
): Types.SetViewLoadingAction => {
    return {
        type: Types.SET_VIEW_LOADING,
        payload,
    };
}


export const setViewType = (
    payload: Types.SetViewTypePayload,
): Types.SetViewTypeAction => {
    return {
        type: Types.SET_VIEW_TYPE,
        payload,
    };
}


export const setViewCompactSelectors = (
    payload: boolean,
): Types.SetViewCompactSelectorsAction => {
    return {
        type: Types.SET_VIEW_COMPACT_SELECTORS,
        payload,
    };
}


export const setViewOwnerID = (
    id: string,
): Types.SetViewOwnerIDAction => {
    return {
        type: Types.SET_VIEW_OWNER_ID,
        payload: id,
    };
}



const actions = {
    setViewLoading,
    setViewType,
    setViewCompactSelectors,
    setViewOwnerID,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
