// #region imports
    // #region libraries
    import {
        URL,
    } from 'url';

    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputRegisterCore,
        Core,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import tunnelsManager from '~server/services/tunnelsManager';

    import {
        registerNodeToRouter,
        registerNodeToCore,
    } from '~server/logic/registration';
    // #endregion external
// #endregion imports



// #region module
const registerCore = async (
    input: InputRegisterCore,
    context: Context,
) => {
    try {
        const {
            owner,
            collections,
        } = context;

        if (!owner) {
            delog({
                text: 'registerCore no owner',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        const ownerID = owner.id;


        const {
            register,
            identonym,
            key,
        } = input;

        const id = uuid.generate();


        const routerResponse = await registerNodeToRouter(
            register,
            identonym,
            key,
        );

        if (!routerResponse.status) {
            delog({
                text: 'registerCore could not registerNodeToRouter',
                level: 'warn',
            });

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

        const parsedLink = new URL(core);
        const link = parsedLink.protocol + '//' + parsedLink.host;

        const {
            client,
        } = await registerNodeToCore(
            id,
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
            identonym,
            link,
            register,
            key,
            ownerID,
            tokens: [],
            origins: [],
        };

        await database.updateDocument(
            collections.cores,
            id,
            storedCore,
        );

        const data = {
            id,
            active: true,
            identonym,
            link,
            register,
        };


        delog({
            text: 'registerCore success',
            level: 'trace',
        });


        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'registerCore error',
            level: 'error',
            error,
        });

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default registerCore;
// #endregion exports
