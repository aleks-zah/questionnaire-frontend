const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: [
        'babel-polyfill',
        require.resolve('react-dev-utils/webpackHotDevClient'),
        './src/index',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
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
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.woff$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.woff2$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                            mimetype: 'application/font-woff',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                            mimetype: 'application/octet-stream',
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.eot$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '\"development\"',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new ProgressBarPlugin({
            format: '  Build [:bar] ' + ':percent' + ' (:elapsed seconds)',
            clear: false,
        }),
    ],
};
