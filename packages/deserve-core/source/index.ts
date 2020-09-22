// #region imports
    // #region libraries
    import express from 'express';

    import cors from 'cors';
    import bodyParser from 'body-parser';
    import cookieParser from 'cookie-parser';
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
    } from './logic/registration';

    import clientStore from './services/clientStore';

    import corsOptions from './utilities/cors';

    import mockLogic from './logic/mock';
    // #endregion internal
// #endregion imports



// #region module
const main = (
    deserveCoreLogic: DeserveCoreLogic,
) => {
    const server = express();

    server.options('*', cors(corsOptions));

    server.use(
        cors(corsOptions),
        bodyParser.json(),
        cookieParser(),

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
                const responseData = {
                    status: false,
                };
                response.setHeader(
                    'Content-Type',
                    'application/json',
                );
                response.send(JSON.stringify(responseData));
                return;
            }

            next();
        },
    );

    server.post(
        '/register',
        registerTunnel,
    );

    server.all('*', (req, res) => {
        const client = clientStore.get();

        if (!client) {
            res.status(404).send('404');
            return;
        }

        const method = req.method;
        if (method === 'POST') {
            return;
        }

        client.handleRequest(req, res);
    });

    const instance = server.listen(PORT, () => {
        console.log(`\n\tDeserve Core Server on /, port ${PORT}\n\thttp://localhost:${PORT}`);
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
}


if (require.main === module) {
    main(
        mockLogic,
    );
}
// #endregion module



// #region exports
export default main;
// #endregion exports
