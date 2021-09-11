// #region imports
    // #region libraries
    import delog from '@plurid/delog';

    import {
        uuid,
        sha,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputStoreFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        prepareFunctioner,
    } from '~server/logic/functioner';
    // #endregion external
// #endregion imports



// #region module
const storeFunction = async (
    input: InputStoreFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;

        const {
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


        const functionID = ownerID + '/' + uuid.generate() + uuid.generate() + uuid.generate();
        const storedAt = Date.now();
        const functionSHA = await sha.compute(ownerID + storedAt + functionText);

        const databaseFunctionData = {
            name: functionName,
            text: functionText,
            database: functionDatabase,
            storage: functionStorage,
            externals: functionExternals,
            sha: functionSHA,
            storedAt,
        };

        const stored = await database.updateDocument(
            collections.functions,
            functionID,
            databaseFunctionData,
        );
        if (!stored) {
            return {
                status: false,
            };
        }


        const functionData = {
            id: functionID,
            ...databaseFunctionData,
        };

        const prepared = await prepareFunctioner(
            functionData,
        );
        if (!prepared) {
            return {
                status: false,
            };
        }


        return {
            status: true,
            data: {
                ...functionData,
            },
        };
    } catch (error) {
        delog({
            text: 'storeFunction error',
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
export default storeFunction;
// #endregion exports
