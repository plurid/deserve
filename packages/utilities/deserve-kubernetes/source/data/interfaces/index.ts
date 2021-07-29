// #region imports
    // #region libraries
    import net from 'net';
    // #endregion libraries
// #endregion imports



// #region module
export type WorkerMessage =
    | {
        type: 'initialize';
        data: any;
    }
    | {
        type: 'destroy';
    };


export type LoadBalancerMiddleware = (
    socket: net.Socket,
    next: () => void,
) => void;

export interface LoadBalancerTarget {
    host: string;
    port: number;
}
// #endregion module
