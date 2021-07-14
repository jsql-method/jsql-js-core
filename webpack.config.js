const {resolve} = require('path');
const webpack = require('webpack');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const config = {
    mode: 'production',
    entry: [
        './src/jscollator.ts',
        './src/jscollator-builder.ts',
        './src/jscollator-config.ts',
        './src/jscollator-error.ts',
        './src/jscollator-query.ts',
        './src/jscollator-transaction.ts',
        './src/jscollator-query-builder.ts',
        './src/jscollator-repository.ts'
    ],
    output: {
        path: __dirname + '/bundles/',
        filename: 'jscollator.js',
        library: 'jscollator',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [],
};

config.optimization = {
    minimizer: [
        new TerserWebpackPlugin(),
    ],
};

module.exports = config;
