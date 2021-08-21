// #region imports
    // #region libraries
    import commonjs from '@rollup/plugin-commonjs';
    import { nodeResolve } from '@rollup/plugin-node-resolve';
    import ttypescript from 'ttypescript';
    import typescript from 'rollup-plugin-typescript2';
    import { terser } from 'rollup-plugin-terser';
    // #endregion libraries
// #endregion imports



// #region module
const common = {
    external: [],
    plugins: [
        commonjs(),
        nodeResolve(),
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


const cli = {
    input: 'source/cli.ts',
    output: [
        {
            file: './distribution/cli.js',
            format: 'cjs',
        },
    ],
    ...common,
};


const hooks = {
    input: 'source/hooks.ts',
    output: [
        {
            file: './distribution/hooks.js',
            format: 'cjs',
        },
    ],
    ...common,
};


const views = {
    input: 'source/views.ts',
    output: [
        {
            file: './distribution/views.js',
            format: 'cjs',
        },
    ],
    ...common,
};
// #endregion module



// #region exports
export default [
    cli,
    hooks,
    views,
];
// #endregion exports
