// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        DeserveRequest,
    } from '../../../data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const handlePaths = async (
    request: Request,
    response: Response,
) => {
    const logic = (request as DeserveRequest).deserveLogic;

    await logic.handleGetPath(
        request as DeserveRequest,
        response,
    );
}
// #endregion module



// #region exports
export default handlePaths;
// #endregion exports
