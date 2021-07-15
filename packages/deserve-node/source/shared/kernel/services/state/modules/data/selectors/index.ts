// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getCores = (state: AppState) => state.data.cores;
const getBlobs = (state: AppState) => state.data.blobs;
const getKeys = (state: AppState) => state.data.keys;


const selectors = {
    getCores,
    getBlobs,
    getKeys,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
