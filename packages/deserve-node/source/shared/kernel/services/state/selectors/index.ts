// #region imports
    // #region external
    import modules from '~kernel-services/state/modules';
    // #endregion external
// #endregion imports



// #region module
const selectors = {
    data: modules.data.selectors,
    general: modules.general.selectors,
    themes: modules.themes.selectors,
    view: modules.view.selectors,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
