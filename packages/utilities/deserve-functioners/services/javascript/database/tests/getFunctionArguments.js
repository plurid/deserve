const database = require('../distribution').default;



const main = async () => {
    process.env.DESERVE_ENDPOINT = 'http://localhost:3366';
    process.env.DESERVE_DATABASE_TOKEN = '__test__';

    const data = await database.getFunctionArguments();
    console.log('getFunctionArguments', data);
}

main();
