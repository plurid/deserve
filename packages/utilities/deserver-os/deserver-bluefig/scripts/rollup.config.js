// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import { nodeResolve } from '@rollup/plugin-node-resolve';
    import json from '@rollup/plugin-json';
    import ttypescript from 'ttypescript';
    import typescript from 'rollup-plugin-typescript2';
    import { terser } from 'rollup-plugin-terser';
    // #endregion libraries
// #endregion imports



// #region module
const common = {
    external: [
        '@plurid/delog',
        '@plurid/deon',
        '@plurid/plurid-functions',
        'bcrypt',
        'chokidar',
        'node-wifi',
    ],
    plugins: [
        commonjs(),
        nodeResolve({
            preferBuiltins: true,
        }),
        json(),
        typescript({
            typescript: ttypescript,
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        terser({
            mangle: false,
            compress: false,
            format: {
                beautify: true,
                comments: false,
            },
        }),
    ],
};


const factory = (
    name,
) => ({
    input: `source/${name}.ts`,
    output: [
        {
            file: `distribution/${name}.js`,
            format: 'cjs',
        },
    ],
    ...common,
});


const cli = factory('cli');
const hooks = factory('hooks');
const views = factory('views');
// #endregion module



// #region exports
export default [
    cli,
    hooks,
    views,
];
// #endregion exports
