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

const tunnels: any = {};

const handlePaths = (
    request: Request,
    response: Response,
) => {
    response.send('Deserve Router');
}

const main = () => {
    server.get('*', handlePaths);

    server.listen(port, () => {
        console.log(`\n\tDeserve Router Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module
