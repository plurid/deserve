// #region imports
    // #region external
    import {
        data,
        general,
        themes,
        view,
    } from '../modules';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    general: general.actions,
    data: data.actions,
    themes: themes.actions,
    view: view.actions,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
