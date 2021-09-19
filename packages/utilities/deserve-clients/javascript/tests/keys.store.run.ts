import runner, {
    RunnerRun,
} from '@plurid/runner';

import DeserveClient from '../distribution';



const run: RunnerRun = async (
    check,
) => {
    const deserveClient = DeserveClient(
        'localhost',
        '123',
        {
            host: 'localhost:3355',
            origin: 'http://localhost:3366/deserve',
        },
    );

    const result = await deserveClient.keys.store(
        {
            some: 'data',
        },
    );

    check(
        '.store key',
        result.status, true, '==',
    );
}



runner(
    run,
);
