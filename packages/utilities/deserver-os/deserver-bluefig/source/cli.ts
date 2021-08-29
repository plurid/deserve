// #region imports
    // #region libraries
    import os from 'os';
    import path from 'path';
    import fs from 'fs';
    import {
        execSync,
    } from 'child_process';
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
    const bluefigExists = fs.existsSync(
        bluefigDirectory,
    );
    if (!bluefigExists) {
        fs.mkdirSync(bluefigDirectory);
    }

    for (const file of files) {
        await fs.promises.copyFile(
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

    const command = 'npm update -g @plurid/deserver-bluefig';
    execSync(
        command,
    );

    deploy();
}


const version = () => {
    const VERSION = `0.0.0-0`;

    console.log(`\n\tdeserver bluefig version ${VERSION}\n`);
}


const help = (
    command: string,
) => {
    console.log(`\n\tCommand '${command}' is unknown. Allowed commands: deploy, update, version, help.\n`);
}



const cli = () => {
    try {
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
            case 'version':
                version();
                break;
            case 'help':
                help(command);
                break;
            default:
                help(command);
        }
    } catch (error) {
        console.log('Something went wrong', error);
    }
}
// #endregion module



// #region exports
module.exports = cli;
// #endregion exports
