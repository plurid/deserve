// #region imports
    // #region libraries
    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        DESERVE_GLOBAL_DOCUMENT_ID,
    } from '~server/data/constants';

    import {
        Context,
        InputRegisterOwner,
        Owner,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        hashKey,
        clientOwner,
        generateToken,
        setCookieToken,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const registerOwner = async (
    input: InputRegisterOwner,
    context: Context,
) => {
    try {
        const {
            response,
            collections,
        } = context;

        const {
            identonym,
            key,
        } = input;


        const globalData = await database.getById<any>(
            collections.global,
            DESERVE_GLOBAL_DOCUMENT_ID,
        );
        const allowedRegistration = globalData && globalData.registration;
        if (!allowedRegistration) {
            delog({
                text: 'registerOwner registration not allowed',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const ownerQuery: any = await database.getBy(
            collections.owners,
            'identonym',
            identonym,
        );

        if (ownerQuery) {
            delog({
                text: 'registerOwner owner exists',
                level: 'warn',
            });

            return {
                status: false,
            };
        }


        const id = uuid.generate();

        const hashedKey = await hashKey(key);

        const owner: Owner = {
            id,
            identonym,
            key: hashedKey,
        };

        await database.updateDocument(
            collections.owners,
            id,
            owner,
        );


        const token = generateToken(
            owner,
        );

        setCookieToken(
            response,
            token,
        );


        delog({
            text: 'registerOwner success',
            level: 'trace',
        });

        const clientOwnerData = clientOwner(
            collections,
            owner,
        );

        return {
            status: true,
            data: {
                ...clientOwnerData,
            },
        };
    } catch (error) {
        delog({
            text: 'registerOwner error',
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
export default registerOwner;
// #endregion exports
