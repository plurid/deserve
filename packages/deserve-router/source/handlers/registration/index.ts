// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';

    import {
        delog,
    } from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DeserveRequest,
        RegistrationRequest,
        InputIdentonymKey,

        RegistrationResponse,
    } from '~data/interfaces';

    import {
        SEND_HOST,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
const handleRegister = async (
    request: Request,
    response: Response,
) => {
    const data: RegistrationRequest | undefined = request.body;
    const logic = (request as DeserveRequest).deserveLogic;

    const unsuccessfulResponse: RegistrationResponse = {
        status: false,
    };

    response.setHeader(
        'Content-Type',
        'application/json',
    );


    if (
        !data
        || typeof data.identonym !== 'string'
        || typeof data.key !== 'string'
    ) {
        delog({
            text: 'deserve router invalid registration data',
            level: 'warn',
        });

        response
            .status(400)
            .json(unsuccessfulResponse);
        return;
    }

    const {
        identonym,
        key,
    } = data;


    try {
        const input: InputIdentonymKey = {
            identonym,
            key,
        };


        const logicResponse = await logic.verifyIdentonymKey(
            input,
        );

        if (!logicResponse.status) {
            delog({
                text: 'deserve router could not verifyIdentonymKey',
                level: 'warn',
            });

            response
                .status(404)
                .json(unsuccessfulResponse);
            return;
        }

        if (
            !logicResponse.data?.core
            || !logicResponse.data?.token
        ) {
            delog({
                text: 'deserve router invalid data verifyIdentonymKey',
                level: 'warn',
            });

            response
                .status(400)
                .json(unsuccessfulResponse);
            return;
        }


        const {
            core,
            token,
        } = logicResponse.data;

        const responseData: RegistrationResponse = {
            status: true,
            data: {
                core,
                token,
                sendHost: SEND_HOST,
            },
        };

        delog({
            text: `deserve router registered successfully core '${core}'`,
            level: 'info',
        });

        response.json(responseData);
        return;
    } catch (error) {
        delog({
            text: `deserve router register error identonym '${identonym}'`,
            level: 'error',
            error,
        });

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
