// #region imports
    // #region libraries
    import {
        MongoClient,
    } from 'mongodb';
    // #endregion libraries
// #endregion imports



// #region module
const databaseConnection = async () => {
    try {
        const uri = process.env.MONGO_CONNECTION_STRING;

        if (!uri) {
            return;
        }

        const connection = await MongoClient.connect(
            uri,
            {
                useUnifiedTopology: true,
            },
        );

        return connection;
    } catch (error) {
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
