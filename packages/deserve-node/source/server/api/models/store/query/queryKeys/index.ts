// #region imports
    // #region external
    import {
        Context,

        InputQueryKeys,
        ResponseQueriedKeys,
    } from '~server/data/interfaces';

    import database, {
        getDeserveDataCollection,
    } from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';
    // #endregion external
// #endregion imports



// #region module
const queryKeys = async (
    input: InputQueryKeys,
    context: Context,
): Promise<ResponseQueriedKeys> => {
    try {
        const {
            request,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');

            return {
                status: false,
            };
        }


        const deserveDataCollection = await getDeserveDataCollection();
        if (
            !deserveDataCollection
        ) {
            // console.log('No database');

            return {
                status: false,
            };
        }


        const {
            filter,
        } = input;

        const {
            ownerID,
        } = core;

        const query: any = await database.getAllWhere(
            deserveDataCollection,
            {
                ownerID,
                ...JSON.parse(filter),
            },
        );

        const data: string[] = [];

        for (const queryItem of query) {
            if (queryItem.ownerID === ownerID) {
                data.push(JSON.stringify(queryItem.value));
            }
        }


        return {
            status: true,
            data,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default queryKeys;
// #endregion exports
