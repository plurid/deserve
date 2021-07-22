// #region imports
    // #region libraries
    import {
        MongoClient,
    } from 'mongodb';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        DESERVE_DATABASE_URI,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
const databaseConnection = async () => {
    try {
        if (!DESERVE_DATABASE_URI) {
            delog({
                text: 'deserve node :: no database uri',
                level: 'error',
            });
            return;
        }

        const connection = await MongoClient.connect(
            DESERVE_DATABASE_URI,
        );

        return connection;
    } catch (error) {
        delog({
            text: 'deserve node :: no database connection',
            level: 'error',
            error,
        });
        return;
    }
}

const database = databaseConnection();
// #endregion module



// #region exports
export {
    database,
    databaseConnection,
};
// #endregion exports
