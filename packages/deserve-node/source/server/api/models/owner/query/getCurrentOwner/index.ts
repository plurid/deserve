// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCurrentOwner = async (
    context: Context,
) => {
    try {
        const {
            owner,
        } = context;

        if (!owner) {
            return {
                status: false,
            };
        }

        return {
            status: true,
            data: {
                ...owner,
            },
        };
    } catch (error) {
        delog({
            text: 'getCurrentOwner error',
            level: 'error',
            error,
        });

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default getCurrentOwner;
// #endregion exports
