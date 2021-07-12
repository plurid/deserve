// #region imports
    // #region external
    import {
        Context,
        InputValueString,
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
const activateCore = async (
    input: InputValueString,
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


        const {
            value: id,
        } = input;

        const databaseCore: any = await database.getById(
            deserveCoresCollection,
            id,
        );

        if (!databaseCore) {
            return {
                status: false,
            };
        }

        if (databaseCore.ownerID !== owner.id) {
            return {
                status: false,
            };
        }

        const {
            register,
            identonym,
            key,
        } = databaseCore;

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
export default activateCore;
// #endregion exports
