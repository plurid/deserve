// #region imports
    // #region libraries
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
const download = async (
    request: express.Request,
    response: express.Response,
) => {
    try {
        const blobSHA = request.query.blob;
        if (typeof blobSHA !== 'string') {
            delog({
                text: 'download no blob sha',
                level: 'warn',
            });

            response.status(400).end();
            return;
        }


        const core = await getCoreFromRequest(request);
        if (!core) {
            delog({
                text: 'download no core',
                level: 'warn',
            });

            response.status(400).end();
            return;
        }

        const {
            ownerID,
        } = core;

        const deserveBlobsCollection = await getDeserveBlobsCollection();
        if (!deserveBlobsCollection) {
            delog({
                text: 'download no database',
                level: 'warn',
            });

            response.status(500).end();
            return;
        }


        const blobID = ownerID + '/' + blobSHA;

        const blobData: any = await database.getById(
            deserveBlobsCollection,
            blobID,
        );
        if (!blobData) {
            delog({
                text: 'download no blob data',
                level: 'warn',
            });

            response.status(404).end();
            return;
        }


        const outStream = await storage.object.readAsStream(
            DESERVE_BLOBS,
            blobID,
        );
        if (!outStream) {
            delog({
                text: 'download no read stream',
                level: 'warn',
            });

            response.status(500).end();
            return;
        }

        response.setHeader('Content-Length', blobData.size);
        response.setHeader('Content-Type', blobData.mimetype);


        delog({
            text: 'download success',
            level: 'trace',
        });


        outStream.pipe(response);
    } catch (error) {
        delog({
            text: 'download error',
            level: 'error',
            error,
        });

        response.status(500).end();
        return;
    }
}
// #endregion module



// #region exports
export default download;
// #endregion exports
