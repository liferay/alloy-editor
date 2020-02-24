/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const merge = require('webpack-merge');

const common = require('./webpack.common');

const config = {
	devtool: 'inline-source-map',
	mode: 'development',
};

const All = merge(common.config, config, {
	devServer: {
		contentBase: './dist',
		host: '0.0.0.0',
		port: 9000,
		publicPath: '/alloy-editor',
	},
	output: {
		filename: 'alloy-editor-all.js',
	},
});

const Core = merge(common.core, config, {
	output: {
		filename: 'alloy-editor-core.js',
	},
});

const NoCKEditor = merge(common.noCkeditor, config, {
	output: {
		filename: 'alloy-editor-no-ckeditor.js',
	},
});

const NoReact = merge(common.noReact, config, {
	output: {
		filename: 'alloy-editor-no-react.js',
	},
});

module.exports = [All, Core, NoCKEditor, NoReact];
