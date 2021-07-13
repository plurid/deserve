// #region imports
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
        stringFromObject,
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
                const {
                    value,
                    storedAt,
                    updatedAt,
                    sha,
                } = item;

                data.push({
                    value: stringFromObject(value),
                    storedAt,
                    updatedAt,
                    sha,
                });
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
