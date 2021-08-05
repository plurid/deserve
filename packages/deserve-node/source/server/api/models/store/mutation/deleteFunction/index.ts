// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputDeleteFunction,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const deleteFunction = async (
    input: InputDeleteFunction,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;

        const {
            id,
        } = input;

        const core = await getCoreFromRequest(request);

        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const deleted = await database.deleteDocument(
            collections.functions,
            id,
        );

        if (!deleted) {
            return {
                status: false,
            };
        }


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'deleteFunction error',
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
export default deleteFunction;
// #endregion exports
