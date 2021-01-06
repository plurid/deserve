// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        RecorderEntry,
        RecorderStore,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
class Recorder {
    private owner: any;

    constructor(
        owner: any,
    ) {
        this.owner = owner;
    }

    async save(
        entry: RecorderEntry,
    ) {
        const id = uuid.generate();

        const recorderStore: RecorderStore = {
            id,
            ...entry,
        };

        await database.store(
            'record',
            id,
            recorderStore,
        );
    }
}
// #endregion module



// #region exports
export default Recorder;
// #endregion exports
