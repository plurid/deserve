const path = require('path');



/** CONSTANTS */
const BUILD_DIRECTORY = process.env.PLURID_BUILD_DIRECTORY || 'build';

const entryIndex = path.resolve(__dirname, '../../source/index.ts');
const outputPath = path.resolve(__dirname, `../../${BUILD_DIRECTORY}/`);



module.exports = {
    entry: {
        index: entryIndex,
    },

    output: {
        filename: '[name].js',
        path: outputPath,
    },

    module: {
        rules: [
            {
                exclude: [ path.resolve(__dirname, 'node_modules') ],
                test: /\.ts$/,
                use: 'ts-loader',
            },
        ],
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
    },

    target: 'node',
};
