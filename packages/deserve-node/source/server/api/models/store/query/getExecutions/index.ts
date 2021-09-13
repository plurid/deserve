// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputGetExecutions,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getExecutions = async (
    input: InputGetExecutions,
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
            functionID,
        } = input;

        const executionsData = await database.getAllWhere<any>(
            collections.executions,
            {
                ownedBy: ownerID,
                functionID,
            },
        );

        const clientExecutions: any[] = [];

        for (const executionData of executionsData) {
            const {
                id,
                result,
                functionID,
                coreID,
            } = executionData;

            const clientExecution = {
                id,
                result,
                functionID,
                coreID,
            };
            clientExecutions.push(clientExecution);
        }


        return {
            status: true,
            data: [
                ...clientExecutions,
            ],
        };
    } catch (error) {
        delog({
            text: 'getExecutions error',
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
export default getExecutions;
// #endregion exports
