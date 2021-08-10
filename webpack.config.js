const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const distPath = path.resolve(__dirname, 'dist');
module.exports = (env, argv) => {
    return {
        experiments: {
            asyncWebAssembly: true,
        },
        devServer: {
            contentBase: distPath,
            compress: argv.mode === 'production',
            port: 8080,
        },
        entry: './bootstrap.js',
        output: {
            path: distPath,
            filename: 'app.js',
            webassemblyModuleFilename: 'app.wasm',
        },
        plugins: [
            new CopyWebpackPlugin({ patterns: [{ from: './static', to: distPath }] }),
            new WasmPackPlugin({
                crateDirectory: '.',
                extraArgs: '--no-typescript',
            })
        ],
        watch: argv.mode !== 'production',
    };
};