// #region imports
    // #region external
    import {
        DeserverData,
    } from '~data/interfaces';

    import {
        deserverDataFile,
    } from '~data/constants';

    import {
        readDeonFile,
        writeDeonFile,

        hashKey,
        validateKey,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
export const checkRootKey = async (
    rootKey: string,
) => {
    if (!rootKey) {
        return false;
    }

    const deserverData = await readDeonFile<DeserverData>(
        deserverDataFile,
    );

    const valid = await validateKey(
        rootKey,
        deserverData?.rootKeyHash || '',
    );
    if (!valid) {
        return false;
    }

    return true;
}


export const storeRootKey = async (
    rootKey: string,
) => {
    const deserverData = await readDeonFile<DeserverData>(
        deserverDataFile,
    );

    const rootKeyHash = await hashKey(rootKey);
    if (!rootKeyHash) {
        return false;
    }

    const deserverNewData = {
        ...deserverData,
        rootKeyHash,
    };

    await writeDeonFile(
        deserverDataFile,
        deserverNewData,
    );

    return true;
}


export const checkAdminKey = async (
    adminKey: string,
) => {
    if (!adminKey) {
        return false;
    }

    const deserverData = await readDeonFile<DeserverData>(
        deserverDataFile,
    );

    const valid = await validateKey(
        adminKey,
        deserverData?.adminKeyHash || '',
    );
    if (!valid) {
        return false;
    }

    return true;
}


export const storeAdminKey = async (
    adminKey: string,
) => {
    const deserverData = await readDeonFile<DeserverData>(
        deserverDataFile,
    );

    const adminKeyHash = await hashKey(adminKey);
    if (!adminKeyHash) {
        return false;
    }

    const deserverNewData = {
        ...deserverData,
        adminKeyHash,
    };

    await writeDeonFile(
        deserverDataFile,
        deserverNewData,
    );

    return true;
}
// #endregion module
