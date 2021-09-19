import path from 'path';
import fs from 'fs';

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

    const pathToFile = path.join(
        __dirname,
        'a.blob',
    );
    const readStream = fs.createReadStream(pathToFile);

    const result = await deserveClient.blobs.store(
        readStream,
        {
            contentType: 'image/png',
            metadata: {
                some: 'data',
            },
        },
    );

    check(
        '.store file',
        result.status, true, '==',
    );
}



runner(
    run,
);
