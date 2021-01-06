// #region imports
    // #region external
    import {
        InputOf,
        Context,
        InputRegisterOwner,
        InputLogin,
    } from '~server/data/interfaces';

    import {
        Owner,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region module
const Mutation = {
    registerOwner: (
        _: any,
        { input }: InputOf<InputRegisterOwner>,
        context: Context,
    ) => Owner.Mutation.registerOwner(
        input,
        context,
    ),
    login: (
        _: any,
        { input }: InputOf<InputLogin>,
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
