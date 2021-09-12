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
        StoredFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        prepareFunctioner,

        validateDatabaseConstraints,
        validateStorageConstraints,
    } from '~server/logic/functioner';

    import {
        dataToObjectOrEmpty,
    } from '~server/utilities';
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
            language,
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


        const functionID = ownerID + '/' + uuid.multiple(3);
        const storedAt = Date.now();
        const functionSHA = await sha.compute(ownerID + storedAt + functionText);


        const validDatabase = await validateDatabaseConstraints(
            ownerID,
            functionDatabase,
        );
        const validStorage = await validateStorageConstraints(
            ownerID,
            functionStorage,
        );

        const validExternals = dataToObjectOrEmpty(functionExternals || '');

        const databaseFunctionData = {
            name: functionName,
            text: functionText,
            language,
            database: validDatabase,
            storage: validStorage,
            externals: validExternals,
            sha: functionSHA,
            storedAt,
            ownedBy: ownerID,
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


        const functionData: StoredFunction = {
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
