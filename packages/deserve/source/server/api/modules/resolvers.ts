// #region imports
    // #region internal
    import General from './general/resolvers';

    import dateResolver from './date';
    // #endregion internal
// #endregion imports



// #region module
const resolvers = {
    ...General,
    ...dateResolver,
};
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
