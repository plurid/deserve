// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DeserveRequest,
    } from '~data/interfaces';

    import {
        FAVICON_PATH,
    } from '~data/constants';

    import notFoundPage from '~utilities/html/notFoundPage';
    // #endregion external
// #endregion imports



// #region module
const handlePaths = async (
    request: Request,
    response: Response,
) => {
    const {
        method,
        path,
        originalUrl,
    } = request;

    delog({
        text: `deserve router path request ${method} ${originalUrl}`,
        level: 'info',
    });


    try {
        if (
            path === '/favicon.ico'
            && FAVICON_PATH
        ) {
            response.sendFile(FAVICON_PATH);
            return;
        }

        const logic = (request as DeserveRequest).deserveLogic;
        if (!logic.handleGetPath) {
            response.send(notFoundPage);
            return;
        }

        await logic.handleGetPath(
            request as DeserveRequest,
            response,
        );
    } catch (error) {
        delog({
            text: `deserve router path error ${method} ${originalUrl}`,
            level: 'error',
            error,
        });
    }


    if (!response.headersSent) {
        response.end();
    }
}
// #endregion module



// #region exports
export default handlePaths;
// #endregion exports
