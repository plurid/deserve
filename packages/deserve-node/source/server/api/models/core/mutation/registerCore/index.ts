// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputRegisterCore,
        Core,
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import tunnelsManager from '#server/services/tunnelsManager';

    import {
        registerNodeToRouter,
        registerNodeToCore,
    } from '#server/logic/registration';
    // #endregion external
// #endregion imports



// #region module
const registerCore = async (
    input: InputRegisterCore,
    context: Context,
) => {
    try {
        const {
            domain,
            identonym,
            key,
        } = input;

        const id = uuid.generate();


        const routerResponse = await registerNodeToRouter(
            domain,
            identonym,
            key,
        );

        if (!routerResponse.status) {
            return {
                status: false,
            };
        }

        const {
            data: {
                core,
                token,
            },
        } = routerResponse;

        const client = await registerNodeToCore(
            core,
            token,
        );

        client.open(() => {});

        tunnelsManager.add(
            id,
            client,
        );


        const storedCore: Core = {
            id,
            domain,
            identonym,
            key,
        };

        await database.store(
            'core',
            id,
            storedCore,
        );

        return {
            status: true,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default registerCore;
// #endregion exports
