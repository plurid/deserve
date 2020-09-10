// #region imports
    // #region libraries
    import express, {
        Request,
        Response,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
const server = express();
const port = process.env.PORT || 3644;

const tunnels: any = {};

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
    const id = Math.random() + '';

    tunnels[id] = {
    };

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
    server.get('*', handlePaths);

    server.post('/register', registerTunnel);

    server.listen(port, () => {
        console.log(`\n\tDeserve Router Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module