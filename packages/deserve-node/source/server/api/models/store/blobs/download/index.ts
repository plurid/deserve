// #region imports
    // #region libraries
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
const download = async (
    request: express.Request,
    response: express.Response,
) => {
    try {
        const blobID = request.query.blob;
        if (typeof blobID !== 'string') {
            // console.log('No blob id');

            response.status(400).end();
            return;
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


        const blobData: any = await database.getById(
            deserveBlobsCollection,
            blobID,
        );
        if (!blobData) {
            // console.log('No blob data');
            response.status(404).end();
            return;
        }


        const outStream = await storage.object.readAsStream(
            DESERVE_BLOBS,
            blobID,
        );
        if (!outStream) {
            // console.log('No read stream');

            response.status(500).end();
            return;
        }

        response.setHeader('Content-Length', blobData.size);
        response.setHeader('Content-Type', blobData.mimetype);

        outStream.pipe(response);
    } catch (error) {
        response.status(500).end();
        return;
    }
}
// #endregion module



// #region exports
export default download;
// #endregion exports
