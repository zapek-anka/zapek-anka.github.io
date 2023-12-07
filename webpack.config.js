const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const cssExtract = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][ext]'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(s*)css$/,
                use: [
                    cssExtract.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|eot|ttf|woff)$/,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                type: 'asset/resource',
                generator: {
                    filename: path.join('icons', '[name][ext]'),
                },
            }
        ]
    },
    plugins: [
        new cssExtract({
            filename: 'style.css',
        }),
        new HtmlWebpackPlugin({
            inject: false,
            template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/img'),
                    to: path.resolve(__dirname, 'dist/img')
                },
                {
                    from: path.resolve(__dirname, 'src/img/catalog'),
                    to: path.resolve(__dirname, 'dist/img/catalog')
                },
                {
                    from: path.resolve(__dirname, 'src/img/list-icons'),
                    to: path.resolve(__dirname, 'dist/img/list-icons')
                },
            ]
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
};