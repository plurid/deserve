// #region imports
    // #region libraries
    import {
        parse,
    } from 'url';

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

    import database, {
        getDeserveCoresCollection,
    } from '~server/services/database';

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
        const deserveCoresCollection = await getDeserveCoresCollection();
        if (
            !deserveCoresCollection
        ) {
            return {
                status: false,
            };
        }


        const {
            owner,
        } = context;

        if (!owner) {
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

        const parsedLink = parse(core);
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
        };

        await database.updateDocument(
            deserveCoresCollection,
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


        return {
            status: true,
            data,
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
