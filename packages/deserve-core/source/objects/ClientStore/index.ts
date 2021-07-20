// #region imports
    // #region external
    import Client from '../Client';
    // #endregion external
// #endregion imports



// #region module
class ClientStore {
    private client: Client | null = null;

    add(
        client: Client,
    ) {
        this.client = client;
    }

    clear() {
        this.client = null;
    }

    check() {
        return !!this.client;
    }

    get() {
        return this.client;
    }
}
// #endregion module



// #region exports
export default ClientStore;
// #endregion exports
