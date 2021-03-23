const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const browserConfig = {
	mode: 'production',
	entry: './src/browser/index.jsx',
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'},
			{test: /\.(css|scss)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin({
			// Define global variable to differentiate SSR from client side rendering.
			__isBrowser__: 'true',
		}),
		new CopyPlugin({
			patterns: [
				// Copies specified files to the dist folder.
				{from: 'src/assets', to: 'assets'},
			],
		}),
	],
};

const serverConfig = {
	mode: 'production',
	entry: './src/server/index.js',
	target: 'node',
	externals: [nodeExternals()],
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js',
	},
	module: {
		rules: [
			{test: /\.(js|jsx)$/, use: 'babel-loader'},
			{test: /\.(css|scss)$/, use: ['ignore-loader']},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			// Define global variable to differentiate SSR from client side rendering.
			__isBrowser__: 'false',
		}),
	],
};

module.exports = [browserConfig, serverConfig];
