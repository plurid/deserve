// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getCores = (state: AppState) => state.data.cores;


const selectors = {
    getCores,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
