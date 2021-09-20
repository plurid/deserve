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
const deserveFunctionsLanguages = [
    // 'go',
    'javascript',
    // 'python',
    // 'rust',
];


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
            language: functionLanguage,
            database: functionDatabase,
            storage: functionStorage,
            externals: functionExternals,
            addins: functionAddins,
        } = input;


        const normalizedLanguage = functionLanguage.trim().toLowerCase();
        if (!deserveFunctionsLanguages.includes(normalizedLanguage)) {
            return {
                status: false,
            }
        }


        const core = await getCoreFromRequest(
            collections,
            request,
        );
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
        const validAddins = dataToObjectOrEmpty(functionAddins || '');

        const databaseFunctionData: Omit<StoredFunction, 'id'> = {
            name: functionName,
            text: functionText,
            language: normalizedLanguage,
            database: validDatabase,
            storage: validStorage,
            externals: validExternals,
            addins: validAddins,
            sha: functionSHA,
            storedAt,
            ownedBy: ownerID,
            coreID: core.id,
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
            collections,
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
