// #region imports
    // #region external
    import database from '../distribution';
    // #endregion external
// #endregion imports



// #region module
const main = async () => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const get = await database.get('id');
    const getFunctionArguments = await database.getFunctionArguments();
    const getFunctionData = await database.getFunctionData();
    const query = await database.query({ filter: ''}, 'pagination');
    const remove = await database.remove('id');
    const set = await database.set('id', 'data');
}

main();
// #endregion module
