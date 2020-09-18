// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    loading: true,
    indexView: '',
    indexGeneralView: 'cores',
    indexGeneralSelector: 'providers',
    compactSelectors: false,
    owner: {
        id: '',
        identonym: '',
    },
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
