// #region imports
    // #region libraries
    import bcrypt from 'bcrypt';
    // #endregion libraries
// #endregion imports



// #region module
/**
 * Returns a hashed string for the `keyText`.
 *
 * @param keyText
 */
export const hashKey = async (
    keyText: string,
): Promise<string | undefined> => {
    try {
        const saltRounds = 12;
        const hashedKey = await bcrypt.hash(
            keyText,
            saltRounds,
        );

        return hashedKey;
    } catch (error) {
        return;
    }
}


/**
 * Validates that the `keyText` is equal to the `hash`.
 *
 * @param keyText
 * @param hash
 */
export const validateKey = async (
    keyText: string,
    hash: string,
) => {
    return await bcrypt.compare(
        keyText,
        hash,
    );
}
// #endregion module
