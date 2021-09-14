const express = require('express');
const DeserveClient = require('@plurid/deserve-client').default;



const PORT = 45455;

/**
 * A default service function.
 *
 * Asynchronous for example similarity,
 * since all deserve function runs are async.
 *
 * @returns
 */
const hello = async () => {
    return 'world';
}


const main = async () => {
    const server = express();

    /**
     * Service flag to be flipped on request.
     */
    let useDeserveFunctions = false;


    server.get('/', async (request, response) => {
        /**
         * Generate a deserve client,
         * eventually based on request authentication.
         */
        const deserveClient = DeserveClient(
            'localhost',
            'secret',
            {
                clientURI: 'http://localhost:3366/deserve',
            },
        );

        /**
         * Check if function is defined on the deserve node.
         */
        const deserveFunctionDefined = await deserveClient.functions.get('hello');

        /**
         * Run the custom deserve function.
         */
        if (
            deserveFunctionDefined
            && useDeserveFunctions
        ) {
            const data = await deserveClient.functions.run('hello');

            /**
             * The deserve function run may fail. Send response if valid.
             */
            if (data) {
                response.send(data);
                return;
            }
        }

        /**
         * Run the default service function.
         */
        const data = await hello();
        response.send(data);
        return;
    });

    /**
     * Toggle deserve functions usage.
     */
    server.post('/use-deserve-functions', () => {
        useDeserveFunctions = !useDeserveFunctions;
    });


    server.listen(PORT, () => {
        console.log(`server started on ${PORT}`);
    });
}

main();
