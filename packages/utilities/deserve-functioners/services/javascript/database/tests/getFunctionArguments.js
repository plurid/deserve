const {
    curl,
    runner,
} = require('@plurid/runner');

const database = require('../distribution').default;



const prepare = async () => {
}

const run = async (
    preparation,
) => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const data = await database.getFunctionArguments();
    console.log('getFunctionArguments', data);
}

const postpare = async (
    preparation,
    result,
) => {
}


runner(
    prepare,
    run,
    postpare,
);
