// #region imports
    // #region internal
    import get from './get';
    import partial from './partial';
    import store from './store';
    import blobsDelete from './delete';
    import query from './query';
    // #endregion internal
// #endregion imports



// #region exports
export default {
    get,
    partial,
    store,
    delete: blobsDelete,
    query,
};
// #endregion exports
