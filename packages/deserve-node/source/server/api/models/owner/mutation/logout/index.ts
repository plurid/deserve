// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        setCookieToken,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
const logout = async (
    context: Context,
) => {
    try {
        const {
            response,
        } = context;

        setCookieToken(
            response,
            '',
            'localhost',
        );

        return {
            status: false,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default logout;
// #endregion exports
