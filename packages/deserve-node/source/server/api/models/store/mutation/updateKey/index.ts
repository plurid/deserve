// #region imports
    // #region libraries
    import delog from '@plurid/delog';
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
const updateKey = async (
    input: InputUpdateKey,
    context: Context,
): Promise<Response> => {
    try {
        const {
            request,
            collections,
        } = context;

        const core = await getCoreFromRequest(request);
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
            data,
            field,
        } = input;

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

        if (field) {
            await database.updateField(
                collections.keys,
                id,
                'value.' + field,
                dataToObjectOrDefault(data),
            );
        } else {
            await database.updateField(
                collections.keys,
                id,
                'value',
                dataToObjectOrDefault(data),
            );
        }

        const updatedAt = Date.now();

        const updated = await database.updateField(
            collections.keys,
            id,
            'updatedAt',
            updatedAt,
        );

        await database.updateField(
            collections.keys,
            id,
            'history',
            [
                ...keyData.history,
                {
                    value: keyData.value,
                    updatedAt,
                },
            ],
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
