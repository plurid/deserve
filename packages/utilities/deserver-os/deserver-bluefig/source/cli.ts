// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    import fsSync, {
        promises as fs,
    } from 'fs';
    // #endregion libraries
// #endregion imports



// #region module
const deploy = async () => {
    console.log('\n\tDeploying deserver bluefig configuration.\n');

    const files = [
        'hooks.js',
        'views.js',
    ];

    const bluefigDirectory = path.join(
        os.homedir(),
        './.bluefig',
    );
    const bluefigExists = fsSync.existsSync(
        bluefigDirectory,
    );
    if (!bluefigExists) {
        fs.mkdir(bluefigDirectory);
    }

    for (const file of files) {
        await fs.copyFile(
            path.join(
                __dirname,
                '../distribution/' + file,
            ),
            path.join(
                os.homedir(),
                './.bluefig/' + file,
            ),
        );
    }
}


const update = async () => {
    console.log('\n\tUpdating deserver bluefig configuration.\n');

}


const cli = () => {
    const arg = process.argv[2];
    if (!arg) {
        console.log(`\n\tIncorrect usage. Allowed commands: 'deploy', 'update'.\n`);
        return;
    }

    const command = arg.trim().toLowerCase();

    switch (command) {
        case 'deploy':
            deploy();
            break;
        case 'update':
            update();
            break;
        default:
            console.log(`\n\tCommand '${command}' is unknown. Allowed commands: deploy, update.\n`);
    }
}
// #endregion module



// #region exports
module.exports = cli;
// #endregion exports
