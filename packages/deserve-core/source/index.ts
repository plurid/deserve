// #region imports
    // #region libraries
    import express, {
        Request,
        Response,
    } from 'express';

    import cors from 'cors';
    import {
        json as jsonParser,
    } from 'body-parser';
    import cookieParser from 'cookie-parser';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region internal
    import {
        DeserveRequest,
        DeserveCoreLogic,
    } from './data/interfaces';

    import {
        PORT,
        FAVICON_PATH,
    } from './data/constants';

    import {
        registerTunnel,
    } from './logic';

    import clientStore from './services/clientStore';

    import corsOptions from './utilities/cors';

    import notFoundPage from './utilities/html/notFoundPage';
    // #endregion internal
// #endregion imports



// #region module
const server: express.Application = express();


const handleNotFound = (
    request: Request,
    response: Response,
) => {
    const handleNotFoundLogic = (request as DeserveRequest).deserveCoreLogic.handleNotFound;
    if (handleNotFoundLogic) {
        handleNotFoundLogic(
            request as DeserveRequest,
            response,
        );
        return;
    }

    if (request.path === '/favicon.ico') {
        response.sendFile(FAVICON_PATH);
        return;
    }

    response.status(404).send(notFoundPage);
    return;
}


const main = (
    deserveCoreLogic: DeserveCoreLogic,
) => {
    server.options('*', cors(corsOptions) as any);


    server.use(
        cors(corsOptions) as any,
        jsonParser() as any,
        cookieParser() as any,

        // Attach logic
        (
            request,
            _,
            next,
        ) => {
            (request as DeserveRequest).deserveCoreLogic = deserveCoreLogic;

            next();
        },

        // Handle request
        (
            request,
            response,
            next,
        ) => {
            if (response.headersSent) {
                return;
            }

            if (request.path !== '/') {
                next();
                return;
            }

            const client = clientStore.get();
            if (!client) {
                handleNotFound(
                    request,
                    response,
                );
                return;
            }

            next();
        },
    );


    server.post(
        '/register',
        registerTunnel,
    );

    server.all('*', (
        request,
        response,
    ) => {
        const client = clientStore.get();

        if (!client) {
            handleNotFound(
                request,
                response,
            );
            return;
        }

        if (request.method === 'POST') {
            return;
        }

        client.handleRequest(request, response);
    });


    const instance = server.listen(PORT, () => {
        delog({
            text: `deserve core server started · http://localhost:${PORT}`,
            level: 'info',
        });
    });

    instance.on('request', (
        request,
        response,
    ) => {
        // HACK
        // to account for POST not receiving adequate response in the '*' catch-all.
        const client = clientStore.get();
        const method = request.method;

        if (client && method === 'POST') {
            client.handleRequest(request, response);
        }
    });

    instance.on('upgrade', (
        request,
        socket,
    ) => {
        const client = clientStore.get();

        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(request, socket);
    });


    return server;
}
// #endregion module



// #region exports
export * from './data/interfaces';

export {
    server,
    clientStore,
};

export default main;
// #endregion exports
