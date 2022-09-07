import ttypescript from 'ttypescript';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

import pkg from '../package.json';



export default {
    input: 'source/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: 'es',
            exports: 'named',
            sourcemap: true,
        },
    ],
    external: [
        'http',
        'path',
        'net',
        'events',

        '@plurid/delog',
        '@plurid/plurid-functions',
        'body-parser',
        'cookie-parser',
        'cors',
        'express',
        'pump',
    ],
    plugins: [
        typescript({
            typescript: ttypescript,
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
