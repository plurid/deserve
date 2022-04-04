// #region imports
    // #region external
    import {
        getRandomFace,
    } from '~kernel-planes/NotFound/logic'

    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    notFoundFace: getRandomFace(),
    // TODO: set registration with environment variable
    registration: true,
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
