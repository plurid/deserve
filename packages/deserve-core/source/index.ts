// #region imports
    // #region libraries
    import http from 'http';

    import express, {
        Request,
        Response,
    } from 'express';

    import cors from 'cors';
    import bodyParser from 'body-parser';
    import cookieParser from 'cookie-parser';


    import Koa from 'koa';
    import Router from 'koa-router';
    // #endregion libraries

    // #region internal
    import Client from './objects/Client';
    import TunnelAgent from './objects/TunnelAgent';
    // #endregion internal
// #endregion imports



// #region module
const server = express();
const port = parseInt(process.env.PORT || '') || 3355;


let client: any;


const handlePaths = (
    request: Request,
    response: Response,
) => {
    response.send('Deserve Core');
}


const registerTunnel = async (
    request: Request,
    response: Response,
) => {
    const data = request.body;
    const {
        token,
    } = data;

    // verify token
    // if (token !== '123') {
    //     const responseData = {
    //         status: false,
    //     };
    //     response.setHeader(
    //         'Content-Type',
    //         'application/json',
    //     );
    //     response.send(JSON.stringify(responseData));

    //     return;
    // }


    // establish connection
    const id = Math.random() + '';

    const agent = new TunnelAgent({
        clientId: id,
        maxSockets: 10,
    });

    try {
        const info: any = await agent.listen();
        // console.log('info', info);

        client = new Client({
            id,
            agent,
        });

        client.on('offline', () => {
            client = null;
        });

        const responseData = {
            id: id,
            port: info.port,
            max_conn_count: 10,
        };
        response.setHeader(
            'Content-Type',
            'application/json',
        );
        response.send(JSON.stringify(responseData));
    } catch (error) {
        throw error;
    }
}

const corsOptions = {
    credentials: true,
    origin: (_: any, callback: any) => {
        return callback(null, true);
    },
}


const mainKoa = () => {
    const app = new Koa();
    const router = new Router();


    router.post(
        '/register',
        async (ctx, next) => {
            if (client) {
                await next();
                return;
            }

            const path = ctx.request.path;
            console.log('post register ctx', path);

            const id = Math.random() + '';

            const agent = new TunnelAgent({
                clientId: id,
                maxSockets: 10,
            });

            try {
                const info: any = await agent.listen();

                client = new Client({
                    id,
                    agent,
                });

                client.on('offline', () => {
                    client = null;
                });

                const responseData = {
                    id: id,
                    port: info.port,
                    max_conn_count: 10,
                };
                ctx.body = responseData;
            } catch (error) {
                const responseData = {};
                ctx.body = responseData;
            }
        },
    );

    app.use(router.routes());
    app.use(router.allowedMethods());


    const server = http.createServer();

    const appCallback = app.callback();

    server.on('request', (req, res) => {
        console.log('client', client);

        const path = req.url;
        console.log('server request', path);

        if (!client) {
            appCallback(req, res);
            return;
        }

        client.handleRequest(req, res);
    });

    server.on('upgrade', (req, socket, head) => {
        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(req, socket);
    });

    server.listen(3355, 'localhost', () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}


const mainExpress = () => {
    server.options('*', cors(corsOptions));

    server.use(
        cors(corsOptions),
        bodyParser.json(),
        cookieParser(),
    );

    server.use((
        request,
        response,
        next,
    ) => {
        const path = request.url;

        if (path !== '/') {
            next();
            return;
        }

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
    });

    server.post(
        '/register',
        registerTunnel,
    );

    server.all('*', (req, res) => {
        console.log('*', req.method);

        if (!client) {
            res.status(404).send('404');
            return;
        }

        client.handleRequest(req, res);
    });

    const instance = server.listen(port, () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });

    instance.on('upgrade', (req, socket, head) => {
        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(req, socket);
    });
}


mainKoa();
// mainExpress();
// #endregion module
