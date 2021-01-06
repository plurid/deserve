// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Core,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    cores: async (
        _: any,
        __: any,
        context: Context,
    ) => {
        const coresRequest = await Core.Query.getCores(
            context,
        );

        if (!coresRequest.status) {
            return [];
        }

        return coresRequest.data;
    }
};
// #endregion exports
