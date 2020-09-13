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
const port = process.env.PORT || 3344;

const handlePaths = (
    request: Request,
    response: Response,
) => {
    response.send('Deserve Router');
}

const handleRegister = (
    request: Request,
    response: Response,
) => {
    const responseData = {
        status: true,
        data: {
            core: 'https://a-core.data.domain.tld',
        },
    };
    response.setHeader(
        'Content-Type',
        'application/json',
    );
    response.send(JSON.stringify(responseData));
}

const main = () => {
    server.get('/', handlePaths);

    server.post('/register', handleRegister);

    server.listen(port, () => {
        console.log(`\n\tDeserve Router Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module
