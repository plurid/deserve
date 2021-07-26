// #region imports
    // #region libraries
    import express from 'express';

    import cors from 'cors';
    import {
        json as jsonParser,
    } from 'body-parser';
    import cookieParser from 'cookie-parser';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region internal
    import {
        PORT,
    } from './data/constants';

    import CoresList from './objects/CoresList';

    import corsOptions from './utilities/cors';
    // #endregion internal
// #endregion imports



// #region module
const server: express.Application = express();

const coresList = new CoresList();


const main = async () => {
    server.options('*', cors(corsOptions) as any);

    server.all('*', async (
        request,
        response,
    ) => {
        try {
            const coreRequest = await coresList.get(request);
            if (!coreRequest) {
                response
                    .status(404)
                    .end();
                return;
            }

            coreRequest.pipe(response);
        } catch (error) {
            response
                .status(500)
                .end();
        }
    });

    server.listen(PORT, () => {
        delog({
            text: `deserve kubernetes server started · http://localhost:${PORT}`,
            level: 'info',
        });
    });
}

main();
// #endregion module
