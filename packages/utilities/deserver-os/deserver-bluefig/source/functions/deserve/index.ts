// #region imports
    // #region external
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
    const deserveData = await readDeonFile(
        deserveDataFile,
    );

    const hashedKey = hashKey(key);
    const owners = [
        ...deserveData?.owners,
        {
            identonym,
            hashedKey,
        },
    ];

    const newDeserveData = {
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
