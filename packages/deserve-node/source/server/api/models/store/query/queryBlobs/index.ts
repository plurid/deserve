// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,

        InputQueryBlobs,
        ResponseQueriedBlobs,

        Blob,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        resolveFilter,
    } from '~server/logic/database/filter';

    import {
        blobFromData,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const queryBlobs = async (
    input: InputQueryBlobs,
    context: Context,
): Promise<ResponseQueriedBlobs> => {
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
                text: 'queryBlobs no core',
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

        const resolvedFilter = resolveFilter(
            filter,
            'metadata',
        );
        if (!resolvedFilter) {
            delog({
                text: 'queryBlobs invalid filter',
                level: 'warn',
            });

            return {
                status: false,
            };
        }

        const query: any = await database.getAllWhere(
            collections.blobs,
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

        const data: Blob[] = [];

        for (const item of query) {
            if (item.ownerID === ownerID) {
                const blob = blobFromData(item);
                data.push(blob);
            }
        }


        delog({
            text: 'queryBlobs success',
            level: 'trace',
        });


        return {
            status: true,
            data,
        };
    } catch (error) {
        delog({
            text: 'queryBlobs error',
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
export default queryBlobs;
// #endregion exports
