// #region imports
    // #region external
    import getFunctionArguments from '../index';
    // #endregion external
// #endregion imports



// #region module
describe('getFunctionArguments', () => {
    it('works', async () => {
        const data = await getFunctionArguments();
        console.log(data);
    });
});
// #endregion module
