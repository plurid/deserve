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
    } from '#server/data/interfaces';

    import database from '#server/services/database';

    import {
        hashKey,
        generateToken,
        setCookieToken,
        clientOwner,
    } from '#server/utilities';
    // #endregion external
// #endregion imports



// #region module
const registerOwner = async (
    input: InputRegisterOwner,
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

        if (!ownerQuery.empty) {
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

        await database.store(
            'owner',
            id,
            owner,
        );

        const token = generateToken(
            owner,
        );

        setCookieToken(
            response,
            token,
        );

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
