// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputRegisterCore,
        Core,
    } from '#server/data/interfaces';

    import database from '#server/services/database';
    // #endregion external
// #endregion imports



// #region module
const registerCore = async (
    input: InputRegisterCore,
    context: Context,
) => {
    const {
        domain,
        identonym,
        key,
    } = input;

    const id = uuid.generate();

    const core: Core = {
        id,
        domain,
        identonym,
        key,
    };

    await database.store(
        'core',
        id,
        core,
    );

    return {
        status: true,
    };
}
// #endregion module



// #region exports
export default registerCore;
// #endregion exports
