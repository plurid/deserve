// #region imports
    // #region libraries
    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Context,
        InputFunctionerEventEmit,
        Token,
        Response,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const eventEmit = async (
    input: InputFunctionerEventEmit,
    context: Context,
): Promise<Response> => {
    try {
        const {
            collections,
            functioner,
        } = context;
        if (!functioner) {
            return {
                status: false,
            };
        }


        const token = await database.getBy<Token>(
            collections.tokens,
            'value',
            functioner,
        );
        if (
            !token
            || token.authorization.type !== 'event'
        ) {
            return {
                status: false,
            };
        }


        const {
            type,
            data,
        } = input;


        if (type === 'deserve-function-result') {
            if (!data) {
                return {
                    status: false,
                };
            }

            const {
                functionID,
                ownedBy,
            } = token;
            const result = JSON.parse(data);

            database.updateDocument(
                collections.functionsResults,
                functionID,
                {
                    ...result,
                    functionID,
                    ownedBy,
                },
            );

            return {
                status: true,
            };
        }


        delog({
            text: 'eventEmit success',
            level: 'trace',
        });


        return {
            status: true,
        };
    } catch (error) {
        delog({
            text: 'eventEmit error',
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
export default eventEmit;
// #endregion exports
