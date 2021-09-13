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
const getFunctions = (state: AppState) => state.data.functions;


const selectors = {
    getCores,
    getBlobs,
    getKeys,
    getFunctions,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
