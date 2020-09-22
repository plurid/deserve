const path = require('path');

const typescript = require('rollup-plugin-typescript2');
const external = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');



const BUILD_DIRECTORY = process.env.PLURID_BUILD_DIRECTORY || 'build';

const isProduction = process.env.ENV_MODE === 'production';

const input = './source/index.ts';

const output = [
    {
        file: `./${BUILD_DIRECTORY}/index.js`,
        format: 'cjs',
        exports: 'named',
    },
];

const externalPackages = [
    'http',
    'net',
    'tty',
    'fs',
    'util',
    'events',
    'os',
];



const plugins = {
    external: () => external({
        includeDependencies: true,
    }),
    resolve: () => resolve({
        preferBuiltins: true,
    }),
    commonjs: () => commonjs(),
    typescript: () => typescript({
        tsconfig: './tsconfig.json',
    }),
    sourceMaps: () => sourceMaps(),
};


module.exports = {
    input,
    output,
    plugins,
    externalPackages,
};
