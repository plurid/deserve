const curl = require('./utilities/curl').default;
const runner = require('./utilities/runner').default;

const database = require('../distribution').default;



const prepare = async () => {
}

const run = async (
    preparation,
) => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const data = await database.query({ filter: ''}, 'pagination');
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
