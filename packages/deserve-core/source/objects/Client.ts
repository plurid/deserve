// #region imports
    // #region libraries
    import http from 'http';
    import Debug from 'debug';
    import pump from 'pump';
    import {
        EventEmitter,
    } from 'events';

    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries
// #endregion imports



// #region module
// A client encapsulates req/res handling using an agent
//
// If an agent is destroyed, the request handling will error
// The caller is responsible for handling a failed request
class Client extends EventEmitter {
    private agent;
    private id;
    private debug;
    private graceTimeout;

    constructor(options: any) {
        super();

        const agent = this.agent = options.agent;
        const id = this.id = options.id;

        this.debug = Debug(`lt:Client[${this.id}]`);

        // client is given a grace period in which they can connect before they are _removed_
        this.graceTimeout = setTimeout(() => {
            this.close();
        }, 1000).unref();

        agent.on('online', () => {
            this.debug('client online %s', id);
            clearTimeout(this.graceTimeout);
        });

        agent.on('offline', () => {
            this.debug('client offline %s', id);

            // if there was a previous timeout set, we don't want to double trigger
            clearTimeout(this.graceTimeout);

            // client is given a grace period in which they can re-connect before they are _removed_
            this.graceTimeout = setTimeout(() => {
                this.close();
                this.emit('offline');
            }, 1000).unref();
        });

        // TODO(roman): an agent error removes the client, the user needs to re-connect?
        // how does a user realize they need to re-connect vs some random client being assigned same port?
        agent.once('error', (err: any) => {
            this.close();
        });
    }

    stats() {
        return this.agent.stats();
    }

    close() {
        clearTimeout(this.graceTimeout);
        this.agent.destroy();
        this.emit('close');
    }

    handleRequest(
        request: Request,
        response: Response,
    ) {
        const {
            url,
            method,
            headers,
        } = request;

        const opt = {
            path: url,
            agent: this.agent,
            method,
            headers,
        };

        const clientReq = http.request(opt, (clientRes) => {
            // write response code and headers
            response.writeHead(
                clientRes.statusCode || 500,
                clientRes.headers,
            );

            // using pump is deliberate - see the pump docs for why
            pump(clientRes, response);
        });

        // this can happen when underlying agent produces an error
        // in our case we 504 gateway error this?
        // if we have already sent headers?
        clientReq.once('error', (err) => {
            console.log('clientReq.once', err);

            // TODO: if headers not sent - respond with gateway unavailable
        });

        // using pump is deliberate - see the pump docs for why
        pump(request, clientReq);
    }

    handleUpgrade(
        request: Request,
        socket: any,
    ) {
        socket.once('error', (err: any) => {
            // These client side errors can happen if the client dies while we are reading
            // We don't need to surface these in our logs.
            if (err.code == 'ECONNRESET' || err.code == 'ETIMEDOUT') {
                return;
            }
            // console.error(err);
        });

        this.agent.createConnection({}, (err: any, conn: any) => {
            // any errors getting a connection mean we cannot service this request
            if (err) {
                socket.end();
                return;
            }

            // socket met have disconnected while we waiting for a socket
            if (!socket.readable || !socket.writable) {
                conn.destroy();
                socket.end();
                return;
            }

            // websocket requests are special in that we simply re-create the header info
            // then directly pipe the socket data
            // avoids having to rebuild the request and handle upgrades via the http client
            const {
                method,
                url,
                httpVersion,
                rawHeaders,
            } = request;

            const arr = [`${method} ${url} HTTP/${httpVersion}`];

            for (let i = 0; i < (rawHeaders.length-1); i += 2) {
                arr.push(`${rawHeaders[i]}: ${rawHeaders[i+1]}`);
            }

            arr.push('');
            arr.push('');

            // using pump is deliberate - see the pump docs for why
            pump(conn, socket);
            pump(socket, conn);
            conn.write(arr.join('\r\n'));
        });
    }
}
// #endregion module



// #region exports
export default Client;
// #endregion exports
