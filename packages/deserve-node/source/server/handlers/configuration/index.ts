// #region imports
    // #region imports
    import fs from 'fs';

    import chokidar from 'chokidar';

    import Deon, {
        typer,
    } from '@plurid/deon';

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
        DatabaseCollections,
        ConfigurationFile,
        ConfigurationOwner,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const setupOwners = async (
    collections: DatabaseCollections,
    owners: ConfigurationOwner[],
) => {
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
                collections.owners,
                'identonym',
                identonym,
            );

            if (!existingOwner) {
                await database.updateDocument(
                    collections.owners,
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
                    collections.owners,
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
    collections: DatabaseCollections,
    registration: boolean,
) => {
    await database.updateDocument(
        collections.global,
        DESERVE_GLOBAL_DOCUMENT_ID,
        {
            registration,
        },
    );
}


const handleConfigurationFile = async (
    collections: DatabaseCollections,
) => {
    if (!fs.existsSync(CONFIGURATION_PATH)) {
        delog({
            text: 'configuration path does not exist',
            level: 'warn',
        });
        return;
    }

    const deon = new Deon();
    const data = await deon.parseFile<any>(
        CONFIGURATION_PATH,
    );
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
    } = typer<ConfigurationFile>(data);

    if (Array.isArray(owners)) {
        await setupOwners(
            collections,
            owners,
        );
    }

    if (typeof registration === 'boolean') {
        await setupRegistration(
            collections,
            registration,
        );
    }
}


const setupConfiguration = async (
    collections: DatabaseCollections,
) => {
    try {
        chokidar
            .watch(
                CONFIGURATION_PATH,
            ).on('all', () => {
                handleConfigurationFile(
                    collections,
                );
            });

        await handleConfigurationFile(
            collections,
        );

        return true;
    } catch (error) {
        delog({
            text: 'could not setup configuration',
            level: 'error',
            error,
        });
        return false;
    }
}
// #endregion module



// #region exports
export default setupConfiguration;
// #endregion exports
