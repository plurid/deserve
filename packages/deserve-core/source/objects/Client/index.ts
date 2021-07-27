// #region imports
    // #region libraries
    import http from 'http';

    import {
        Agent,
    } from 'http';

    import pump from 'pump';
    import {
        EventEmitter,
    } from 'events';

    import {
        Request,
        Response,
    } from 'express';

    import delog from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        GRACE_TIMEOUT,
    } from '~data/constants';

    import TunnelAgent from '~objects/TunnelAgent';
    // #endregion external
// #endregion imports



// #region module
export interface ClientOptions {
    id: string;
    agent: TunnelAgent;
}

/**
 * A client encapsulates req/res handling using an agent
 *
 * If an agent is destroyed, the request handling will error
 * The caller is responsible for handling a failed request
 */
class Client extends EventEmitter {
    private id;
    private agent;
    private graceTimeout;

    constructor(
        options: ClientOptions,
    ) {
        super();

        const {
            id,
            agent,
        } = options;

        this.id = id;
        this.agent = agent;

        // client is given a grace period in which they can connect before they are _removed_
        this.graceTimeout = setTimeout(
            () => {
                this.close();
            },
            GRACE_TIMEOUT,
        ).unref();

        // FORCED agent as any
        (agent as any).on('online', () => {
            delog({
                text: `deserve core client online ${id}`,
                level: 'trace',
            });

            clearTimeout(this.graceTimeout);
        });

        (agent as any).on('offline', () => {
            delog({
                text: `deserve core client offline ${id}`,
                level: 'trace',
            });

            // if there was a previous timeout set, we don't want to double trigger
            clearTimeout(this.graceTimeout);

            // client is given a grace period in which they can re-connect before they are _removed_
            this.graceTimeout = setTimeout(
                () => {
                    this.close();
                    this.emit('offline');
                },
                GRACE_TIMEOUT,
            ).unref();
        });

        // An agent error removes the client, the deserve node needs to re-connect.
        (agent as any).once('error', (error: any) => {
            delog({
                text: 'deserve core error',
                level: 'error',
                error,
            });

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

        const clientReq = http.request(
            opt,
            (
                clientResponse,
            ) => {
                // write response code and headers
                response.writeHead(
                    clientResponse.statusCode || 500,
                    clientResponse.headers,
                );

                // using pump is deliberate - see the pump docs for why
                pump(clientResponse, response);
            },
        );

        // this can happen when underlying agent produces an error
        // in our case we 504 gateway error this?
        // if we have already sent headers?
        clientReq.once('error', (error) => {
            delog({
                text: 'deserve core Client handleRequest clientReq.once',
                level: 'error',
                error,
            });

            // TODO: if headers not sent - respond with gateway unavailable
        });

        // using pump is deliberate - see the pump docs for why
        pump(request, clientReq);
    }

    handleUpgrade(
        request: Request,
        socket: any,
    ) {
        socket.once('error', (error: any) => {
            // These client side errors can happen if the client dies while we are reading
            // We don't need to surface these in our logs.
            if (error.code == 'ECONNRESET' || error.code == 'ETIMEDOUT') {
                return;
            }

            delog({
                text: 'deserve core Client handleUpgrade socket error',
                level: 'error',
                error,
            });
        });

        this.agent.createConnection({}, (
            error: any,
            conn: any,
        ) => {
            // any errors getting a connection mean we cannot service this request
            if (error) {
                delog({
                    text: 'deserve core Client handleUpgrade agent createConnection error',
                    level: 'error',
                    error,
                });

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
