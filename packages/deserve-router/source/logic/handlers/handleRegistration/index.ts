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
        InputIdentonymKey,
    } from '../../../data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const handleRegister = async (
    request: Request,
    response: Response,
) => {
    const data = request.body;
    const logic = (request as DeserveRequest).deserveLogic;

    const unsuccessfulResponse = {
        status: false,
    };

    response.setHeader(
        'Content-Type',
        'application/json',
    );

    try {
        const {
            identonym,
            key,
        } = data;

        const input: InputIdentonymKey = {
            identonym,
            key,
        };

        const logicResponse = await logic.verifyIdentonymKey(
            input,
        );

        if (!logicResponse.status) {
            response
                .status(404)
                .json(unsuccessfulResponse);

            return;
        }

        const responseData = {
            status: true,
            data: {
                ...logicResponse.data,
            },
        };

        response.json(responseData);

        return;
    } catch (error) {
        response
            .status(500)
            .json(unsuccessfulResponse);

        return;
    }
}
// #endregion module



// #region exports
export default handleRegister;
// #endregion exports
