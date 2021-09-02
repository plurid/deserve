// #region imports
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
});
// #endregion module
