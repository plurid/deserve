// #region imports
    // #region libraries
    import {
        Transform,
    } from 'stream';
    // #endregion libraries
// #endregion imports



// #region module
class HeaderHostTransformer extends Transform {
    private host;
    private replaced;

    constructor(opts: any = {}) {
        super(opts);
        this.host = opts.host || 'localhost';
        this.replaced = false;
    }

    _transform(
        data: any,
        encoding: any,
        callback: any,
    ) {
        // after replacing the first instance of the Host header we just become a regular passthrough
        const match = this.replaced
            ? data
            : data.toString().replace(/(\r\n[Hh]ost: )\S+/, (match: any, $1: any) => {
                this.replaced = true;
                return $1 + this.host;
            });

        callback(
            null,
            match,
        );
    }
}
// #endregion module



// #region exports
export default HeaderHostTransformer;
// #endregion exports
