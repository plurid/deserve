// #region imports
    // #region external
    import {
        Key,
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
