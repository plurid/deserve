// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from 'apollo-server-express';
    // #endregion libraries


    // #region external
    import {
        Context,
        DeserveLogic,
    } from '#server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        logLevel,
        logLevels,
    } from '#server/data/constants';

    import {
        resolvers,
        schemas,
    } from '#server/api';

    import {
        tradeTokenForOwner,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    instance: Application,
    logic?: DeserveLogic,
) => {
    const playground = {
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    // const customLogicUsage = CUSTOM_LOGIC_USAGE;
    // const privateUsage = PRIVATE_USAGE;

    // const logger = customLogicUsage && logic
    //     ? logic.logger
    //     : defaultLogger;

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        playground,
        context: async ({
            req,
            res,
        }: any) => {
            const owner = await tradeTokenForOwner(req);

            const context: Context = {
                request: req,
                response: res,

                instance,

                logLevel,
                logLevels,

                owner,
            };

            return context;
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: GRAPHQL_ENDPOINT,
    });
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
