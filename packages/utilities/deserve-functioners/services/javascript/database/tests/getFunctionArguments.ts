import runner, {
    curl,
    RunnerPrepare,
    RunnerRun,
    RunnerPostpare,
} from '@plurid/runner';

import database from '../distribution';



const prepare: RunnerPrepare = async () => {
    // process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    // process.env.DESERVE_DATABASE_TOKEN = '__test__';
}

const run: RunnerRun = async (
    check,
    prepared,
) => {
    const data = await database.getFunctionArguments();
    console.log('getFunctionArguments', data);
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
