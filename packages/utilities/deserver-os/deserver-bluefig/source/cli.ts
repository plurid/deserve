// #region module
const cli = () => {
    const arg = process.argv[2];
    if (!arg) {
        console.log(`\n\tIncorrect usage. Allowed commands: 'deploy', 'update'.\n`);
        return;
    }

    const command = arg.trim().toLowerCase();

    switch (command) {
        case 'deploy':
            console.log('\n\tDeploying deserver bluefig configuration.\n');
            break;
        case 'update':
            console.log('\n\tUpdating deserver bluefig configuration.\n');
            break;
        default:
            console.log(`\n\tCommand '${command}' is unknown. Allowed commands: deploy, update.\n`);
    }
}
// #endregion module



// #region exports
module.exports = cli;
// #endregion exports
