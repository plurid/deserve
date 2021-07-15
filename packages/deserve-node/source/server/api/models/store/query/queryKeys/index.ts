// #region imports
    // #region libraries
    import delog from '@plurid/delog';
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
            owner,
        } = context;

        const core = await getCoreFromRequest(
            request,
            owner,
            input.coreID,
        );
        if (!core) {
            delog({
                text: 'queryKeys no core',
                level: 'warn',
            });

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
            delog({
                text: 'queryKeys invalid filter',
                level: 'warn',
            });

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
            level: 'trace',
        });


        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'queryKeys error',
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
export default queryKeys;
// #endregion exports
