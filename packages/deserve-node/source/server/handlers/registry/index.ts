// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        DeserveLogic,
    } from '#server/data/interfaces';

    import {
        registerNodeToRouter,
        registerNodeToCore,
    } from '../../logic/registration';
    // #endregion external
// #endregion imports



// #region module
const setupRegistry = async (
    instance: Application,
    logic?: DeserveLogic,
) => {
    instance.get('/registry', async (request, response) => {
        const routerResponse = await registerNodeToRouter(
            'http://localhost:3344/register',
            'identonym',
            'key',
        );
        console.log(routerResponse);

        if (!routerResponse.status) {
            response.send('router registration failed');
            return;
        }

        const {
            data: {
                core,
                token,
            },
        } = routerResponse;

        await registerNodeToCore(
            core,
            token,
        );

        response.send('registration succeeded');
    });
}
// #endregion module



// #region exports
export default setupRegistry;
// #endregion exports
