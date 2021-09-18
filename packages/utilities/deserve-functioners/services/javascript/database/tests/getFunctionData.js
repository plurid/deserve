const {
    curl,
    runner,
} = require('@plurid/runner');

const database = require('../distribution').default;



const prepare = async () => {
    const functionText = `
const test = async (
    args,
    services,
) => {
    console.log(args, services);

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, 5_000);
    });

    return {
        args,
    };
}

module.exports = {
    test,
};
`;

    const generateFunctionData = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation StoreFunction($input: InputStoreFunction!) { storeFunction(input: $input) { status data { id } }}","variables":{"input":{"name":"test","text":"${functionText}","language":"javascript"}}}'`,
        `http://localhost:3366/deserve`,
    ]);

    const id = generateFunctionData.data.storeFunction.data.id;

    const runFunctionData = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation RunFunction($input: InputRunFunction!) { runFunction(input: $input) { status data }}", "variables":{"input":{"id":"${id}", "arguments": "value"}}}'`,
        `http://localhost:3366/deserve`,
    ]);

    const tokens = runFunctionData.data.runFunction.data;

    return {
        id,
        tokens,
        functionText,
    };
}

const run = async (
    preparation,
) => {
    const {
        id,
        tokens,
        functionText,
    } = preparation;

    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = tokens.database;

    const data = await database.getFunctionData();
    console.log('getFunctionData', data);

    if (data.text === functionText) {
        // test passed;
    } else {
        // test failed;
    }
}

const postpare = async (
    preparation,
    result,
) => {
    const {
        id,
    } = preparation;

    const deleted = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation DeleteFunction($input: InputDeleteFunction!) { deleteFunction(input: $input) { status data }}", "variables":{"input":{"id":"${id}"}}}'`,
        `http://localhost:3366/deserve`,
    ]);
}


runner(
    prepare,
    run,
    postpare,
);
