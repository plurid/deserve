// #region imports
    // #region libraries
    import themes from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    general: themes.plurid,
    interaction: themes.plurid,
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
