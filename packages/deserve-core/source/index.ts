// #region imports
    // #region libraries
    import net from 'net';

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
        REGISTER_PATH,
        PORT,
    } from './data/constants';

    import {
        registerTunnel,
        handleNotFound,
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
        // FORCED as any
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
    );


    server.all('*', (
        request,
        response,
    ) => {
        const client = clientStore.get();

        if (request.method === 'POST') {
            if (!client) {
                if (request.path === REGISTER_PATH) {
                    delog({
                        text: `deserve core registering tunnel`,
                        level: 'trace',
                    });

                    registerTunnel(
                        request,
                        response,
                    );
                    return;
                }

                delog({
                    text: `deserve core could not handle POST ${request.url} no client`,
                    level: 'warn',
                });

                handleNotFound(
                    request,
                    response,
                );
                return;
            }

            // Handled on instance 'request'.
            return;
        }

        if (!client) {
            delog({
                text: `deserve core no client ${request.method} ${request.url}`,
                level: 'warn',
            });

            handleNotFound(
                request,
                response,
            );
            return;
        }


        delog({
            text: `deserve core handle request ${request.method} ${request.url}`,
            level: 'trace',
        });

        client.handleRequest(request, response);
    });


    const instance = server.listen(PORT, () => {
        delog({
            text: `deserve core server started · http://localhost:${PORT}`,
            level: 'info',
        });
    });


    // FORCED
    // to account for POST not receiving adequate response in the '*' catch-all.
    instance.on('request', (
        request: express.Request,
        response: express.Response,
    ) => {
        if (request.method === 'POST') {
            const client = clientStore.get();
            if (!client) {
                // Handled in '*' catch-all.
                return;
            }

            delog({
                text: `deserve core handle request POST ${request.url}`,
                level: 'trace',
            });

            client.handleRequest(request, response);
        }
    });

    instance.on('upgrade', (
        request: express.Request,
        socket: net.Socket,
    ) => {
        delog({
            text: `deserve core request upgraded`,
            level: 'trace',
        });

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
