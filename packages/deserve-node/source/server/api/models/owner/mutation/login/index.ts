// #region imports
    // #region external
    import {
        Context,
        InputLogin,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        validateKey,
        generateToken,
        setCookieTokens,
    } from '~server/utilities';
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
            collections,
        } = context;

        const {
            identonym,
            key,
        } = input;

        const ownerQuery: any = await database.getBy(
            collections.owners,
            'identonym',
            identonym,
        );

        if (!ownerQuery) {
            return {
                status: false,
            };
        }

        const owner = ownerQuery;

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

        const coresQuery: any[] = await database.getAllBy(
            collections.cores,
            'ownerID',
            owner.id,
        );

        setCookieTokens(
            response,
            token,
            coresQuery,
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
