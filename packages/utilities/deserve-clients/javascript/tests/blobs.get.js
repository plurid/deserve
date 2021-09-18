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
        'test.blob',
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
        '.store blob',
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
        '.get blob',
        getResult.status, true, '==',
    );

    const getBlobPath = path.join(
        __dirname,
        'test.blob.get',
    );
    const writeStream = fs.createWriteStream(getBlobPath);
    getResult.data.body.pipe(writeStream);


    return {
        getResult,
        getBlobPath,
    };
}

const postpare = async (
    check,
    preparation,
    result,
) => {
    const {
        deserveClient,
        storeResult,
    } = preparation;

    const {
        getBlobPath,
    } = result;

    const blobID = storeResult.data.id;

    const deleteResult = await deserveClient.blobs.delete(blobID);
    check(
        '.delete blob',
        deleteResult.status, true, '==',
    );

    fs.unlinkSync(getBlobPath);
}


runner(
    prepare,
    run,
    postpare,
);
