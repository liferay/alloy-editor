const path = require('path');

const modules = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|lib)/,
			loader: "babel-loader",
		}
	]
};

module.exports = {
	config: {
		entry: './scripts/build/index.js',
		output: {
			path: path.resolve('dist/alloy-editor')
		},
		module: modules
	},
	core: {
		entry: './src/adapter/main.js',
		output: {
			library: 'AlloyEditor',
            libraryTarget: 'window',
			path: path.resolve('dist/alloy-editor')
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
				umd: 'react'
			},
			'react-dom': {
		        root: 'ReactDOM',
		        commonjs2: 'react-dom',
		        commonjs: 'react-dom',
		        amd: 'react-dom',
				umd: 'react-dom',
			}
		},
		module: modules
	},
	noCkeditor: {
		entry: './src/adapter/main.js',
		output: {
            library: 'AlloyEditor',
            libraryTarget: 'window',
			path: path.resolve('dist/alloy-editor')
		},
		module: modules
	},
	noReact: {
		entry: './scripts/build/index.js',
		output: {
			library: 'AlloyEditor',
			libraryTarget: 'umd',
			path: path.resolve('dist/alloy-editor')
		},
		externals: {
			react: {
				root: 'React',
				commonjs2: 'react',
				commonjs: 'react',
				amd: 'react',
				umd: 'react'
			},
			'react-dom': {
		        root: 'ReactDOM',
		        commonjs2: 'react-dom',
		        commonjs: 'react-dom',
		        amd: 'react-dom',
				umd: 'react-dom',
			}
		},
		module: modules
	}
};
