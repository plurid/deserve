// #region imports
    // #region libraries
    import PluridServer, {
        PluridServerMiddleware,
        PluridServerService,
        PluridServerPartialOptions,
        PluridServerTemplateConfiguration,
    } from '@plurid/plurid-react-server';

    import helmet from '~kernel-services/helmet';

    import reduxStore from '~kernel-services/state/store';
    import reduxContext from '~kernel-services/state/context';

    import apolloClient from '~kernel-services/graphql/client';
    // #endregion libraries


    // #region external
    import {
        routes,
        shell,
    } from '../shared';
    // #endregion external


    // #region internal
    import {
        PORT,
    } from './data/constants';

    import preserves from './preserves';

    import setupHandlers from './handlers';

    import * as Models from './api/models';
    // #endregion internal
// #endregion imports



// #region module
// #region constants
/** ENVIRONMENT */
const watchMode = process.env.PLURID_WATCH_MODE === 'true';
const isProduction = process.env.ENV_MODE === 'production';
const buildDirectory = process.env.PLURID_BUILD_DIRECTORY || 'build';

const applicationRoot = 'deserve-application';
const openAtStart = watchMode
    ? false
    : isProduction
        ? false
        : true;
const debug = isProduction
    ? 'info'
    : 'error';


/** Custom styles to be loaded into the template. */
const styles: string[] = [
    //
];


/** Express-like middleware. */
const middleware: PluridServerMiddleware[] = [
    //
];


/** Services to be used in the application. */
const services: PluridServerService[] = [
    {
        name: 'Apollo',
        package: '@apollo/client',
        provider: 'ApolloProvider',
        properties: {
            client: apolloClient,
        },
    },
    {
        name: 'Redux',
        package: 'react-redux',
        provider: 'Provider',
        properties: {
            store: reduxStore({}),
            context: reduxContext,
        },
    },
];


const options: PluridServerPartialOptions = {
    serverName: 'Deserve Server',
    buildDirectory,
    open: openAtStart,
    debug,
    ignore: [
        '/deserve',
        '/registry',
        '/download/*',
    ],
};

const template: PluridServerTemplateConfiguration = {
    root: applicationRoot,
};
// #endregion constants


// #region server
const deserveServer = new PluridServer({
    helmet,
    routes,
    preserves,
    shell,
    styles,
    middleware,
    services,
    options,
    template,
});


const deserveSetup = async (
    callback?: () => Promise<void>,
) => {
    const successfulSetup = await setupHandlers(
        deserveServer,
    );

    if (successfulSetup && callback) {
        await callback();
    }

    return successfulSetup;
}
// #endregion server
// #endregion module



// #region run
/**
 * If the file is called directly, as in `node build/index.js`,
 * it will run the server.
 *
 * The check is in place so that the server can also be imported
 * for programmatic usage.
 */
if (require.main === module) {
    deserveSetup(
        async () => {
            deserveServer.start(PORT);
        },
    );
}
// #endregion run



// #region exports
export * from './data/interfaces';

export {
    deserveSetup,
    Models,
};

export default deserveServer;
// #endregion exports
