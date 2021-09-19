import runner, {
    curl,
    RunnerPrepare,
    RunnerRun,
    RunnerPostpare,
} from '@plurid/runner';

import database from '../distribution';



const prepare: RunnerPrepare = async () => {
}

const run: RunnerRun = async (
    check,
) => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const data = await database.remove('id');
}

const postpare: RunnerPostpare = async (
    check,
    prepared,
    runned,
) => {
}


runner(
    prepare,
    run,
    postpare,
);
