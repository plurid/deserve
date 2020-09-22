// #region imports
    // #region libraries
    import express, {
        Request,
        Response,
    } from 'express';

    import cors from 'cors';
    import bodyParser from 'body-parser';
    import cookieParser from 'cookie-parser';
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


const registerTunnel = async (
    request: Request,
    response: Response,
) => {
    if (response.headersSent) {
        return;
    }

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


const main = () => {
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
        if (response.headersSent) {
            return;
        }

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

    const instance = server.listen(port, () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });

    instance.on('request', (req, res) => {
        // HACK
        // to account for POST not receiving adequate response in the '*' catch-all.

        const method = req.method;

        if (client && method === 'POST') {
            client.handleRequest(req, res);
        }
    });

    instance.on('upgrade', (req, socket, head) => {
        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(req, socket);
    });
}


main();
// #endregion module
