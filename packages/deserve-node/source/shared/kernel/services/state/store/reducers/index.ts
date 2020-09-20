// #region imports
    // #region libraries
    import {
        combineReducers,
    } from 'redux';
    // #endregion libraries


    // #region external
    import {
        data,
        themes,
        view,
    } from '../../modules';
    // #endregion external
// #endregion imports



// #region module
const reducers = combineReducers({
    data: data.reducer,
    themes: themes.reducer,
    view: view.reducer,
});
// #endregion module



// #region exports
export default reducers;
// #endregion exports
