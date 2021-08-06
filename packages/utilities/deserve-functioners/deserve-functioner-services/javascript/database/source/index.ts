const databaseToken = process.env.DESERVE_DATABASE_TOKEN;


// #region module
/**
 * General methods for database access.
 */
const database = {
    getFunctionData: async () => {
        // make request for function data
        return {};
    },
    getFunctionArguments: async () => {
        // make request for function arguments
        return [];
    },
    set: async (
        id: string,
        data: any,
    ) => {
        if (!databaseToken) {
            return;
        }
    }
};
// #endregion module



// #region exports
export default database;
// #endregion exports
