// #region imports
    // #region external
    import {
        Context,
        InputLogin,
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import {
        validateKey,
        generateToken,
        setCookieToken,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
const login = async (
    input: InputLogin,
    context: Context,
) => {
    try {
        const {
            response,
        } = context;

        const {
            identonym,
            key,
        } = input;

        const ownerQuery = await database.query(
            'owners',
            'identonym',
            identonym,
        );

        if (ownerQuery.empty) {
            return {
                status: false,
            };
        }

        const owner = ownerQuery.first;

        const validKey = await validateKey(
            key,
            owner.key,
        );

        if (!validKey) {
            return {
                status: false,
            };
        }

        const token = generateToken(
            owner,
        );

        setCookieToken(
            response,
            token,
            'localhost',
        );

        return {
            status: true,
            data: {
                ...owner,
            },
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default login;
// #endregion exports
