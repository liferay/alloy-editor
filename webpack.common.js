/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

const path = require('path');

/**
 * Turns a root-relative path into an absolute one.
 *
 * This ensures that webpack works identically when invoked from the
 * top-level (eg. with `yarn webpack` or from a subdirectory (eg.
 * from a file under `scripts/gulp`).
 */
function toAbsolute(rootRelativePath) {
	return path.join(__dirname, rootRelativePath);
}

/**
 * For windows compatibility, we need to use windows path separators for webpack
 * "test" properties.
 */
function toTestRegExp(file) {
	return new RegExp(path.normalize(file).replace(/\\/g, '\\\\'));
}

const base = {
	/**
	 * https://webpack.js.org/configuration/entry-context/
	 */
	context: toAbsolute('.'),

	/**
	 * https://webpack.js.org/configuration/module/
	 */
	module: {
		rules: [
			{
				include: toAbsolute('./src'),
				loader: 'babel-loader',
				test: /\.(js|jsx)$/,
			},
			{
				test: toTestRegExp('scripts/build/version.js'),
				use: {
					loader: 'val-loader',
				},
			},
		],
	},
};

module.exports = {
	config: {
		...base,
		entry: './scripts/build/with-all.js',
		output: {
			path: toAbsolute('./dist/alloy-editor'),
		},
	},
	core: {
		...base,
		entry: './src/adapter/main.js',
		externals: {
			react: {
				amd: 'react',
				commonjs: 'react',
				commonjs2: 'react',
				root: 'React',
				umd: 'react',
			},
			'react-dom': {
				amd: 'react-dom',
				commonjs: 'react-dom',
				commonjs2: 'react-dom',
				root: 'ReactDOM',
				umd: 'react-dom',
			},
		},
		output: {
			library: 'AlloyEditor',
			libraryTarget: 'window',
			path: toAbsolute('./dist/alloy-editor'),
		},
	},
	noCkeditor: {
		...base,
		entry: './scripts/build/with-react.js',
		output: {
			libraryTarget: 'window',
			path: toAbsolute('./dist/alloy-editor'),
		},
	},
	noReact: {
		...base,
		entry: './scripts/build/with-ckeditor.js',
		externals: {
			react: {
				amd: 'react',
				commonjs: 'react',
				commonjs2: 'react',
				root: 'React',
				umd: 'react',
			},
			'react-dom': {
				amd: 'react-dom',
				commonjs: 'react-dom',
				commonjs2: 'react-dom',
				root: 'ReactDOM',
				umd: 'react-dom',
			},
		},
		output: {
			libraryTarget: 'umd',
			path: toAbsolute('./dist/alloy-editor'),
		},
	},
};
