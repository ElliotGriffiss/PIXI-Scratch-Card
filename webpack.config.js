const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

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
        extensions: [".ts", ".tsx", ".js", ".mjs"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"]
        },
        conditionNames: ['import', 'node', 'default']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
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
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "src/assets",
                    to: "assets",
                    globOptions: {
                        ignore: [
                            '**/src/assets/fonts',
                        ]
                    }
                }
            ],
        }),
        // Make an index.html from the template
        new HtmlWebpackPlugin({
            template: 'src/index.ejs',
            hash: true,
            minify: false
        }),
        new ESLintPlugin()
    ]
};