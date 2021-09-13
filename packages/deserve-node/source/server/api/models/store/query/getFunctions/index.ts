// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputGetFunctions,
        StoredFunction,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

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

        const clientFunctions: any[] = [];

        for (const functionData of functionsData) {
            const {
                id,
                name,
                text,
                coreID,
                database,
                storage,
                externals,
                addins,
                storedAt,
            } = functionData;

            const clientFunction = {
                id,
                name,
                text,
                coreID,
                database: typeof database === 'string' ? database : JSON.stringify(database),
                storage: typeof storage === 'string' ? storage : JSON.stringify(storage),
                externals: JSON.stringify(externals),
                addins: JSON.stringify(addins),
                storedAt,
            };
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
