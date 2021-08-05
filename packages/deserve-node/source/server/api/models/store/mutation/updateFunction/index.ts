// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputUpdateFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const updateFunction = async (
    input: InputUpdateFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;

        const {
            id: functionID,
            name: functionName,
            text: functionText,
            database: functionDatabase,
            storage: functionStorage,
            externals: functionExternals,
        } = input;

        const core = await getCoreFromRequest(request);

        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const functionData: any = await database.getById(
            collections.functions,
            functionID,
        );
        if (!functionData) {
            return {
                status: false,
            };
        }


        // merge data
        const mergedData: any = {
            name: functionName || functionData.name,
            text: functionText || functionData.text,
            database: functionDatabase || functionData.database,
            storage: functionStorage || functionData.storage,
            externals: functionExternals || functionData.externals,
        };

        const updated = await database.updateDocument(
            collections.functions,
            functionID,
            mergedData,
        );

        if (!updated) {
            return {
                status: false,
            };
        }


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'updateFunction error',
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
export default updateFunction;
// #endregion exports
