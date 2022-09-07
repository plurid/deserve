// #region imports
    // #region libraries
    import storage from '@plurid/fileface-minio';
    // #endregion libraries
// #endregion imports



// #region exports
export * from '~server/data/constants/storage';

storage.client.generate({
    endPoint: process.env.DESERVE_NODE_MINIO_END_POINT || '',
    port: parseInt(process.env.DESERVE_NODE_MINIO_PORT || ''),
    accessKey: process.env.DESERVE_NODE_MINIO_ACCESS_KEY || '',
    secretKey: process.env.DESERVE_NODE_MINIO_SECRET_KEY || '',
});

export default storage;
// #endregion exports
