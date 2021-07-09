// #region imports
    // #region libraries
    import {
        combineReducers,
    } from 'redux';
    // #endregion libraries


    // #region external
    import {
        data,
        general,
        themes,
        view,
    } from '../../modules';
    // #endregion external
// #endregion imports



// #region module
const reducers = combineReducers({
    data: data.reducer,
    general: general.reducer,
    themes: themes.reducer,
    view: view.reducer,
});
// #endregion module



// #region exports
export default reducers;
// #endregion exports
