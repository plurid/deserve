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
const hashKey = async (
    keyText: string,
): Promise<string> => {
    try {
        const saltRounds = 12;
        const hashedKey = await bcrypt.hash(keyText, saltRounds);

        return hashedKey;
    } catch (error) {
        throw 'Could not Hash Key.';
    }
}


/**
 * Validates that the `keyText` is equal to the `hash`.
 *
 * @param keyText
 * @param hash
 */
const validateKey = async (
    keyText: string,
    hash: string,
) => {
    return await bcrypt.compare(keyText, hash);
}
// #endregion module



// #region exports
export {
    hashKey,
    validateKey,
};
// #endregion exports
