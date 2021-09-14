// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputGetFunction,
        StoredFunction,
    } from '~server/data/interfaces';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        modelClientFunction,
    } from '~server/logic/client/function';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const getFunction = async (
    input: InputGetFunction,
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
            input.coreID,
        );
        const ownerID = owner?.id || core.ownerID;
        if (!ownerID) {
            return {
                status: false,
            };
        }


        const {
            id,
            type,
        } = input;


        const queryType = typeof type === 'string'
            ? type
            : 'id-or-name';

        let filter = {};
        switch (queryType) {
            case 'id':
                filter = {
                    id,
                };
                break;
            case 'name':
                filter = {
                    name: id,
                };
                break;
            case 'id-or-name':
                filter = {
                    $or: [
                        {
                            id,
                        },
                        {
                            name: id,
                        },
                    ],
                };
                break;
        }

        const query = await database.getAllWhere<StoredFunction>(
            collections.functions,
            filter,
        );

        if (query.length === 0) {
            return {
                status: false,
            };
        }

        const clientFunction = modelClientFunction(query[0]);


        return {
            status: true,
            data: {
                ...clientFunction,
            },
        };
    } catch (error) {
        delog({
            text: 'getFunctions error',
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
export default getFunction;
// #endregion exports
