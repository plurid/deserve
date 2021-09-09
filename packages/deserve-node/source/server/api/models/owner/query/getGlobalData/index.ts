// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        DESERVE_GLOBAL_DOCUMENT_ID,
    } from '~server/data/constants';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getGlobalData = async (
    context: Context,
) => {
    try {
        const {
            collections,
        } = context;

        const globalData = await database.getById<any>(
            collections.global,
            DESERVE_GLOBAL_DOCUMENT_ID,
        );
        if (!globalData) {
            return {
                status: true,
                data: {
                    registration: false,
                },
            };
        }


        const {
            registration,
        } = globalData;

        return {
            status: true,
            data: {
                registration,
            },
        };
    } catch (error) {
        delog({
            text: 'getGlobalData error',
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
export default getGlobalData;
// #endregion exports
