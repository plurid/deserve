// #region imports
    // #region libraries
    const forever = require('forever');
    // #endregion libraries
// #endregion imports



// #region module
const balancerUid = 'loadbalancer';

const MAX_RESTARTS = 300;

const balancerFilePath = path.resolve(__dirname, '../distribution/index.js');
const logFileName = path.resolve(process.cwd(), 'loadbalancer.out');


const main = () => {
    const child = forever.startDaemon(balancerFilePath, {
        uid: balancerUid,
        max: MAX_RESTARTS,
        logFile: logFileName,
        outFile: logFileName,
        errFile: logFileName,
    });
    forever.startServer(child);
    successMessage('Started loadbalancer - Logging to ' + logFileName);
}

main();
// #endregion module
