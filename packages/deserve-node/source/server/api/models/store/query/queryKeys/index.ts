// #region imports
    // #region libraries
    import delog, {
        delogLevels,
    } from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputQueryKeys,
        ResponseQueriedKeys,

        Key,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        resolveFilter,
    } from '~server/logic/database/filter';

    import {
        keyFromData,
    } from '~server/utilities';
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
            collections,
        } = context;

        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');

            return {
                status: false,
            };
        }


        const {
            filter,
            start,
            count,
        } = input;

        const {
            ownerID,
        } = core;

        const resolvedFilter = resolveFilter(filter);
        if (!resolvedFilter) {
            // console.log('Invalid filter');

            return {
                status: false,
            };
        }

        const query: any = await database.getAllWhere(
            collections.keys,
            {
                ownerID,
                ...resolvedFilter,
            },
            {
                count,
                start,
                type: 'last',
            },
        );

        const data: Key[] = [];

        for (const item of query) {
            if (item.ownerID === ownerID) {
                const key = keyFromData(item);
                data.push(key);
            }
        }

        delog({
            text: 'queryKeys success',
            level: delogLevels.trace,
        });

        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'queryKeys error',
            level: delogLevels.error,
            error,
        });

        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default queryKeys;
// #endregion exports
