// #region imports
    // #region external
    import {
        Key,
        Blob,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const dataToObjectOrDefault = (
    data: string,
) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
}


export const stringFromObject = (
    data: any,
) => {
    if (typeof data === 'string') {
        return data;
    }

    return JSON.stringify(data);
}


export const blobFromData = (
    data: any,
) => {
    const {
        id,
        ownerID,
        storedAt,
        blobSHA,
        mimetype,
        size,
        origin,
        metadata,
    } = data;

    const blob: Blob = {
        id,
        ownerID,
        storedAt,
        blobSHA,
        mimetype,
        size,
        origin,
        metadata,
    };

    return blob;
}


export const keyFromData = (
    data: any,
) => {
    const {
        id,
        value,
        sha,
        storedAt,
        updatedAt,
    } = data;

    const key: Key = {
        id,
        value: stringFromObject(value),
        sha,
        storedAt,
        updatedAt,
    };

    return key;
}
// #endregion module
