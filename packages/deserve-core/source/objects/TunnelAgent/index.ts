// #region imports
    // #region libraries
    import {
        Agent,
    } from 'node:http';

    import net from 'node:net';

    import {
        delog,
    } from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        TunnelAgentOptions,
        TunnelAgentListen,
        TunnelAgentCallback,
    } from '~data/interfaces';

    import {
        TUNNEL_PORT,

        DEFAULT_MAX_SOCKETS,
    } from '~data/constants';
    // #endregion external
// #endregion imports



// #region module
/**
 * Implements an http.Agent interface to a pool of tunnel sockets.
 * A tunnel socket is a connection _from_ a client that will
 * service http requests. This agent is usable wherever one can use an http.Agent
 */
class TunnelAgent extends Agent {
    private availableSockets: net.Socket[];
    private waitingConnections: TunnelAgentCallback[];
    private connectedSockets;
    private maxTcpSockets;
    private server;
    private started;
    private closed;


    constructor(
        options: TunnelAgentOptions = {},
    ) {
        super({
            keepAlive: true,
            // Only allow keepalive to hold on to one socket
            // this prevents it from holding on to all the sockets so they can be used for upgrades.
            maxFreeSockets: 1,
        });

        // Sockets to can hand out via createConnection.
        this.availableSockets = [];

        // When a createConnection cannot return a socket, it goes into a queue
        // once a socket is available it is handed out to the next callback.
        this.waitingConnections = [];

        this.connectedSockets = 0;
        this.maxTcpSockets = options.maxSockets || DEFAULT_MAX_SOCKETS;

        this.server = net.createServer();

        this.started = false;
        this.closed = false;
    }


    private _onClose() {
        delog({
            text: `deserve core TunnelAgent _onClose`,
            level: 'trace',
        });

        this.closed = true;

        // Flush any waiting connections.
        for (const connection of this.waitingConnections) {
            connection(new Error('closed'), null);
        }

        this.waitingConnections = [];
        (this as any).emit('end');
    }

    /**
     * New socket connection from client for tunneling requests to client.
     *
     * @param socket
     * @returns
     */
    private _onConnection(
        socket: net.Socket,
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

        socket.once('close', (error: any) => {
            delog({
                text: `deserve core TunnelAgent closed socket`,
                level: 'trace',
            });

            if (error) {
                delog({
                    text: `deserve core TunnelAgent closed socket with error`,
                    level: 'error',
                    error,
                });
            }

            this.connectedSockets -= 1;
            // remove the socket from available list
            const index = this.availableSockets.indexOf(socket);
            if (index >= 0) {
                this.availableSockets.splice(index, 1);
            }

            delog({
                text: `deserve core TunnelAgent connected sockets ${this.connectedSockets}`,
                level: 'trace',
            });

            if (this.connectedSockets <= 0) {
                delog({
                    text: `deserve core TunnelAgent all sockets disconnected`,
                    level: 'trace',
                });
                (this as any).emit('offline');
            }
        });

        // close will be emitted after this
        socket.once('error', (error: any) => {
            // we do not log these errors, sessions can drop from clients for many reasons
            // these are not actionable errors for our server
            socket.destroy();
        });

        if (this.connectedSockets === 0) {
            (this as any).emit('online');
        }

        this.connectedSockets += 1;
        const socketAddress: any = socket.address();
        delog({
            text: `deserve core TunnelAgent new connection from ${socketAddress.address + ':' + socketAddress.port}`,
            level: 'trace',
        });

        // If there are queued callbacks, give this socket now and don't queue into available.
        const callback = this.waitingConnections.shift();
        if (callback) {
            delog({
                text: `deserve core TunnelAgent giving socket to queued connection request`,
                level: 'trace',
            });

            setTimeout(() => {
                callback(null, socket);
            }, 0);
            return;
        }

        // Make socket available for those waiting on sockets.
        this.availableSockets.push(socket);

        return;
    }

    private _onError(
        error: NodeJS.ErrnoException,
    ) {
        // Errors happen from killed connections.
        if (
            error.code == 'ECONNRESET'
            || error.code == 'ETIMEDOUT'
        ) {
            return;
        }

        delog({
            text: 'deserve core TunnelAgent listen error',
            level: 'error',
            error,
        });
    }


    public stats() {
        return {
            connectedSockets: this.connectedSockets,
        };
    }

    public listen(): Promise<TunnelAgentListen> {
        const server = this.server;
        if (this.started) {
            throw new Error('already started');
        }
        this.started = true;

        server.on('close', this._onClose.bind(this));
        server.on('connection', this._onConnection.bind(this));
        server.on('error', this._onError.bind(this));

        return new Promise((resolve) => {
            server.listen(
                TUNNEL_PORT,
                () => {
                    const port = (server as any).address().port;

                    delog({
                        text: `tcp server listening on port ${port}`,
                        level: 'info',
                    });

                    resolve({
                        port,
                    });
                },
            );
        });
    }

    /**
     * Fetch a socket from the available socket pool for the agent
     * If no socket is available, queue `callback(error, socket)`
     *
     * @param options
     * @param callback
     * @returns
     */
    public createConnection(
        _: any,
        callback: TunnelAgentCallback,
    ) {
        if (this.closed) {
            callback(new Error('closed'));
            return;
        }

        delog({
            text: `deserve core TunnelAgent create connection`,
            level: 'trace',
        });

        // Socket is a TCP connection back to the owner's deserve node.
        const socket = this.availableSockets.shift();

        // No available sockets.
        if (!socket) {
            this.waitingConnections.push(callback);

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

        callback(null, socket);
    }

    public destroy() {
        this.server.close();
        super.destroy();
    }
}
// #endregion module



// #region exports
export default TunnelAgent;
// #endregion exports
