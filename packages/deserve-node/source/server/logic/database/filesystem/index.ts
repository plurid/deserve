// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        Database,
        DatabaseGet,
        DatabaseGetAll,
        DatabaseQuery,
        DatabaseStore,
        DatabaseUpdate,
        DatabaseObliterate,
        DatabaseObliterateAll,
    } from '#server/data/interfaces';

    import {
        DATA_OWNERS,
    } from '#server/data/constants';

    import filesystemStorage from '#server/logic/storage/filesystem';
    // #endregion external
// #endregion imports



// #region module
const resolveDataPath = (
    entity: string,
) => {
    switch (entity) {
        case 'owners':
            return DATA_OWNERS;
        default:
            return '';
    }
}


const get: DatabaseGet = async (
    entity,
    id,
) => {
    const dataPath = resolveDataPath(entity);

    const entityPath = path.join(
        dataPath,
        id + '.json',
    );

    const data = await filesystemStorage.download(
        entityPath,
    );

    return data ? JSON.parse(data) : undefined;
}


const getAll: DatabaseGetAll = async (
    entity,
) => {
    switch (entity) {
        case 'owners':
            return await filesystemStorage.downloadAll(DATA_OWNERS);
        default:
            return [];
    }
}


const query: DatabaseQuery = async (
    entity,
    field,
    value,
) => {
    return;
}


const store: DatabaseStore = async (
    entity,
    id,
    data,
) => {
    const stringData = JSON.stringify(data, null, 4);

    const dataPath = resolveDataPath(entity);

    const entityPath = path.join(
        dataPath,
        id + '.json',
    );

    filesystemStorage.upload(
        entityPath,
        Buffer.from(stringData, 'utf-8'),
    );

    return;
}


const update: DatabaseUpdate = async (
    entity,
    id,
    field,
    value,
) => {
    const dataPath = resolveDataPath(entity);

    const entityPath = path.join(
        dataPath,
        id + '.json',
    );

    const data = await filesystemStorage.download(
        entityPath,
    );

    if (!data) {
        return;
    }

    const parsed = JSON.parse(data);

    parsed[field] = value;

    await filesystemStorage.upload(
        entityPath,
        Buffer.from(JSON.stringify(parsed, null, 4)),
    );

    return parsed;
}


const obliterate: DatabaseObliterate = async (
    entity,
    id,
) => {
    const dataPath = resolveDataPath(entity);

    const entityPath = path.join(
        dataPath,
        id + '.json',
    );

    await filesystemStorage.obliterate(
        entityPath,
    );

    return;
}


const obliterateAll: DatabaseObliterateAll = async (
    entity,
) => {
    switch (entity) {
        default:
            return;
    }
}



const filesystemDatabase: Database = {
    get,
    getAll,
    query,
    store,
    update,
    obliterate,
    obliterateAll,
};
// #endregion module



// #region exports
export default filesystemDatabase;
// #endregion exports
