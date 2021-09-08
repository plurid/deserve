const path = require('path');

const postcss = require('rollup-plugin-postcss');
const url = require('@rollup/plugin-url');
const json = require('@rollup/plugin-json');
const typescript = require('rollup-plugin-typescript2');
const depsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');
const sourceMaps = require('rollup-plugin-sourcemaps');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const { terser } = require('rollup-plugin-terser');


const {
    BUILD_DIRECTORY,
    ASSETS_DIRECTORY,

    isProduction,
} = require ('./shared');



const input = 'source/server/index.ts';

const output = [
    {
        file: `./${BUILD_DIRECTORY}/index.js`,
        format: 'cjs',
        exports: 'named',
    },
];


const external = [
    '@apollo/client',
    '@plurid/dataface-mongo',
    '@plurid/delog',
    '@plurid/deon',
    '@plurid/elementql',
    '@plurid/elementql-client-react',
    '@plurid/fileface-minio',
    '@plurid/plurid-data',
    '@plurid/plurid-engine',
    '@plurid/plurid-functions',
    '@plurid/plurid-functions-react',
    '@plurid/plurid-icons-react',
    '@plurid/plurid-pubsub',
    '@plurid/plurid-react',
    '@plurid/plurid-react-server',
    '@plurid/plurid-themes',
    '@plurid/plurid-ui-components-react',
    '@plurid/plurid-ui-state-react',
    '@rollup/plugin-commonjs',
    '@rollup/plugin-node-resolve',
    'apollo-server-express',
    'apollo-server-core',
    'axios',
    'bcrypt',
    'body-parser',
    'cookie-parser',
    'cross-fetch',
    'dotenv',
    'graphql',
    'graphql-tag',
    'hammerjs',
    'js-yaml',
    'jsonwebtoken',
    'lodash.merge',
    'minio',
    'mongodb',
    'multer',
    'ncp',
    'react',
    'react-dom',
    'react-helmet-async',
    'react-redux',
    'redux',
    'redux-thunk',
    'styled-components',
    'subscriptions-transport-ws',
];


const styledComponentsTransformer = createStyledComponentsTransformer({
    ssr: true,
    displayName: !isProduction,
});


const plugins = {
    postcss: () => postcss(),
    url: () => url({
        include: [
            '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg',  '**/*.gif',
            '**/*.woff', '**/*.ttf', '**/*.otf', '**/*.eof',
            '**/*.wav', '**/*.mp3',
            '**/*.pdf',
            '**/*.mov', '**/*.mp4',
        ],
        limit: 0,
        emitFiles: true,
        fileName: `client/${ASSETS_DIRECTORY}/[name][extname]`,
        sourceDir: path.join(__dirname, 'source'),
    }),
    json: () => json(),
    typescript: () => typescript({
        tsconfig: './tsconfig.json',
        transformers: [
            () => ({
                before: [styledComponentsTransformer],
            }),
        ],
    }),
    depsExternal: () => depsExternal({
        includeDependencies: true,
    }),
    resolve: () => resolve({
        preferBuiltins: true,
    }),
    commonjs: () => commonjs(),
    sourceMaps: () => sourceMaps(),
    terser: () => terser({
        mangle: false,
        compress: false,
        format: {
            beautify: true,
            comments: false,
        },
    }),
};


module.exports = {
    input,
    output,
    external,
    plugins,
};
