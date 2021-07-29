const net = require('net');



const server = net.createServer();


server.listen(
    53179,
    () => {
        console.log('TCP server started');
    },
);

server.on('connection', (socket) => {
    socket.write(
        'HTTP/1.0 200 OK\r\n' +
        '\r\n',
    );

    socket.write('Connected succesfully');
    socket.end();
});
