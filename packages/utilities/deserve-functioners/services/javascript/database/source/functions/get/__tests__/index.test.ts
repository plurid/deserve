// #region imports
    // #region external
    import get from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('get', () => {
    process.env.DATABASE_ENDPOINT = 'http://localhost:3366/graphql';
    process.env.DATABASE_TOKEN = '__test__';

    it(`works`, async () => {
        const id = '1';

        const data = await get(id);

        expect(data).toEqual(1);
    });
});
// #endregion module
