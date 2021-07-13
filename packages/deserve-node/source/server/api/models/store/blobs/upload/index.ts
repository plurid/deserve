// #region imports
    // #region libraries
    import fs from 'fs';

    import express from 'express';
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
            // console.log('No file');
            response.status(400).end();
            return;
        }

        const blobSHA = (request.file as any).sha;
        if (!blobSHA) {
            // console.log('No blob sha');
            response.status(400).end();
        }


        const core = await getCoreFromRequest(request);
        if (!core) {
            // console.log('No core');
            response.status(400).end();
            return;
        }

        const deserveBlobsCollection = await getDeserveBlobsCollection();
        if (!deserveBlobsCollection) {
            // console.log('No database');
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


        response.json({
            sha: blobSHA,
        });
    } catch (error) {
        response.status(500).end();
        return;
    }
}
// #endregion module



// #region exports
export default upload;
// #endregion exports
