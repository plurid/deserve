const database = require('@plurid/deserve-functioner-database').default;
const storage = require('@plurid/deserve-functioner-storage').default;
const event = require('@plurid/deserve-functioner-event').default;

const services = {
    database,
    storage,
    event,
};


const executableFunction = require('./function').$FUNCTION_NAME;


const main = async () => {
    const functionID = process.env.DESERVE_FUNCTION_ID;
    const functionArguments = await database.getFunctionArguments();


    const startedAt = Date.now();

    let result, error;
    try {
        result = await executableFunction(
            functionArguments,
            services,
        );
    } catch (_error) {
        error = _error;
    }

    const finishedAt = Date.now();


    await database.set(
        `${functionID}-result`,
        {
            startedAt,
            finishedAt,
            result,
            error,
        },
    );
}

main();
