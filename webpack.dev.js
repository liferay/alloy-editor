const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const config = {
	mode: 'development',
	devtool: 'inline-source-map',
};

const All = merge(common.config, config, {
	output: {
		filename: 'alloy-editor-all.js',
	},
	devServer: {
		contentBase: './dist',
		port: 9000,
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
