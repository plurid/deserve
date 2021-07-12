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
        createSHAStream,
    } from '~server/utilities/sha';
    // #endregion external
// #endregion imports



// #region module
const setupUpload = (
    instance: Application,
) => {
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
        (request, response) => {

        },
    );
}
// #endregion module



// #region exports
export default setupUpload;
// #endregion exports
