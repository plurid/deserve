// #region imports
    // #region external
    import {
        DeserveData,
    } from '~data/interfaces';

    import {
        deserveDataFile,
    } from '~data/constants';

    import {
        readDeonFile,
        writeDeonFile,

        hashKey,
    } from '~utilities/index';
    // #endregion external
// #endregion imports



// #region module
export const registerOwner = async (
    identonym: string,
    key: string,
) => {
    const deserveData = await readDeonFile<DeserveData>(
        deserveDataFile,
    );

    const currentOwners = deserveData?.owners || [];

    const hashedKey = await hashKey(key);
    if (!hashedKey) {
        return false;
    }

    const owners = [
        ...currentOwners,
        {
            identonym,
            hashedKey,
        },
    ];

    const newDeserveData: DeserveData = {
        ...deserveData,
        owners,
    };

    const written = await writeDeonFile(
        deserveDataFile,
        newDeserveData,
    );
    if (!written) {
        return false;
    }

    return true;
}
// #endregion module
