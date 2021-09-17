const {
    curl,
    runner,
} = require('@plurid/runner');

const database = require('../distribution').default;



const prepare = async () => {
    const functionText = `const test = (\\r\\n    args, services,\\r\\n) => {\\r\\n    console.log(args, services);\\r\\n    return { args };\\r\\n}\\r\\n\\r\\nmodule.exports = {\\r\\n    test,\\r\\n};\\r\\n`;

    const generateFunctionData = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation StoreFunction($input: InputStoreFunction!) { storeFunction(input: $input) { status data { id } }}","variables":{"input":{"name":"test","text":"${functionText}","language":"javascript"}}}'`,
        `http://localhost:3366/deserve`,
    ]);

    const id = generateFunctionData.data.storeFunction.data.id;

    return {
        id,
        functionText,
    };
}

const run = async (
    preparation,
) => {
    const {
        id,
        functionText,
    } = preparation;

    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

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
