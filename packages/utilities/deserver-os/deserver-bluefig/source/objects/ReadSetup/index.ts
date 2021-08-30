// #region imports
    // #region libraries
    import chokidar from 'chokidar';
    // #endregion libraries


    // #region external
    import {
        DeserverData,
    } from '~data/interfaces';

    import {
        deserverDataFile,
    } from '~data/constants';

    import {
        readDeonFile,
    } from '~utilities/deon';
    // #endregion external
// #endregion imports



// #region module
class ReadSetup {
    private setup = false;

    constructor() {
        this.read();
        this.listener();
    }


    private async listener() {
        chokidar
            .watch(deserverDataFile)
            .on('all', () => {
                this.read();
            });
    }

    private async read() {
        const data = await readDeonFile<DeserverData>(
            deserverDataFile,
        );

        if (
            !data
            || !data.rootKeyHash
        ) {
            this.setup = false;
            return
        }

        this.setup = true;
    }


    public get() {
        return this.setup;
    }
}
// #endregion module



// #region exports
export default ReadSetup;
// #endregion exports
