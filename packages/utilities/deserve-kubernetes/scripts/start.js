// #region imports
    // #region libraries
    const path = require('path');

    const forever = require('forever');
    // #endregion libraries
// #endregion imports



// #region module
const balancerUid = 'deservekubernetes';

const MAX_RESTARTS = 300;

const balancerFilePath = path.resolve(__dirname, '../distribution/index.js');
const logFileName = path.resolve(process.cwd(), 'deservekubernetes.out');


const main = () => {
    const child = forever.startDaemon(balancerFilePath, {
        uid: balancerUid,
        max: MAX_RESTARTS,
        logFile: logFileName,
        outFile: logFileName,
        errFile: logFileName,
    });
    forever.startServer(child);

    console.log('Started deserve kubernetes - Logging to ' + logFileName);
}

main();
// #endregion module
