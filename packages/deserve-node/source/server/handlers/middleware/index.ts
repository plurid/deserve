// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import {
        json as jsonParser,
    } from 'body-parser';
    import cookieParser from 'cookie-parser';
    import cors from 'cors';
    // #endregion libraries


    // #region external
    import {
        DatabaseCollections,
    } from '~server/data/interfaces';

    import {
        HEALTH_CHECK_ENDPOINT,

        Headers,
        ContentTypes,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const corsOptions = {
    credentials: true,
    origin: (_: any, callback: any) => {
        return callback(null, true);
    },
}


const setupMiddleware = async (
    collections: DatabaseCollections,
    instance: Express,
) => {
    instance.options('*', cors(corsOptions) as any);

    instance.use(
        cors(corsOptions) as any,
        cookieParser() as any,
        jsonParser({
            limit: '100mb',
        }) as any,
    );

    instance.post(
        HEALTH_CHECK_ENDPOINT,
        (request, response, next) => {
            response.setHeader(
                Headers.ContentType,
                ContentTypes.json,
            );

            response.end(
                JSON.stringify(
                    { status: true },
                ),
            );
        },
    );


    return true;
}
// #endregion module



// #region exports
export default setupMiddleware;
// #endregion exports
