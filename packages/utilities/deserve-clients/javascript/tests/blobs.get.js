const path = require('path');
const fs = require('fs');

const {
    runner,
} = require('@plurid/runner');

const DeserveClient = require('../distribution').default;



const prepare = async (
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


    const pathToReadFile = path.join(
        __dirname,
        'test.file',
    );
    const readStream = fs.createReadStream(pathToReadFile);

    const storeResult = await deserveClient.blobs.store(
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
        storeResult.status, true, '==',
    );


    return {
        deserveClient,
        storeResult,
    };
}


const run = async (
    check,
    preparation,
) => {
    const {
        deserveClient,
        storeResult,
    } = preparation;

    const blobID = storeResult.data.id;
    const getResult = await deserveClient.blobs.get(blobID);
    check(
        '.get file',
        getResult.status, true, '==',
    );

    const pathToWriteFile = path.join(
        __dirname,
        'test.file.get',
    );
    const writeStream = fs.createWriteStream(pathToWriteFile);
    getResult.data.body.pipe(writeStream);


    return {
        getResult,
    };
}



runner(
    prepare,
    run,
);
