// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputGetFunctions,
        StoredFunction,
        ClientFunction,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        modelClientFunction,
    } from '~server/logic/client/function';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getFunctions = async (
    input: InputGetFunctions,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;


        const core = await getCoreFromRequest(
            collections,
            request,
            owner,
            input.coreID,
        );
        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const functionsData = await database.getAllWhere<StoredFunction>(
            collections.functions,
            {
                ownedBy: ownerID,
            },
        );

        const clientFunctions: ClientFunction[] = [];

        for (const functionData of functionsData) {
            const clientFunction = modelClientFunction(functionData);
            clientFunctions.push(clientFunction);
        }


        return {
            status: true,
            data: [
                ...clientFunctions,
            ],
        };
    } catch (error) {
        delog({
            text: 'getFunctions error',
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
export default getFunctions;
// #endregion exports
