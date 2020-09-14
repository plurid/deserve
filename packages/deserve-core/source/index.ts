// #region imports
    // #region libraries
    import express, {
        Request,
        Response,
    } from 'express';

    import bodyParser from 'body-parser';
    // #endregion libraries
// #endregion imports



// #region module
const server = express();
const port = process.env.PORT || 3655;


const handlePaths = (
    request: Request,
    response: Response,
) => {
    response.send('Deserve Core');
}

const registerTunnel = (
    request: Request,
    response: Response,
) => {
    const data = request.body;
    const {
        token,
    } = data;

    // verify token
    if (token !== '123') {
        const responseData = {
            status: false,
        };
        response.setHeader(
            'Content-Type',
            'application/json',
        );
        response.send(JSON.stringify(responseData));
    }


    // establish connection
    const id = Math.random() + '';

    const responseData = {
        status: true,
        data: {
            id,
        },
    };
    response.setHeader(
        'Content-Type',
        'application/json',
    );
    response.send(JSON.stringify(responseData));
}

const main = () => {
    server.use(
        bodyParser.json(),
    );

    server.post('/register', registerTunnel);

    server.on('request', () => {
        console.log('connect');
    });

    server.on('upgrade', () => {
        console.log('connect');
    });

    server.listen(port, () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module
