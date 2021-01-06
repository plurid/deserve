// #region imports
    // #region external
    import {
        logLevels,
    } from '~server/data/constants';

    import {
        stringifyError,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
class Logger {
    private level: number;

    constructor(
        level: number,
    ) {
        this.level = level;
    }

    public log(
        data: string,
        level = logLevels.info,
        error?: any,
    ) {
        if (this.level <= level) {
            console.log(data);

            if (error) {
                console.log(
                    stringifyError(error),
                );
            }
        }
    }
}
// #endregion module



// #region exports
export default Logger;
// #endregion exports
