// #region imports
    // #region external
    import Tunnel from './Tunnel';
    // #endregion external
// #endregion imports



// #region module
class TunnelsManager {
    private tunnels: Record<string, Tunnel> = {};

    add(
        id: string,
        tunnel: Tunnel,
    ) {
        this.tunnels[id] = tunnel;
    }

    remove(
        id: string,
    ) {
        const tunnel = this.tunnels[id];

        if (!tunnel) {
            return;
        }

        tunnel.close();
        delete this.tunnels[id];
    }

    /**
     * Returns an array of `id`s for the currently active tunnels.
     */
    list() {
        return Object.keys(this.tunnels);
    }
}
// #endregion module



// #region exports
export default TunnelsManager;
// #endregion exports
