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
        index: string,
        identonym: string,
        token: string,
        options?: DeserveClientOptions,
    ) {
        const deserveClient = DeserveClient(
            identonym,
            token,
            options,
        );

        this.clients[index] = deserveClient;
        this.metadata[index] = {
            generatedAt: Date.now(),
        };

        return deserveClient;
    }


    public get(
        index: string,
    ): IDeserveClient | undefined {
        return this.clients[index];
    }

    public getAll(): DeserveClients {
        return this.clients;
    }


    public cleanup(
        expiration?: number,
    ) {
        const now = Date.now();
        const expirationValue = expiration || this.options.expiration;
        const metadataEntries = Object.entries(this.metadata);

        for (const [index, metadata] of metadataEntries) {
            if (!metadata) {
                continue;
            }

            if (now > metadata.generatedAt + expirationValue) {
                delete this.metadata[index];
                delete this.clients[index];
            }
        }
    }

    public remove(
        index: string,
    ) {
        delete this.metadata[index];
        delete this.clients[index];
    }

    public removeAll() {
        this.metadata = {};
        this.clients = {};
    }
}
// #endregion module



// #region exports
export default DeserveClientsManager;
// #endregion exports
