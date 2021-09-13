// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputGetExecution,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getExecution = async (
    input: InputGetExecution,
    context: Context,
): Promise<any> => {
    try {
        const {
            request,
            owner,
            collections,
        } = context;


        const core = await getCoreFromRequest(
            request,
            owner,
        );
        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const {
            executionID,
            functionID,
        } = input;

        const executionsData = await database.getAllWhere<any>(
            collections.executions,
            {
                id: executionID,
                ownedBy: ownerID,
                functionID,
            },
        );

        const executionData = executionsData[0];

        const {
            id,
            result,
            coreID,
        } = executionData;

        const clientExecution = {
            id,
            result,
            functionID,
            coreID,
        };

        return {
            status: true,
            data: {
                ...clientExecution,
            },
        };
    } catch (error) {
        delog({
            text: 'getExecution error',
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
export default getExecution;
// #endregion exports
