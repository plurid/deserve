// #region imports
    // #region libraries
    import merge from 'lodash.merge';
    // #endregion libraries


    // #region internal
    import builds from './builds/resolvers';
    import deployers from './deployers/resolvers';
    import deploys from './deploys/resolvers';
    import imagenes from './imagenes/resolvers';
    import owner from './owner/resolvers';
    import projects from './projects/resolvers';
    import providers from './providers/resolvers';
    import repositories from './repositories/resolvers';
    import secrets from './secrets/resolvers';
    import setup from './setup/resolvers';
    import triggers from './triggers/resolvers';
    import webhooks from './webhooks/resolvers';
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
    builds,
    deployers,
    deploys,
    imagenes,
    owner,
    projects,
    providers,
    repositories,
    secrets,
    setup,
    triggers,
    webhooks,
);
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
