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
const port = process.env.PORT || 3655;

const handlePaths = (
    request: Request,
    response: Response,
) => {
    response.send('Deserve Core');
}

const main = () => {
    server.get('*', handlePaths);

    server.listen(port, () => {
        console.log(`\n\tDeserve Core Server on /, port ${port}\n\thttp://localhost:${port}`);
    });
}

main();
// #endregion module
