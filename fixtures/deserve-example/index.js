const express = require('express');



const PORT = 45455;

const hello = async () => {
    return 'world';
}


const main = async () => {
    const server = express();

    server.get('/', async (request, response) => {
        const data = await hello();
        response.send(data);
    });

    server.listen(PORT, () => {
        console.log(`server started on ${PORT}`);
    });
}

main();
