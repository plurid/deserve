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
    } from '#data/interfaces';

    import {
        CORE_ID,
    } from '#data/constants';

    import Client from '#objects/Client';
    import TunnelAgent from '#objects/TunnelAgent';

    import clientStore from '#services/clientStore';
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

    const tokenVerified = await logic.verifyToken(
        CORE_ID,
        token,
    );

    if (!tokenVerified) {
        const responseData = {
            status: false,
        };
        response.setHeader(
            'Content-Type',
            'application/json',
        );
        response.send(JSON.stringify(responseData));

        return;
    }


    // establish connection
    const id = Math.random() + '';

    const agent = new TunnelAgent({
        clientId: id,
        maxSockets: 10,
    });

    try {
        const info: any = await agent.listen();

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
        response.setHeader(
            'Content-Type',
            'application/json',
        );
        response.send(JSON.stringify(responseData));
    } catch (error) {
        throw error;
    }
}
// #endregion module



// #region exports
export {
    registerTunnel,
};
// #endregion exports
