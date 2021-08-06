const database = require('@plurid/deserve-functioner-database').default;
const storage = require('@plurid/deserve-functioner-storage').default;
const event = require('@plurid/deserve-functioner-event').default;

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
