const path = require('path');
const fs = require('fs');

const {
    runner,
} = require('@plurid/runner');

const DeserveClient = require('../distribution').default;



const run = async (
    check,
) => {
    const deserveClient = DeserveClient(
        'localhost',
        'secret',
        {
            origin: 'http://localhost:3366/deserve',
        },
    );

    const pathToFile = path.join(
        __dirname,
        'test.file',
    );
    const readStream = fs.createReadStream(pathToFile);

    const result = await deserveClient.blobs.store(readStream);
    console.log('result', result);
}



runner(
    run,
);
