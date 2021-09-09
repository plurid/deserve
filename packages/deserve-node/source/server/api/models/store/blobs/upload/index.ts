// #region imports
    // #region libraries
    import fs from 'fs';

    import express from 'express';

    import delog from '@plurid/delog';

    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        Blob,
    } from '~server/data/interfaces';

    import storage, {
        DESERVE_BLOBS,
    } from '~server/services/storage';

    import database, {
        getDeserveBlobsCollection,
    } from '~server/services/database';

    import {
        dataToObjectOrDefault,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
const cleanupUpload = async (
    id: string,
) => {
    const cleaned = await storage.object.obliterate(
        DESERVE_BLOBS,
        id,
    );
    if (!cleaned) {
        delog({
            text: 'upload could not be cleaned up',
            level: 'warn',
        });
    }
}


const upload = async (
    request: express.Request,
    response: express.Response,
) => {
    try {
        if (!request.file) {
            delog({
                text: 'upload no file',
                level: 'warn',
            });

            response.status(400).end();
            return;
        }
        const localFilePath = request.file.path;


        const blobSHA = (request.file as any).sha;
        if (!blobSHA) {
            delog({
                text: 'upload no blob sha',
                level: 'warn',
            });

            response.status(400).end();

            fs.unlink(localFilePath, () => {});
            return;
        }


        const core = (request.file as any).core;
        if (!core) {
            delog({
                text: 'upload no core',
                level: 'warn',
            });

            response.status(400).end();

            fs.unlink(localFilePath, () => {});
            return;
        }

        const deserveBlobsCollection = await getDeserveBlobsCollection();
        if (!deserveBlobsCollection) {
            delog({
                text: 'upload no database',
                level: 'warn',
            });

            response.status(500).end();

            fs.unlink(localFilePath, () => {});
            return;
        }


        const {
            ownerID,
        } = core;

        const blobName = `${ownerID}/${blobSHA}`;
        const inStream = fs.createReadStream(localFilePath);
        const stored = await storage.object.store(
            DESERVE_BLOBS,
            blobName,
            inStream,
        );
        fs.unlink(localFilePath, () => {});
        if (!stored) {
            delog({
                text: 'upload not stored',
                level: 'warn',
            });

            response.status(500).end();

            await cleanupUpload(blobName);
            return;
        }


        const blobID = uuid.generate() + uuid.generate() + uuid.generate();
        const blobMetadata = dataToObjectOrDefault(request.body.metadata || '');

        const blobData: Blob = {
            id: blobID,
            ownerID,
            storedAt: Date.now(),
            blobSHA,
            mimetype: request.file.mimetype,
            size: request.file.size,
            origin: request.header('Host') || '',
            metadata: blobMetadata,
        };

        const saved = await database.updateDocument(
            deserveBlobsCollection,
            blobName,
            blobData,
        );

        if (!saved) {
            delog({
                text: 'upload not saved to database',
                level: 'warn',
            });

            response.status(500).end();

            await cleanupUpload(blobName);
            return;
        }


        delog({
            text: 'upload success',
            level: 'trace',
        });


        response.json({
            id: blobID,
            sha: blobSHA,
        });
    } catch (error) {
        delog({
            text: 'upload error',
            level: 'error',
            error,
        });

        response.status(500).end();
        return;
    }
}
// #endregion module



// #region exports
export default upload;
// #endregion exports
