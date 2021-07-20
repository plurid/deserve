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
    // #endregion external
// #endregion imports



// #region module
const handlePaths = async (
    request: Request,
    response: Response,
) => {
    try {
        const logic = (request as DeserveRequest).deserveLogic;

        await logic.handleGetPath(
            request as DeserveRequest,
            response,
        );
    } catch (error) {
        delog({
            text: 'deserve router path error',
            level: 'error',
            error,
        });

        if (!response.headersSent) {
            response.end();
        }
    }
}
// #endregion module



// #region exports
export default handlePaths;
// #endregion exports
