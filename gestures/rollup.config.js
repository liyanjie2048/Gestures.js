const typescript = require('@rollup/plugin-typescript');

exports.default = {
    input: "./src/index.ts",
    output: {
        file: "./bundles/liyanjie.gestures.umd.js",
        name: "liyanjie.gestures",
        format: "umd",
    },
    plugins: [typescript()]
};
