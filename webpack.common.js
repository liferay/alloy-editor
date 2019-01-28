const path = require('path');

/**
 * Turns a root-relative path into an absolute one.
 *
 * This ensures that webpack works identically when invoked from the
 * top-level (eg. with `npm run webpack` or from a subdirectory (eg.
 * from a file under `scripts/gulp`).
 */
function toAbsolute(rootRelativePath) {
	return path.join(__dirname, rootRelativePath);
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
		],
	},
};

module.exports = {
	config: {
		...base,
		entry: './scripts/build/index.js',
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
		entry: './src/adapter/main.js',
		output: {
			library: 'AlloyEditor',
			libraryTarget: 'window',
			path: toAbsolute('./dist/alloy-editor'),
		},
	},
	noReact: {
		...base,
		entry: './scripts/build/index.js',
		output: {
			library: 'AlloyEditor',
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
