// #region imports
    // #region libraries
    import express from 'express';
    // #endregion libraries


    // #region external
    import {
        ClientOwner,
        Token,
        DatabaseCollections,
    } from '~server/data/interfaces';

    import database from '~server/services/database';

    import {
        getFunctioner,
    } from '~server/logic/functioner';
    // #endregion external
// #endregion imports



// #region module
export const getCoreFromRequest = async (
    collections: DatabaseCollections,
    request: express.Request,
    owner?: ClientOwner | undefined,
    coreID?: string | undefined,
) => {
    if (owner && coreID) {
        const cores: any[] = await database.getAllWhere(
            collections.cores,
            {
                id: coreID,
                ownerID: owner.id,
            },
        );
        const core = cores[0];
        if (!core) {
            // console.log('No core');

            return;
        }

        return core;
    }


    const functioner = getFunctioner(request);
    if (functioner) {
        const token = await database.getBy<Token>(
            collections.tokens,
            'value',
            functioner,
        );

        if (!token) {
            // console.log('No token');

            return;
        }

        const core = await database.getById(
            collections.cores,
            token.coreID,
        );
        return core;
    }


    const origin = request.header('Host');
    const token = request.header('Deserve-Token');
    if (!origin || !token) {
        // console.log('No origin or token');

        return;
    }

    const cores: any[] = await database.getAllWhere(
        collections.cores,
        {
            origins: origin,
            tokens: token,
        },
    );
    const core = cores[0];
    if (!core) {
        // console.log('No core');

        return;
    }

    return core;
}
// #endregion module
