// #region imports
    // #region imports
    import fs from 'fs';

    import Deon from '@plurid/deon';

    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion imports


    // #region external
    import {
        CONFIGURATION_PATH,

        DESERVE_GLOBAL_DOCUMENT_ID,
    } from '~server/data/constants';

    import {
        ConfigurationFile,
        ConfigurationOwner,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getDeserveGlobalCollection,
        getDeserveOwnersCollection,
    } from '~server/logic/database';
    // #endregion external
// #endregion imports



// #region module
const setupOwners = async (
    owners: ConfigurationOwner[],
) => {
    const deserveOwnersCollection = await getDeserveOwnersCollection();
    if (!deserveOwnersCollection) {
        return;
    }

    for (const owner of owners) {
        try {
            const {
                identonym,
                hashedKey,
            } = owner;

            if (
                typeof identonym !== 'string'
                || typeof hashedKey !== 'string'
            ) {
                continue;
            }

            const existingOwner: any = await database.getBy(
                deserveOwnersCollection,
                'identonym',
                identonym,
            );

            if (!existingOwner) {
                await database.updateDocument(
                    deserveOwnersCollection,
                    uuid.generate(),
                    {
                        identonym,
                        key: hashedKey,
                    },
                );
                continue;
            }

            if (existingOwner.key !== hashedKey) {
                await database.updateWhere(
                    deserveOwnersCollection,
                    {
                        identonym,
                    },
                    'key',
                    hashedKey,
                );
            }
        } catch (error) {
            continue;
        }
    }
}


const setupRegistration = async (
    registration: boolean,
) => {
    const deserveGlobalCollection = await getDeserveGlobalCollection();
    if (!deserveGlobalCollection) {
        return;
    }

    await database.updateDocument(
        deserveGlobalCollection,
        DESERVE_GLOBAL_DOCUMENT_ID,
        {
            registration,
        },
    );
}


const handleConfigurationFile = async () => {
    const deon = new Deon();
    const data = await deon.parseFile<ConfigurationFile>(CONFIGURATION_PATH);
    if (!data) {
        delog({
            text: 'configuration path data could not be parsed',
            level: 'warn',
        });
        return;
    }

    const {
        owners,
        registration,
    } = data;

    if (Array.isArray(owners)) {
        await setupOwners(owners);
    }

    if (typeof registration === 'boolean') {
        await setupRegistration(registration);
    }
}


const setupConfiguration = async () => {
    try {
        if (!fs.existsSync(CONFIGURATION_PATH)) {
            delog({
                text: 'configuration path does not exist',
                level: 'warn',
            });
            return;
        }

        await handleConfigurationFile();
    } catch (error) {
        delog({
            text: 'could not setup configuration',
            level: 'error',
            error,
        });
        return;
    }
}
// #endregion module



// #region exports
export default setupConfiguration;
// #endregion exports
