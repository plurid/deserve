// #region imports
    // #region libraries
    import {
        combineReducers,
    } from '@reduxjs/toolkit';
    // #endregion libraries


    // #region external
    import modules from '~kernel-services/state/modules';
    // #endregion external
// #endregion imports



// #region module
const reducer = combineReducers({
    data: modules.data.reducer,
    general: modules.general.reducer,
    themes: modules.themes.reducer,
    view: modules.view.reducer,
});
// #endregion module



// #region exports
export type AppState = ReturnType<typeof reducer>;

export default reducer;
// #endregion exports
