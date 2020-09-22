const path = require('path');

const {
    existsSync,
} = require('fs');

const {
    execSync,
} = require('child_process');



const command = process.argv[2];


/** ENVIRONMENT */
const environment = {
    production: command.includes('production'),
    development: command.includes('development'),
    local: !command.includes('development') && !command.includes('production'),
};

require('dotenv').config({
    path: environment.production
        ? './environment/.env.production'
        : environment.development
            ? './environment/.env.development'
            : './environment/.env.local',
});



/** CONSTANTS */
const BUILD_DIRECTORY = process.env.PLURID_BUILD_DIRECTORY || 'build';

const buildFolder = path.join(process.cwd(), BUILD_DIRECTORY);
const verbose = process.env.PLURID_DEFAULT_VERBOSE === 'true' && !process.argv[3]
    ? 'inherit'
    : process.argv[3] === 'verbose'
        ? 'inherit'
        : 'ignore';



/** FUNCTIONS */
const runCommand = (
    command,
    options = {
        stdio: 'ignore'
    },
) => {
    try {
        for (const subCommand of command) {
            execSync(
                subCommand,
                {
                    stdio: options.stdio,
                },
            );
        }
    } catch (error) {
        if (verbose === 'inherit') {
            console.log(error);
        }
    }
}

/**
 * Windows (win32) requires full path to the bin command.
 *
 * @param {string} command
 */
const crossCommand = (
    command,
) => {
    if (process.platform === 'win32') {
        return path.join(process.cwd(), 'node_modules/.bin/', command + '.cmd');
    }

    return 'node_modules/.bin/' + command;
}



/** COMMANDS */
const rollupWatch = `${crossCommand('rollup')} --watch --config ./scripts/workings/development.js`;
const nodemonWatch = `${crossCommand('nodemon')} --watch ${path.join(buildFolder, '/index.js')} ${buildFolder}`;

const commandStart = [
    `node ${buildFolder}`,
];

const commandStartLocal = [
    nodemonWatch,
];

const commandWatch = [
    `PLURID_WATCH_MODE=true concurrently \"${rollupWatch}\" \"${nodemonWatch}\"`,
];


const commandClean = [
    `${crossCommand('rimraf')} ${buildFolder}`,
];

const commandLint = [
    `${crossCommand('eslint')} -c ./configurations/.eslintrc.js ./source/index.ts`,
];

const commandTest = [
    `${crossCommand('jest')} -c ./configurations/jest.config.js ./source`,
];


const commandBuildDevelopment = [
    ...commandClean,
    `${crossCommand('rollup')} --config ./scripts/workings/development.js`,
];
const commandBuildProduction = [
    ...commandClean,
    ...commandLint,
    ...commandTest,
    `${crossCommand('rollup')} --config ./scripts/workings/production.js`,
];



/** COMMAND HANDLER */
switch (command) {
    case 'start':
        console.log('\n\tStarting the Server...');
        runCommand(commandStart, {
            stdio: 'inherit',
        });
        break;
    case 'start.local':
        console.log('\n\tRunning the Local Server...');
        runCommand(commandStartLocal, {
            stdio: verbose,
        });
        break;
    case 'watch':
        console.log('\n\tRunning the Watching Process...');
        runCommand(commandWatch, {
            stdio: verbose,
        });
        break;
    case 'clean':
        runCommand(commandClean, {
            stdio: verbose,
        });
        break;
    case 'lint':
        runCommand(commandLint, {
            stdio: verbose,
        });
        break;
    case 'test':
        runCommand(commandTest, {
            stdio: verbose,
        });
        break;
    case 'build.local':
        console.log('\n\tStarting the Local Build Process...');
        runCommand(commandBuildDevelopment, {
            stdio: verbose,
        });
        console.log('\n\tFinished the Local Build Process.\n');
        break;
    case 'build.development':
        console.log('\n\tStarting the Development Build Process...');
        runCommand(commandBuildDevelopment, {
            stdio: verbose,
        });
        console.log('\n\tFinished the Development Build Process.\n');
        break;
    case 'build.production':
        console.log('\n\tStarting the Production Build Process...');
        runCommand(commandBuildProduction, {
            stdio: verbose,
        });
        console.log('\n\tFinished the Production Build Process.\n');
        break;
}
