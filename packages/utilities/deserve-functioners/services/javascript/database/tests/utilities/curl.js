const {
    execSync,
} = require('child_process');



const curl = async (
    command,
) => {
    try {
        const commandText = [
            'curl',
            ...command,
        ].join(' ');
        const result = execSync(commandText).toString();

        return JSON.parse(result);
    } catch (error) {
        console.log('curl error', error);
        return;
    }
}



module.exports.default = curl;
