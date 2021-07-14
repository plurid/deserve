// #region imports
    // #region libraries
    import fs from 'fs';
    import path from 'path';
    import cors from 'cors';
    import multer from 'multer';

    import {
        Application,
    } from 'express';

    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        DATA_PATH,
    } from '~server/data/constants';

    import {
        Store,
    } from '~server/api/models';

    import storage, {
        DESERVE_BLOBS,
    } from '~server/services/storage';

    import {
        createSHAStream,
    } from '~server/utilities/sha';
    // #endregion external
// #endregion imports



// #region module
const initializeStorage = async () => {
    try {
        const dataPathExists = fs.existsSync(DATA_PATH);
        if (!dataPathExists) {
            fs.mkdirSync(DATA_PATH);
        }


        const buckets = [
            DESERVE_BLOBS,
        ];

        buckets.forEach(async (bucket) => {
            const bucketExists = await storage.bucket.exists(bucket);

            if (!bucketExists) {
                await storage.bucket.generate(bucket);
            }
        });
    } catch (error) {
        delog({
            text: 'could not initialize storage',
            level: 'error',
            error,
        });

        return;
    }
}


const setupBlobs = (
    instance: Application,
) => {
    initializeStorage();


    const multerInstance = multer(
        {
            storage: {
                _handleFile: (_, file, callback) => {
                    const shaStream = createSHAStream();
                    let sha = '';
                    shaStream.on('digest', (result: string) => {
                        sha = result;
                    });

                    const localpath = path.join(
                        DATA_PATH,
                        uuid.generate(),
                    );
                    const outStream = fs.createWriteStream(localpath);

                    file.stream
                        .pipe(shaStream)
                        .pipe(outStream);

                    outStream.on('error', callback);
                    outStream.on('finish', () => {
                        callback(
                            null,
                            {
                                path: localpath,
                                size: outStream.bytesWritten,
                                sha,
                            } as any,
                        );
                    });
                },
                _removeFile: (_, file, callback) => {
                    fs.unlink(file.path, callback);
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
        Store.blobs.upload,
    );

    instance.get(
        '/download',
        cors(corsOptions) as any,
        Store.blobs.download,
    );
}
// #endregion module



// #region exports
export default setupBlobs;
// #endregion exports
