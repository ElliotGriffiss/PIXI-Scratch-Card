const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    devtool: "inline-source-map",
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        }
    },
    module: {
        rules: [
            // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.([cm]?ts|tsx)$/,
                loader: "ts-loader"
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'file-loader',
                options: {
                    esModule: false,
                    outputPath: 'assets/',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)/,
                use : [ 'file-loader' ]
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "src/assets", to: "assets"},
            ],
        }),
        // Make an index.html from the template
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            hash: true,
            minify: false
        })
    ]
};