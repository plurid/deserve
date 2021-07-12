// #region imports
    // #region external
    import {
        Context,
        InputLogin,
    } from '~server/data/interfaces';

    import database, {
        getDeserveOwnersCollection,
        getDeserveCoresCollection,
    } from '~server/services/database';

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
        const deserveOwnersCollection = await getDeserveOwnersCollection();
        const deserveCoresCollection = await getDeserveCoresCollection();
        if (
            !deserveOwnersCollection
            || !deserveCoresCollection
        ) {
            return {
                status: false,
            };
        }


        const {
            response,
        } = context;

        const {
            identonym,
            key,
        } = input;

        const ownerQuery: any = await database.getBy(
            deserveOwnersCollection,
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
            deserveCoresCollection,
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
