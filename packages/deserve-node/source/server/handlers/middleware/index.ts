// #region imports
    // #region libraries
    import {
        Express,
    } from 'express';

    import bodyParser from 'body-parser';
    import cookieParser from 'cookie-parser';
    // #endregion libraries


    // #region external
    import {
        DeserveLogic,
        DeserveRequest,
    } from '#server/data/interfaces';

    import {
        HEALTH_CHECK_ENDPOINT,

        Headers,
        ContentTypes,
    } from '#server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const setupMiddleware = async (
    instance: Express,
    logic?: DeserveLogic,
) => {
    instance.use(
        cookieParser(),
        /** Attach logic */
        (request, _, next) => {
            if (logic) {
                (request as DeserveRequest).deserveLogic = {
                    ...logic,
                };
            }

            next();
        },
        bodyParser.json({
            limit: '100mb',
        }),
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
}
// #endregion module



// #region exports
export default setupMiddleware;
// #endregion exports
