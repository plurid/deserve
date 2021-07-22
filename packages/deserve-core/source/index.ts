// #region imports
    // #region libraries
    import express from 'express';

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
    } from './data/constants';

    import {
        registerTunnel,
    } from './logic';

    import clientStore from './services/clientStore';

    import corsOptions from './utilities/cors';
    // #endregion internal
// #endregion imports



// #region module
const server: express.Application = express();


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

            const path = request.url;
            if (path !== '/') {
                next();
                return;
            }

            const client = clientStore.get();
            if (!client) {
                const handleNotFound = (request as DeserveRequest).deserveCoreLogic.handleNotFound;
                if (handleNotFound) {
                    handleNotFound(
                        request as DeserveRequest,
                        response,
                    );
                    return;
                }

                const responseData = {
                    status: false,
                };
                response.json(responseData);
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
            const handleNotFound = (request as DeserveRequest).deserveCoreLogic.handleNotFound;
            if (handleNotFound) {
                handleNotFound(
                    request as DeserveRequest,
                    response,
                );
                return;
            }

            response.status(404).send('404');
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

    instance.on('request', (req, res) => {
        // HACK
        // to account for POST not receiving adequate response in the '*' catch-all.
        const client = clientStore.get();

        const method = req.method;

        if (client && method === 'POST') {
            client.handleRequest(req, res);
        }
    });

    instance.on('upgrade', (req, socket, head) => {
        const client = clientStore.get();

        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(req, socket);
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
