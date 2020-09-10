// #region imports
    // #region external
    import {
        Context,
    } from '#server/data/interfaces';

    import {
        Owner,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region module
const Mutation = {
    registerOwner: (
        _: any,
        { input }: any,
        context: Context,
    ) => Owner.Mutation.registerOwner(
        input,
        context,
    ),
    login: (
        _: any,
        { input }: any,
        context: Context,
    ) => Owner.Mutation.login(
        input,
        context,
    ),
    logout: (
        _: any,
        __: any,
        context: Context,
    ) => Owner.Mutation.logout(
        context,
    ),
};
// #endregion module



// #region exports
export default Mutation;
// #endregion exports
