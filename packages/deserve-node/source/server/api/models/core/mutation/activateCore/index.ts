// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputValueString,
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
const activateCore = async (
    input: InputValueString,
    context: Context,
) => {
    try {
        const {
            owner,
            collections,
        } = context;

        if (!owner) {
            delog({
                text: 'activateCore no owner',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            value: id,
        } = input;

        const databaseCore: any = await database.getById(
            collections.cores,
            id,
        );

        if (!databaseCore) {
            delog({
                text: 'activateCore no databaseCore',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        if (databaseCore.ownerID !== owner.id) {
            delog({
                text: 'activateCore core not owned by owner',
                level: 'warn',
            });

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
            delog({
                text: 'activateCore could not registerNodeToRouter',
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


        delog({
            text: 'activateCore success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'activateCore error',
            level: 'error',
            error,
        });
        console.log(error);

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default activateCore;
// #endregion exports
