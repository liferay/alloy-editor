const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(
	common.config,
	{
		devServer: {
			contentBase: '.',
			port: 8080
		},
		devtool: 'inline-source-map',
		plugins: [
			new webpack.DefinePlugin(
				{
					'process.env': {
						NODE_ENV: '"development"'
					}
				}
			)
		]
	}
);