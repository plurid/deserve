// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from 'apollo-server-express';

    import {
        ApolloServerPluginLandingPageDisabled,
        ApolloServerPluginLandingPageGraphQLPlayground,
    } from 'apollo-server-core';
    // #endregion libraries


    // #region external
    import {
        DatabaseCollections,
        Context,
    } from '~server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        logLevel,
        logLevels,
    } from '~server/data/constants';

    import {
        resolvers,
        schemas,
    } from '~server/api';

    import {
        getFunctioner,
    } from '~server/logic/functioner';

    import Obliterator from '~server/objects/Obliterator';

    import {
        tradeTokenForOwner,

        environment,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    collections: DatabaseCollections,
    instance: Application,
    obliterator: Obliterator,
) => {
    const playground = {
        // settings: {
        //     'request.credentials': 'include',
        // },
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        context: async (contextData: any) => {
            const {
                req: request,
                res: response,
            } = contextData;

            const owner = await tradeTokenForOwner(
                collections,
                request,
                response,
            );

            const functioner = getFunctioner(request);

            const context: Context = {
                request,
                response,

                instance,

                logLevel,
                logLevels,

                owner,
                functioner,

                collections,
            };

            return context;
        },
        plugins: [
            environment.production
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground({
                    ...playground,
                }),
        ],
    });
    await graphQLServer.start();

    graphQLServer.applyMiddleware({
        app: instance,
        path: GRAPHQL_ENDPOINT,
        // cors: false,
    });


    return true;
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
