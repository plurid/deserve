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
    const data = request.body;

    response.setHeader(
        'Content-Type',
        'application/json',
    );

    try {
        const {
            identonym,
            key,
        } = data;

        // verify the identonym and the key from data.
        console.log('data', data);

        // get the core location and generate the token

        const responseData = {
            status: true,
            data: {
                // core: 'https://a-core.data.domain.tld',
                core: 'http://localhost:3355/register',
                token: '123',
            },
        };

        response.send(JSON.stringify(responseData));
    } catch (error) {
        const responseData = {
            status: false,
        };
        response.send(JSON.stringify(responseData));
    }
}

const main = () => {
    server.use(
        bodyParser.json(),
    );

    server.get('/', handlePaths);

    server.post('/register', handleRegister);

    server.listen(port, () => {
        console.log(`\n\tDeserve Router Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module
