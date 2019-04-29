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
				test: /\.(js|jsx)$/,
				include: toAbsolute('./src'),
				loader: 'babel-loader',
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
		output: {
			library: 'AlloyEditor',
			libraryTarget: 'window',
			path: toAbsolute('./dist/alloy-editor'),
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
				umd: 'react',
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
				umd: 'react-dom',
			},
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
		output: {
			libraryTarget: 'umd',
			path: toAbsolute('./dist/alloy-editor'),
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
				umd: 'react',
			},
			'react-dom': {
				root: 'ReactDOM',
				commonjs2: 'react-dom',
				commonjs: 'react-dom',
				amd: 'react-dom',
				umd: 'react-dom',
			},
		},
	},
};
