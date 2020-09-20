// #region imports
    // #region libraries
    import http from 'http';

    import express, {
        Request,
        Response,
    } from 'express';

    import bodyParser from 'body-parser';
    // #endregion libraries

    // #region internal
    import Client from './objects/Client';
    import TunnelAgent from './objects/TunnelAgent';
    // #endregion internal
// #endregion imports



// #region module
const server = express();
const port = process.env.PORT || 3655;

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
    // id = 'onetwothree';

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

const main = () => {
    server.use(
        bodyParser.json(),
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

        // if (!client) {
        //     const responseData = {
        //         id: '',
        //         port: '3355',
        //         max_conn_count: 1,
        //         url: 'http://localhost:3355',
        //     };
        //     response.setHeader(
        //         'Content-Type',
        //         'application/json',
        //     );
        //     response.send(JSON.stringify(responseData));
        //     return;
        // }

        next();
    });

    server.post('/register', registerTunnel);

    server.all('*', (req, res) => {
        // const hostname = req.headers.host;
        // console.log('request hostname', hostname, !!client, req.url, req.method);

        if (!client) {
            res.status(404).send('404');
            return;
        }

        // console.log('CLINT', client);
        client.handleRequest(req, res);
    });

    const instance = server.listen(port, () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });

    instance.on('upgrade', (req, socket, head) => {
        // console.log('upgrade');

        if (!client) {
            socket.destroy();
            return;
        }

        client.handleUpgrade(req, socket);
    });
}

main();
// #endregion module
