// #region imports
    // #region external
    import {
        IDeserveClient,
        DeserveClientOptions,

        DeserveClientsManagerOptions,
        RecordOf,
        DeserveClientsManagerMetadata,
        DeserveClients,
    } from '~data/interfaces';

    import {
        ONE_HOUR,
        ONE_DAY,
    } from '~data/constants';

    import DeserveClient from '../DeserveClient';
    // #endregion external
// #endregion imports



// #region module
class DeserveClientsManager {
    private options: DeserveClientsManagerOptions;
    private metadata: RecordOf<DeserveClientsManagerMetadata> = {};
    private clients: DeserveClients = {};


    constructor(
        options?: Partial<DeserveClientsManagerOptions>,
    ) {
        this.options = this.resolveOptions(options);

        setInterval(
            () => {
                this.cleanup();
            },
            this.options.cleanupInterval,
        );
    }


    private resolveOptions(
        options?: Partial<DeserveClientsManagerOptions>,
    ) {
        const resolvedOptions: DeserveClientsManagerOptions = {
            cleanupInterval: options?.cleanupInterval || ONE_HOUR,
            expiration: options?.expiration || ONE_DAY,
        };

        return resolvedOptions;
    }


    public generate(
        identonym: string,
        token: string,
        options?: DeserveClientOptions,
    ) {
        const deserveClient = DeserveClient(
            identonym,
            token,
            options,
        );

        this.clients[identonym] = deserveClient;
        this.metadata[identonym] = {
            generatedAt: Date.now(),
        };

        return deserveClient;
    }


    public get(
        identonym: string,
    ): IDeserveClient | undefined {
        return this.clients[identonym];
    }

    public getAll(): DeserveClients {
        return this.clients;
    }


    public cleanup() {
        const now = Date.now();
        const metadataEntries = Object.entries(this.metadata);

        for (const [identonym, metadata] of metadataEntries) {
            if (!metadata) {
                continue;
            }

            if (now > metadata.generatedAt + this.options.expiration) {
                delete this.metadata[identonym];
                delete this.clients[identonym];
            }
        }
    }

    public remove(
        identonym: string,
    ) {
        delete this.metadata[identonym];
        delete this.clients[identonym];
    }
}
// #endregion module



// #region exports
export default DeserveClientsManager;
// #endregion exports
