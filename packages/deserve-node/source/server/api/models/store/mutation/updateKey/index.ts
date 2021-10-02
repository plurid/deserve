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

        InputUpdateKey,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import {
        dataToObjectOrDefault,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const updateLogic = async (
    collections: any,
    keyData: any,
    ownerID: any,
    data: any,
    field: string | undefined,
) => {
    if (keyData.ownerID === ownerID) {
        return false;
    }


    const updatedAt = Date.now();
    let previousHistory: any[] = keyData.history || [];

    if (previousHistory.length > 0) {
        // history logic
    }


    if (field) {
        await database.updateField(
            collections.keys,
            keyData.id,
            'value.' + field,
            dataToObjectOrDefault(data),
        );
    } else {
        await database.updateField(
            collections.keys,
            keyData.id,
            'value',
            dataToObjectOrDefault(data),
        );
    }

    const updated = await database.updateField(
        collections.keys,
        keyData.id,
        'updatedAt',
        updatedAt,
    );

    await database.updateField(
        collections.keys,
        keyData.id,
        'history',
        [
            ...previousHistory,
            {
                value: keyData.value,
                updatedAt,
            },
        ],
    );

    if (!updated) {
        return false;
    }

    return true;
}


const updateKey = async (
    input: InputUpdateKey,
    context: Context,
): Promise<Response> => {
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
                text: 'updateKey no core',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const {
            id,
            selector,
            data,
            field,
        } = input;

        const {
            ownerID,
        } = core;


        if (id) {
            const keyData = await database.getById<any>(
                collections.keys,
                id,
            );
            if (!keyData) {
                delog({
                    text: 'updateKey not found',
                    level: 'warn',
                });

                return {
                    status: false,
                };
            }

            const updated = await updateLogic(
                collections,
                keyData,
                ownerID,
                data,
                field,
            );

            if (!updated) {
                delog({
                    text: 'updateKey not updated',
                    level: 'warn',
                });

                return {
                    status: false,
                };
            }


            delog({
                text: 'updateKey success',
                level: 'trace',
            });


            return {
                status: true,
            };
        }


        if (selector) {
            const filter = dataFunctions.parse(selector);
            if (!filter) {
                delog({
                    text: 'updateKey invalid filter',
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

            for (const keyData of keysData) {
                const updated = await updateLogic(
                    collections,
                    keyData,
                    ownerID,
                    data,
                    field,
                );

                if (!updated) {
                    delog({
                        text: 'updateKey not updated',
                        level: 'warn',
                    });

                    continue;
                }
            }


            delog({
                text: 'updateKey success',
                level: 'trace',
            });


            return {
                status: true,
            };
        }


        return {
            status: false,
        };
    } catch (error) {
        delog({
            text: 'updateKey error',
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
export default updateKey;
// #endregion exports
