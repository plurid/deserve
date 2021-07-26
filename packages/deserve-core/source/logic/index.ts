// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';

    import {
        uuid,
    } from '@plurid/plurid-functions';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DeserveRequest,
    } from '~data/interfaces';

    import {
        CORE_ID,

        FAVICON_PATH,
    } from '~data/constants';

    import Client from '~objects/Client';
    import TunnelAgent from '~objects/TunnelAgent';

    import clientStore from '~services/clientStore';

    import notFoundPage from '~utilities/html/notFoundPage';
    // #endregion external
// #endregion imports



// #region module
const registerTunnel = async (
    request: Request,
    response: Response,
) => {
    if (response.headersSent) {
        return;
    }

    const logic = (request as DeserveRequest).deserveCoreLogic;

    const data = request.body;
    const {
        token,
    } = data;

    if (!CORE_ID) {
        delog({
            text: 'deserve core no DESERVE_CORE_ID defined',
            level: 'warn',
        });
    }

    const tokenVerified = await logic.verifyToken(
        CORE_ID,
        token,
    );

    if (!tokenVerified) {
        delog({
            text: 'deserve core token not verified',
            level: 'warn',
        });

        const responseData = {
            status: false,
        };
        response
            .status(404)
            .json(responseData);

        return;
    }


    // establish connection
    const id = uuid.generate();

    const agent = new TunnelAgent({
        clientId: id,
        maxSockets: 10,
    });

    try {
        const info = await agent.listen();

        const newClient = new Client({
            id,
            agent,
        });

        clientStore.add(newClient);

        newClient.on('offline', () => {
            clientStore.clear();
        });

        const responseData = {
            id: id,
            port: info.port,
            max_conn_count: 10,
        };

        response.json(responseData);
    } catch (error) {
        delog({
            text: 'deserve core registerTunnel error',
            level: 'error',
            error,
        });

        response.end();
    }
}



const handleNotFound = (
    request: Request,
    response: Response,
) => {
    const handleNotFoundLogic = (request as DeserveRequest).deserveCoreLogic.handleNotFound;
    if (handleNotFoundLogic) {
        handleNotFoundLogic(
            request as DeserveRequest,
            response,
        );
        return;
    }

    if (request.path === '/favicon.ico') {
        response.sendFile(FAVICON_PATH);
        return;
    }

    response.status(404).send(notFoundPage);
    return;
}
// #endregion module



// #region exports
export {
    registerTunnel,
    handleNotFound,
};
// #endregion exports
