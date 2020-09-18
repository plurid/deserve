// #region imports
    // #region external
    import {
        ClientOwner,
    } from '#server/data/interfaces/general';

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


export const setViewOwner = (
    owner: ClientOwner,
): Types.SetViewOwnerAction => {
    return {
        type: Types.SET_VIEW_OWNER,
        payload: owner,
    };
}



const actions = {
    setViewLoading,
    setViewType,
    setViewCompactSelectors,
    setViewOwner,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
