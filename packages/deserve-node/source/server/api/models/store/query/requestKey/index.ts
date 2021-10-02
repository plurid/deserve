// #region imports
    // #region libraries
    import delog from '@plurid/delog';

    import {
        data as dataFunctions,
    } from '@plurid/plurid-functions';
    // #endregion libraries


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

        const core = await getCoreFromRequest(
            collections,
            request,
        );
        if (!core) {
            delog({
                text: 'requestKey no core',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            id,
            selector,
        } = input;

        const {
            ownerID,
        } = core;

        if (id) {
            const query: any = await database.getById(
                collections.keys,
                id,
            );
            if (!query) {
                delog({
                    text: 'requestKey not found',
                    level: 'warn',
                });

                return {
                    status: false,
                };
            }

            const data = keyFromData(query);


            delog({
                text: 'requestKey success',
                level: 'trace',
            });


            return {
                status: true,
                data,
            };
        }


        if (selector) {
            const filter = dataFunctions.parse(selector);
            if (!filter) {
                delog({
                    text: 'requestKey invalid filter',
                    level: 'warn',
                });

                return {
                    status: false,
                };
            }


            const keysData = await database.getAllWhere<any>(
                collections.keys,
                {
                    ...filter,
                    ownerID,
                },
            );

            const keyData = keysData[0];
            if (
                !keyData
                || keyData.ownedID !== ownerID
            ) {
                delog({
                    text: 'requestKey not found',
                    level: 'warn',
                });

                return {
                    status: false,
                };
            }

            const data = keyFromData(keyData);


            delog({
                text: 'requestKey success',
                level: 'trace',
            });


            return {
                status: true,
                data,
            };
        }


        delog({
            text: 'requestKey not found',
            level: 'trace',
        });


        return {
            status: false,
        };
    } catch (error) {
        delog({
            text: 'requestKey error',
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
export default requestKey;
// #endregion exports
