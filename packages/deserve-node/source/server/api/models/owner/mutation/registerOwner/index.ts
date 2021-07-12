// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions'
    // #endregion libraries


    // #region external
    import {
        Context,
        InputRegisterOwner,
        Owner,
    } from '~server/data/interfaces';

    import database, {
        getDeserveOwnersCollection,
        getDeserveCoresCollection,
    } from '~server/services/database';

    import {
        hashKey,
        generateToken,
        setCookieTokens,
        clientOwner,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const registerOwner = async (
    input: InputRegisterOwner,
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


        // const {
        //     response,
        // } = context;

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


        const id = uuid.generate();

        const hashedKey = await hashKey(key);

        const owner: Owner = {
            id,
            identonym,
            key: hashedKey,
        };

        await database.updateDocument(
            deserveOwnersCollection,
            id,
            owner,
        );


        // const token = generateToken(
        //     owner,
        // );

        // const coresQuery: any[] = await database.getAllWhere(
        //     deserveCoresCollection,
        //     {},
        // );

        // setCookieTokens(
        //     response,
        //     token,
        //     coresQuery,
        // );


        return {
            status: true,
            data: clientOwner(owner),
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default registerOwner;
// #endregion exports
