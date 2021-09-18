const {
    runner,
} = require('@plurid/runner');

const DeserveClient = require('../distribution').default;



const run = async (
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
