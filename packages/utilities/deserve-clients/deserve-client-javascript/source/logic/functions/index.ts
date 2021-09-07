// #region imports
    // #region internal
    import get from './get';
    import store from './store';
    import update from './update';
    import functionsDelete from './delete';
    import query from './query';
    import run from './run';
    // #endregion internal
// #endregion imports



// #region exports
export default {
    get,
    store,
    update,
    delete: functionsDelete,
    query,
    run,
};
// #endregion exports
