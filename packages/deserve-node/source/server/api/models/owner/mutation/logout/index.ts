// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        COOKIE_EMPTY_VALUE,
    } from '~server/data/constants';

    import database from '~server/services/database';

    import {
        setCookieTokens,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const logout = async (
    context: Context,
) => {
    try {
        const {
            response,
            owner,
            collections,
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }

        const coresQuery: any[] = await database.getAllBy(
            collections.cores,
            'ownerID',
            owner.id,
        );

        setCookieTokens(
            response,
            COOKIE_EMPTY_VALUE,
            coresQuery,
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
