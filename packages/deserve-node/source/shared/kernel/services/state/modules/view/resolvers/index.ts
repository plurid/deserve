// #region imports
    // #region internal
    import * as Types from '../types';
    // #endregion internal
// #endregion imports



// #region module
export const setViewLoading = (
    state: Types.State,
    action: Types.SetViewLoadingAction,
): Types.State => {
    return {
        ...state,
        loading: action.payload,
    };
}


export const setViewType = (
    state: Types.State,
    action: Types.SetViewTypeAction,
): Types.State => {
    const {
        type,
        value,
    } = action.payload;

    switch (type) {
        case 'indexView':
            return {
                ...state,
                indexView: value,
            };
        case 'indexGeneralView':
            return {
                ...state,
                indexGeneralView: value,
            };
        case 'indexGeneralSelector':
            return {
                ...state,
                indexGeneralSelector: value,
            };
        default:
            return {
                ...state,
            };
    }
}


export const setViewCompactSelectors = (
    state: Types.State,
    action: Types.SetViewCompactSelectorsAction,
): Types.State => {
    return {
        ...state,
        compactSelectors: action.payload,
    };
}


export const setViewOwner = (
    state: Types.State,
    action: Types.SetViewOwnerAction,
): Types.State => {
    return {
        ...state,
        owner: {
            ...action.payload,
        },
    };
}



const resolvers = {
    setViewLoading,
    setViewType,
    setViewCompactSelectors,
    setViewOwner,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
