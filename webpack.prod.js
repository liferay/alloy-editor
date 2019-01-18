const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				output: {
					comments: false
				}
			}
		})
	]
};

const All = merge(common.config, config, {
	output: {
		filename: 'alloy-editor-all-min.js'
	}
});

const Core = merge(common.core, config, {
	output: {
		filename: 'alloy-editor-core-min.js'
	}
});

const NoCKEditor = merge(common.noCkeditor, config, {
	output: {
		filename: 'alloy-editor-no-ckeditor-min.js'
	}
});

const NoReact = merge(common.noReact, config, {
	output: {
		filename: 'alloy-editor-no-react-min.js'
	}
});

module.exports = [All, Core, NoCKEditor, NoReact];
