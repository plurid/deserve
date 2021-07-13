// #region imports
    // #region libraries
    import fs from 'fs';
    import cors from 'cors';
    import multer from 'multer';

    import {
        Application,
    } from 'express';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import storage, {
        BLOBS,
    } from '~server/services/storage';

    import {
        createSHAStream,
    } from '~server/utilities/sha';
    // #endregion external
// #endregion imports



// #region module
const initializeStorage = async () => {
    const buckets = [
        BLOBS,
    ];

    buckets.forEach(async (bucket) => {
        const bucketExists = await storage.bucket.exists(bucket);

        if (!bucketExists) {
            await storage.bucket.generate(bucket);
        }
    });
}


const setupUpload = (
    instance: Application,
) => {
    initializeStorage();


    const multerInstance = multer(
        {
            storage: {
                _handleFile: (_, file, cb) => {
                    const shaStream = createSHAStream();
                    let sha = '';
                    shaStream.on('digest', (result: string) => {
                        sha = result;
                    });

                    const localpath = `./data/${uuid.generate()}`;
                    const outStream = fs.createWriteStream(localpath);

                    file.stream
                        .pipe(shaStream)
                        .pipe(outStream);

                    outStream.on('error', cb);
                    outStream.on('finish', () => {
                        cb(
                            null,
                            {
                                path: localpath,
                                size: outStream.bytesWritten,
                                sha,
                            } as any,
                        );
                    });
                },
                _removeFile: (_, file, cb) => {
                    fs.unlink(file.path, cb);
                },
            },
        },
    );

    const corsOptions = {
        credentials: true,
        origin: (_: any, callback: any) => {
            callback(null, true);
        },
    };

    instance.post(
        '/upload',
        cors(corsOptions) as any,
        multerInstance.single('blob') as any,
        async (request, response) => {
            const core = await getCoreFromRequest(request);
            if (!core) {
                // console.log('No core');
                response.status(400).end();
                return;
            }

            if (!request.file) {
                // console.log('No file');
                response.status(400).end();
                return;
            }


            const localFilePath = request.file.path;
            const fileSHA = (request.file as any).sha;
            const filename = `${core.ownerID}/${fileSHA}`;
            const inStream = fs.createReadStream(localFilePath);
            const stored = await storage.object.store(
                BLOBS,
                filename,
                inStream,
            );
            if (!stored) {
                response.status(500).end();
                return;
            }
            fs.unlink(localFilePath, () => {});

            response.end();
        },
    );
}
// #endregion module



// #region exports
export default setupUpload;
// #endregion exports
