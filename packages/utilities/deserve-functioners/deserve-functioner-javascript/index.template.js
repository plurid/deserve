const database = require('./services/database').database;
const storage = require('./services/storage').storage;
const event = require('./services/event').event;

const services = {
    database,
    storage,
    event,
};


const functionID = process.env.DESERVE_FUNCTION_ID;

const executableFunction = require('./function').$FUNCTION_NAME;


const main = async () => {
    const functionArguments = await database.getFunctionArguments();

    const result = await executableFunction(
        ...functionArguments,
        services,
    );

    await database.set(
        `${functionID}-result`,
        result,
    );
}

main();
