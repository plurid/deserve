// #region imports
    // #region libraries
    import {
        storageType,
    } from '#server/data/constants';

    import {
        StorageType,
        StorageUploadKind,
    } from '#server/data/interfaces';
    // #endregion libraries

    // #region internal
    import filesystemStorage from './filesystem';
    // #endregion internal
// #endregion imports



// #region module
class Storage {
    private type: StorageType;

    constructor(
        type: StorageType,
    ) {
        this.type = type;
    }

    public async download(
        filename: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.download(
                    filename,
                );
        }
    }

    public async downloadAll(
        directory: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.downloadAll(
                    directory,
                );
        }
    }

    public async upload(
        filename: string,
        data: Buffer,
        kind?: StorageUploadKind,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.upload(
                    filename,
                    data,
                    kind,
                );
        }
    }

    public async obliterate(
        filename: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.obliterate(
                    filename,
                );
        }
    }

    public async obliterateAll(
        path: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.obliterateAll(
                    path,
                );
        }
    }

    public async generateLocations() {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.generateLocations();
        }
    }
}
// #endregion module



// #region exports
export default Storage;
// #endregion exports
