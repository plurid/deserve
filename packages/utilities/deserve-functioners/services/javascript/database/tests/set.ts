import runner, {
    curl,
    RunnerPrepare,
    RunnerRun,
    RunnerPostpare,
} from '@plurid/runner';

import database from '../distribution';



const prepare = async () => {
}

const run = async (
    preparation,
) => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const data = await database.set('id', 'data');
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
