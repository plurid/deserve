const databaseToken = process.env.DESERVE_DATABASE_TOKEN;


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
        id,
        data,
    ) => {
        if (!databaseToken) {
            return;
        }
    }
};



module.exports = {
    database,
};
