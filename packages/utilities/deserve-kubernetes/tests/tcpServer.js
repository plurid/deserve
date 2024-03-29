const net = require('net');



const server = net.createServer();


server.listen(
    53180,
    '0.0.0.0',
    () => {
        console.log('TCP server started', server.address());
    },
);


// server.on('connection', (socket) => {
//     console.log('connection from', socket.remoteAddress, socket.address());

//     socket.on('data', (data) => {
//         console.log(data.toString());
//     });

//     socket.write(
//         'GET / HTTP/1.1\r\n' +
//         '\r\n',
//     );

//     // socket.write('Connected succesfully');
//     socket.end();
// });


let hosts = [];

const tunnelRE = /^Deserve Tunnel: (.*)/;


server.on('connection', (sourceSocket) => {
    console.log('connection from', sourceSocket.remoteAddress, sourceSocket.address());


    let sourceBuffersLength = 0;
    let sourceBuffers = [];

    const bufferSourceData = (
        data,
    ) => {
        let cleanData = data;
        console.log('source', cleanData.toString().slice(0, 100));

        const match = cleanData.toString().match(tunnelRE);
        console.log('match', match);
        if (match) {
            const host = match[1];
            hosts.push(host);

            cleanData = Buffer.from(
                data.toString().replace(`Deserve Tunnel: ${host}`, ''),
            );
        }

        sourceBuffersLength += cleanData.length;
        sourceBuffers.push(cleanData);
    };

    sourceSocket.on('data', bufferSourceData);


    setTimeout(() => {
        console.log('hosts', hosts);

        const targetSocket = net.connect({
            host: '10.244.1.239',
            port: 53179,
        });

        targetSocket.on('data', (data) => {
            console.log('target', data.toString().slice(0, 100));
        });

        for (var i = 0; i < sourceBuffers.length; i++) {
            targetSocket.write(sourceBuffers[i]);
        }
        sourceBuffers = [];
        sourceBuffersLength = 0;


        sourceSocket.once('close', () => {
            targetSocket.end();
        });
        targetSocket.once('close', () => {
            sourceSocket.end();
        });

        sourceSocket.pipe(targetSocket);
        targetSocket.pipe(sourceSocket);
    }, 1000);
});
