// #region imports
    // #region external
    import getFunctionData from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('getFunctionData', () => {
    it('works', async () => {
        const data = await getFunctionData();
        console.log(data);
    });
});
// #endregion module
