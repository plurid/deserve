const net = require('net');



const server = net.createServer();


server.listen(
    53179,
    '0.0.0.0',
    () => {
        console.log('TCP server started', server.address());
    },
);

server.on('connection', (socket) => {
    console.log('connection from', socket.remoteAddress, socket.address());

    socket.write(
        'HTTP/1.0 200 OK\r\n' +
        '\r\n',
    );

    socket.write('Connected succesfully');
    socket.end();
});
