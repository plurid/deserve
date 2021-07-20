// #region imports
    // #region libraries
    import {
        Agent,
    } from 'http';

    import net from 'net';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        TUNNEL_PORT,

        DEFAULT_MAX_SOCKETS,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
// Implements an http.Agent interface to a pool of tunnel sockets
// A tunnel socket is a connection _from_ a client that will
// service http requests. This agent is usable wherever one can use an http.Agent
class TunnelAgent extends Agent {
    private availableSockets: any[];
    private waitingCreateConn: any[];
    private connectedSockets;
    private maxTcpSockets;
    private server;
    private started;
    private closed;


    constructor(options: any = {}) {
        super({
            keepAlive: true,
            // only allow keepalive to hold on to one socket
            // this prevents it from holding on to all the sockets so they can be used for upgrades
            maxFreeSockets: 1,
        });

        // sockets we can hand out via createConnection
        this.availableSockets = [];

        // when a createConnection cannot return a socket, it goes into a queue
        // once a socket is available it is handed out to the next callback
        this.waitingCreateConn = [];

        // track maximum allowed sockets
        this.connectedSockets = 0;
        this.maxTcpSockets = options.maxTcpSockets || DEFAULT_MAX_SOCKETS;

        // new tcp server to service requests for this client
        this.server = net.createServer();
        // console.log('this.server', this.server);

        // flag to avoid double starts
        this.started = false;
        this.closed = false;
    }

    stats() {
        return {
            connectedSockets: this.connectedSockets,
        };
    }

    listen() {
        const server = this.server;
        if (this.started) {
            // console.log('started');
            throw new Error('already started');
        }
        this.started = true;

        server.on('close', this._onClose.bind(this));
        server.on('connection', this._onConnection.bind(this));
        server.on('error', (error: any) => {
            // These errors happen from killed connections, we don't worry about them
            if (error.code == 'ECONNRESET' || error.code == 'ETIMEDOUT') {
                return;
            }

            delog({
                text: 'deserve core TunnelAgent listen error',
                level: 'error',
                error,
            });
        });

        return new Promise((resolve) => {
            server.listen(
                TUNNEL_PORT,
                () => {
                    const port = (server as any).address().port;

                    delog({
                        text: `tcp server listening on port ${port}`,
                        level: 'trace',
                    });

                    resolve({
                        port,
                    });
                },
            );
        });
    }

    _onClose() {
        this.closed = true;
        // console.log('closed tcp socket');
        // flush any waiting connections
        for (const conn of this.waitingCreateConn) {
            conn(new Error('closed'), null);
        }
        this.waitingCreateConn = [];
        (this as any).emit('end');
    }

    // new socket connection from client for tunneling requests to client
    _onConnection(
        socket: any,
    ) {
        delog({
            text: `deserve core TunnelAgent _onConnection socket`,
            level: 'trace',
        });

        // no more socket connections allowed
        if (this.connectedSockets >= this.maxTcpSockets) {
            delog({
                text: `deserve core TunnelAgent no more sockets allowed`,
                level: 'warn',
            });

            socket.destroy();
            return false;
        }

        socket.once('close', (hadError: any) => {
            delog({
                text: `deserve core TunnelAgent closed socket`,
                level: 'trace',
            });

            // console.log('closed socket (error: %s)', hadError);
            this.connectedSockets -= 1;
            // remove the socket from available list
            const idx = this.availableSockets.indexOf(socket);
            if (idx >= 0) {
                this.availableSockets.splice(idx, 1);
            }

            // console.log('connected sockets: %s', this.connectedSockets);
            if (this.connectedSockets <= 0) {
                delog({
                    text: `deserve core TunnelAgent all sockets disconnected`,
                    level: 'trace',
                });
                (this as any).emit('offline');
            }
        });

        // close will be emitted after this
        socket.once('error', (err: any) => {
            // we do not log these errors, sessions can drop from clients for many reasons
            // these are not actionable errors for our server
            socket.destroy();
        });

        if (this.connectedSockets === 0) {
            (this as any).emit('online');
        }

        this.connectedSockets += 1;
        // console.log('new connection from: %s:%s', socket.address().address, socket.address().port);

        // if there are queued callbacks, give this socket now and don't queue into available
        const fn = this.waitingCreateConn.shift();
        if (fn) {
            delog({
                text: `deserve core TunnelAgent giving socket to queued conn request`,
                level: 'trace',
            });

            setTimeout(() => {
                fn(null, socket);
            }, 0);
            return;
        }

        // make socket available for those waiting on sockets
        this.availableSockets.push(socket);

        return;
    }

    // fetch a socket from the available socket pool for the agent
    // if no socket is available, queue
    // cb(err, socket)
    createConnection(options: any, cb: any) {
        if (this.closed) {
            cb(new Error('closed'));
            return;
        }

        delog({
            text: `deserve core TunnelAgent create connection`,
            level: 'trace',
        });

        // socket is a tcp connection back to the user hosting the site
        const sock = this.availableSockets.shift();

        // no available sockets
        // wait until we have one
        if (!sock) {
            this.waitingCreateConn.push(cb);

            delog({
                text: `deserve core TunnelAgent waiting connected ${this.connectedSockets}`,
                level: 'trace',
            });
            delog({
                text: `deserve core TunnelAgent waiting available ${this.availableSockets.length}`,
                level: 'trace',
            });

            return;
        }

        delog({
            text: `deserve core TunnelAgent socket given`,
            level: 'trace',
        });

        cb(null, sock);
    }

    destroy() {
        this.server.close();
        super.destroy();
    }
}
// #endregion module



// #region exports
export default TunnelAgent;
// #endregion exports
