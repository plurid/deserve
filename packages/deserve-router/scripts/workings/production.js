const {
    input,
    output,
    plugins,
    externalPackages,
} = require('./common');



export default {
    input,
    output,
    external: externalPackages,
    plugins: [
        plugins.external(),
        plugins.resolve(),
        plugins.commonjs(),
        plugins.sourceMaps(),
        plugins.typescript(),
    ],
};
