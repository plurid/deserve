// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getNotFoundFace = (state: AppState) => state.general.notFoundFace;
const getRegistration = (state: AppState) => state.general.registration;



const selectors = {
    getNotFoundFace,
    getRegistration,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
