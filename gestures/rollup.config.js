const typescript = require('@rollup/plugin-typescript');

exports.default = {
    input: "./src/index.ts",
    output: {
        file: "./dist/liyanjie.gestures.js",
        name: "liyanjie.gestures",
        format: "umd",
        sourcemap: true
    },
    plugins: [typescript()]
};
