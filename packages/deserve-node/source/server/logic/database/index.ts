// #region imports
    // #region external
    import {
        databaseType,
    } from '~server/data/constants';

    import {
        DatabaseType,
    } from '~server/data/interfaces';
    // #endregion external

    // #region internal
    import filesystemDatabase from './filesystem';
    // #endregion internal
// #endregion imports



// #region module
class Database {
    private type: DatabaseType;

    constructor(
        type: DatabaseType,
    ) {
        this.type = type;
    }

    public get(
        entity: string,
        id: string,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.get(
                    entity,
                    id,
                );
        }
    }

    public getAll(
        entity: string,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.getAll(
                    entity,
                );
        }
    }

    public query(
        entity: string,
        field: string,
        value: string,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.query(
                    entity,
                    field,
                    value,
                );
        }
    }

    public store(
        entity: string,
        id: string,
        data: any,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.store(
                    entity,
                    id,
                    data,
                );
        }
    }

    public update(
        entity: string,
        id: string,
        field: string,
        value: any,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.update(
                    entity,
                    id,
                    field,
                    value,
                );
        }
    }

    public obliterate(
        entity: string,
        id: string,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.obliterate(
                    entity,
                    id,
                );
        }
    }

    public obliterateAll(
        entity: string,
    ) {
        switch (this.type) {
            case databaseType.filesystem:
                return filesystemDatabase.obliterateAll(
                    entity,
                );
        }
    }
}
// #endregion module



// #region exports
export default Database;
// #endregion exports
