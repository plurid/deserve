// #region imports
    // #region external
    import DeserveClient from '~objects/DeserveClient';
    // #endregion external
// #endregion imports



// #region module
describe('DeserveClient:', () => {
    it(`works`, async () => {
        const deserveClient = DeserveClient('identonym', 'access-token');
        if (!deserveClient) {
            return;
        }
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
});
// #endregion module
