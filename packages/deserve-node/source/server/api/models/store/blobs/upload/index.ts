// #region imports
    // #region libraries
    import fs from 'fs';

    import express from 'express';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        getCoreFromRequest,
    } from '~server/logic/core';

    import storage, {
        DESERVE_BLOBS,
    } from '~server/services/storage';

    import database, {
        getDeserveBlobsCollection,
    } from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
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

        const blobSHA = (request.file as any).sha;
        if (!blobSHA) {
            delog({
                text: 'upload no blob sha',
                level: 'warn',
            });

            response.status(400).end();
        }


        const core = await getCoreFromRequest(request);
        if (!core) {
            delog({
                text: 'upload no core',
                level: 'warn',
            });

            response.status(400).end();
            return;
        }

        const deserveBlobsCollection = await getDeserveBlobsCollection();
        if (!deserveBlobsCollection) {
            delog({
                text: 'upload no database',
                level: 'warn',
            });

            response.status(500).end();
            return;
        }


        const {
            ownerID,
        } = core;

        const blobName = `${ownerID}/${blobSHA}`;
        const localFilePath = request.file.path;
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
            return;
        }


        const blobData = {
            ownerID,
            blobSHA,
            mimetype: request.file.mimetype || '',
            size: request.file.size,
            origin: request.header('Host') || '',
        };

        await database.updateDocument(
            deserveBlobsCollection,
            blobName,
            blobData,
        );


        delog({
            text: 'upload success',
            level: 'trace',
        });


        response.json({
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
