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

    import database from '~server/services/database';

    import {
        hashKey,
        clientOwner,
        generateToken,
        setCookieToken,
    } from '~server/utilities';
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

        if (ownerQuery) {
            // console.log('Owner exists');
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
            collections.owners,
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
        // console.log(error);
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default registerOwner;
// #endregion exports
