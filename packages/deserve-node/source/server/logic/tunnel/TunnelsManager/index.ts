// #region imports
    // #region external
    import Tunnel from '../Tunnel';
    // #endregion external
// #endregion imports



// #region module
class TunnelsManager {
    private tunnels: Record<string, Tunnel> = {};


    public add(
        id: string,
        tunnel: Tunnel,
    ) {
        this.tunnels[id] = tunnel;
    }

    public remove(
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
    public list() {
        return Object.keys(this.tunnels);
    }
}
// #endregion module



// #region exports
export default TunnelsManager;
// #endregion exports
