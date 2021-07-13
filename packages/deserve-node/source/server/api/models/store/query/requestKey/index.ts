// #region imports
    // #region external
    import {
        Context,

        InputRequestKey,
        ResponseRequestedKey,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        keyFromData,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const requestKey = async (
    input: InputRequestKey,
    context: Context,
): Promise<ResponseRequestedKey> => {
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
            id,
        } = input;

        const query: any = await database.getById(
            collections.keys,
            id,
        );
        if (!query) {
            // console.log('Not found');

            return {
                status: false,
            };
        }

        const data = keyFromData(query);


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
export default requestKey;
// #endregion exports
