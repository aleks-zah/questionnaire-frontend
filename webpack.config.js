const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
            },
            {
                test: /\.woff$/,
                use: [
                    {
                        loader: 'url-loader?limit=10000',
                    },
                ],
            },
            {
                test: /\.woff2$/,
                use: [
                    {
                        loader: 'url-loader?limit=10000',
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'url-loader?limit=10000',
                    },
                ],
            },
            {
                test: /\.eot$/,
                use: [
                    {
                        loader: 'file-loader?limit=10000',
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '\"production\"',
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new OfflinePlugin({
            caches: {
                main: [
                    'bundle.js',
                    'styles.css',
                    'index.html',
                ],
                optional: [
                    ':rest:',
                ],
                additional: [':externals:'],
            },
            cacheMaps: [
                {
                    match: /.*/,
                    to: '/',
                    requestTypes: ['navigate'],
                },
            ],
        }),
    ],
};
