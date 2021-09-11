// #region imports
    // #region external
    import get from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('get', () => {
    it('works', async () => {
        const id = '1';

        const data = await get(id);

        expect(data).toEqual(1);
    });
});
// #endregion module
