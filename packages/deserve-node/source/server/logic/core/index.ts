// #region imports
    // #region libraries
    import express from 'express';
    // #endregion libraries


    // #region external
    import {
        ClientOwner,
    } from '~server/data/interfaces';

    import database, {
        getDeserveCoresCollection,
    } from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
export const getCoreFromRequest = async (
    request: express.Request,
    owner?: ClientOwner | undefined,
    coreID?: string | undefined,
) => {
    const deserveCoresCollection = await getDeserveCoresCollection();
    if (!deserveCoresCollection) {
        // console.log('No database');

        return;
    }

    if (owner && coreID) {
        const cores: any[] = await database.getAllWhere(
            deserveCoresCollection,
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


    const origin = request.header('Host');
    const token = request.header('Deserve-Token');
    if (!origin || !token) {
        // console.log('No origin or token');

        return;
    }

    const cores: any[] = await database.getAllWhere(
        deserveCoresCollection,
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
