// #region imports
    // #region libraries
    import fs from 'fs';
    // #endregion libraries


    // #region external
    import DeserveClient from '~objects/DeserveClient';
    // #endregion external
// #endregion imports



// #region module
describe('DeserveClient:', () => {
    it(`works`, async () => {
        const deserveClient = DeserveClient('identonym', 'access-token');

        const blob = await deserveClient.blobs.get('blob-id');
        const key = await deserveClient.keys.get('key-id');

        expect(true).toBeTruthy();
    });

    it(`gets functions`, async () => {
        const deserveClient = DeserveClient(
            'localhost',
            'secret',
            {
                clientURI: 'http://localhost:3366/deserve',
            },
        );

        const data = await deserveClient?.functions.get('id');

        expect(true).toBeTruthy();
    });

    it(`stores files`, async () => {
        const deserveClient = DeserveClient(
            'localhost',
            'secret',
            {
                clientURI: 'http://localhost:3366/deserve',
            },
        );

        const pathToFile = '';
        const readStream = fs.createReadStream(pathToFile);
        const result = await deserveClient.blobs.store(readStream);

        expect(true).toBeTruthy();
    });
});
// #endregion module
