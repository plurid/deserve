// #region imports
    // #region libraries
    import merge from 'lodash.merge';
    // #endregion libraries


    // #region internal
    import core from './core/resolvers';
    import owner from './owner/resolvers';
    import store from './store/resolvers';
    import functioner from './functioner/resolvers';
    // #endregion internal
// #endregion imports



// #region module
const generateResolvers = (
    ...imports: any[]
) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    core,
    owner,
    store,
    functioner,
);
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
