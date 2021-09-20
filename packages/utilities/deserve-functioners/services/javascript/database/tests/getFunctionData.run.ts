import runner, {
    curl,
    RunnerPrepare,
    RunnerRun,
    RunnerPostpare,
} from '@plurid/runner';

import database from '../distribution';



const prepare: RunnerPrepare = async () => {
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

    const input = {
        name: 'test',
        text: functionText,
        language: 'javascript',
    };

    // const s1 = Date.now();
    const generateFunctionData = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation StoreFunction($input: InputStoreFunction!) { storeFunction(input: $input) { status data { id } }}","variables":{"input":${JSON.stringify(input)}}}'`,
        `http://localhost:3366/deserve`,
    ]);
    // const s2 = Date.now();
    // console.log('duration function generation', s2 - s1);

    const id = generateFunctionData.data.storeFunction.data.id;


    // const s3 = Date.now();
    const runFunctionData = await curl([
        `-H 'Deserve-Token: 123'`,
        `-H 'Host: localhost:3355'`,
        `-H 'Content-Type: application/json'`,
        `--data-binary '{"query":"mutation RunFunction($input: InputRunFunction!) { runFunction(input: $input) { status data }}", "variables":{"input":{"id":"${id}", "arguments": "value"}}}'`,
        `http://localhost:3366/deserve`,
    ]);
    // const s4 = Date.now();
    // console.log('duration function run', s4 - s3);

    const tokens = runFunctionData.data.runFunction.data;


    return {
        id,
        tokens,
        functionText,
    };
}

const run: RunnerRun = async (
    check,
    prepared,
) => {
    const {
        id,
        tokens,
        functionText,
    } = prepared;

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

const postpare: RunnerPostpare = async (
    check,
    prepared,
    runned,
) => {
    const {
        id,
    } = prepared;

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
