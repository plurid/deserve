// #region imports
    // #region libraries
    import express from 'express';
    // #endregion libraries


    // #region external
    import database, {
        getDeserveCoresCollection,
    } from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
export const getCoreFromRequest = async (
    request: express.Request,
) => {
    const origin = request.header('Host');
    const token = request.header('Deserve-Token');
    if (!origin || !token) {
        // console.log('No origin or token');

        return;
    }


    const deserveCoresCollection = await getDeserveCoresCollection();
    if (!deserveCoresCollection) {
        // console.log('No database');

        return;
    }

    const cores: any[] = await database.getAllWhere(
        deserveCoresCollection,
        {
            token,
        },
    );
    const core = cores[0];
    if (!core) {
        // console.log('No core');

        return;
    }

    // if (!core.origins.includes(origin)) {
    //     // console.log('No origin on core');

    //     return;
    // }

    return core;
}
// #endregion module
