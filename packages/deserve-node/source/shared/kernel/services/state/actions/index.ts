// #region imports
    // #region external
    import modules from '~kernel-services/state/modules';
    // #endregion external
// #endregion imports



// #region module
const actions = {
    general: modules.general.actions,
    data: modules.data.actions,
    themes: modules.themes.actions,
    view: modules.view.actions,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
