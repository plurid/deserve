const net = require('net');



const host = process.env.HOST || 'localhost';
const port = '53179';

const remote = net.connect({
    host,
    port,
});
remote.setKeepAlive(true);


remote.on('connect', () => {
    console.log('connect', remote.remoteAddress, remote.address(), remote.localAddress);

    remote.write(`GET / HTTP/1.0\nHost: ${host}:${port}\n\n`);
});

remote.on('data', (data) => {
    console.log(data.toString());
});

remote.on('close', (error) => {
    console.log('error', error);
});

remote.on('end', () => {
    console.log('end');
});
