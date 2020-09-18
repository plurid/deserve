// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getLoading = (state: AppState) => state.view.loading;
const getIndexView = (state: AppState) => state.view.indexView;
const getIndexGeneralView = (state: AppState) => state.view.indexGeneralView;
const getIndexGeneralSelector = (state: AppState) => state.view.indexGeneralSelector;
const getViewCompactSelectors = (state: AppState) => state.view.compactSelectors;
const getViewOwner = (state: AppState) => state.view.owner;



const selectors = {
    getLoading,
    getIndexView,
    getIndexGeneralView,
    getIndexGeneralSelector,
    getViewCompactSelectors,
    getViewOwner,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
