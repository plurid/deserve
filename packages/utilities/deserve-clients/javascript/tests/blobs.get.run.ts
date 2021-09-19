import path from 'path';
import fs from 'fs';

import runner, {
    RunnerPrepare,
    RunnerRun,
    RunnerPostpare,
} from '@plurid/runner';

import DeserveClient, {
    IDeserveClient,
    ClientResponse,
    ClientSuccessResponse,
} from '../distribution';



interface Prepared {
    deserveClient: IDeserveClient;
    storeResult: ClientResponse<any>;
    blobID: string;
}


interface Runned {
    getBlobPath: string;
}


const prepare: RunnerPrepare<Prepared> = async (
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
        'a.blob',
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

    const blobID = (storeResult as ClientSuccessResponse).data.id;

    return {
        deserveClient,
        storeResult,
        blobID,
    };
}

const run: RunnerRun<Prepared> = async (
    check,
    preparation,
) => {
    const {
        deserveClient,
        blobID,
    } = preparation;

    const getResult = await deserveClient.blobs.get(blobID);
    check(
        '.get blob',
        getResult.status, true, '==',
    );

    const getBlobPath = path.join(
        __dirname,
        'a.blob.get',
    );
    const writeStream = fs.createWriteStream(getBlobPath);
    (getResult as ClientSuccessResponse).data.body.pipe(writeStream);


    return {
        getBlobPath,
    };
}

const postpare: RunnerPostpare<Prepared, Runned> = async (
    check,
    preparation,
    result,
) => {
    const {
        deserveClient,
        blobID,
    } = preparation;

    const {
        getBlobPath,
    } = result;

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
