// #region imports
    // #region external
    import {
        InputOf,
        Context,
        InputRegisterCore,
        InputDeregisterCore,
        InputValueString,
    } from '#server/data/interfaces';

    import {
        Core,
    } from '#server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    registerCore: (
        _: any,
        { input }: InputOf<InputRegisterCore>,
        context: Context,
    ) => Core.Mutation.registerCore(
        input,
        context,
    ),
    deregisterCore: (
        _: any,
        { input }: InputOf<InputDeregisterCore>,
        context: Context,
    ) => Core.Mutation.deregisterCore(
        input,
        context,
    ),
    activateCore: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Core.Mutation.activateCore(
        input,
        context,
    ),
    deactivateCore: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Core.Mutation.deactivateCore(
        input,
        context,
    ),
};
// #endregion exports
