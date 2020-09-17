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
    } from '#server/data/interfaces';

    import {
    } from '#server/data/constants';

    import database from '#server/services/database';

    import {
        hashKey,
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
            identonym,
            key,
        } = input;

        const id = uuid.generate();

        const hashedKey = await hashKey(key);

        const owner = {
            id,
            identonym,
            key: hashedKey,
        };

        await database.store(
            'owner',
            id,
            owner,
        );

        return {
            status: true,
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
