// #region imports
    // #region external
    import {
        Event,
    } from '~data/interface';
    // #endregion external


    // #region internal
    import emit from './emit';
    // #endregion internal
// #endregion imports



// #region module
const event: Event = {
    emit,
};
// #endregion module



// #region exports
export default event;
// #endregion exports
