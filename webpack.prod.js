const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const TerserJsPlugin = require('terser-webpack-plugin');

const config = {
	mode: 'production',
	devtool: 'source-map',

	/**
	 * https://webpack.js.org/configuration/optimization/
	 */
	optimization: {
		minimizer: [
			new TerserJsPlugin({
				cache: true,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					compress: {
						// Small gains, turned off to speed things up.
						arrows: false,
						collapse_vars: false,
						comparisons: false,
						computed_props: false,
						hoist_funs: false,
						hoist_props: false,
						hoist_vars: false,
						inline: false,
						loops: false,
						negate_iife: false,
						properties: false,
						reduce_funcs: false,
						reduce_vars: false,
						switches: false,
						toplevel: false,
						typeofs: false,
					},
					output: {
						comments: false,
					},
				},
			}),
		],
	},
};

const All = merge(common.config, config, {
	output: {
		filename: 'alloy-editor-all-min.js',
	},
});

const Core = merge(common.core, config, {
	output: {
		filename: 'alloy-editor-core-min.js',
	},
});

const NoCKEditor = merge(common.noCkeditor, config, {
	output: {
		filename: 'alloy-editor-no-ckeditor-min.js',
	},
});

const NoReact = merge(common.noReact, config, {
	output: {
		filename: 'alloy-editor-no-react-min.js',
	},
});

module.exports = [All, Core, NoCKEditor, NoReact];
