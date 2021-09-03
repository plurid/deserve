// #region imports
    // #region internal
    import get from './get';
    import store from './store';
    import update from './update';
    import keysDelete from './delete';
    import query from './query';
    // #endregion internal
// #endregion imports



// #region exports
export default {
    get,
    store,
    update,
    delete: keysDelete,
    query,
};
// #endregion exports
