'use strict';

const argv = require('yargs').argv;
const alloyEditorDir = 'dist/alloy-editor/';

const preprocessors = {
	'test/**/*.html': ['html2js'],
	'src/**/*.js*': ['webpack'],
	'test/*.js': ['webpack'],
	'test/lib/*.js': ['webpack'],
	'test/(core|plugins|ui)/**/*.js*': ['webpack'],
};

const DEBUG = argv.debug || argv.d;

if (!DEBUG) {
	preprocessors['dist/alloy-editor/src/**/*.js'] = ['coverage'];
}

const CKEDITOR_DIR = DEBUG ? 'lib/ckeditor-debug' : 'dist/alloy-editor';

const filesToLoad = [
	/* AlloyEditor skins */
	'dist/alloy-editor/assets/alloy-editor-ocean.css',

	/* CKEditor files */
	`${CKEDITOR_DIR}/ckeditor.js`,
	`${CKEDITOR_DIR}/styles.js`,
	`${CKEDITOR_DIR}/config.js`,
	`${CKEDITOR_DIR}/lang/*.js`,
	`${CKEDITOR_DIR}/skins/moono/*.css`,

	'test/ui/test/plugins/test_*/plugin.js',

	/* bender requires CKEDITOR, should be after ckeditor.js */
	'test/lib/vendor/bender.js',
	'test/lib/vendor/happen.js',

	/* Fixtures */
	'test/core/test/fixtures/**/*',
	'test/ui/test/fixtures/**/*',

	/* Main test bundle. */
	'test/index.js',
];

module.exports = {
	// base path that will be used to resolve all patterns (eg. files, exclude)
	basePath: './',

	browsers: ['Chrome'],

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
	frameworks: ['chai', 'fixture', 'mocha', 'sinon'],

	// list of files / patterns to load in the browser
	files: filesToLoad,

	// list of files to exclude
	exclude: [],

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
	preprocessors: preprocessors,

	webpack: {
		mode: 'development',

		// Beware! Don't set devtool to 'eval' or similar because it will
		// cause modules to be executed as many times as they are required
		// instead of once only, breaking everything.
		devtool: false,

		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules)/,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					test: /test\/index\.js$/,
					use: {
						loader: 'val-loader',
					},
				},
			],
		},
	},

	webpackMiddleware: {
		logLevel: 'error',
		stats: 'errors-only',
	},

	// web server port
	port: 9876,

	// enable / disable colors in the output (reporters and logs)
	colors: true,

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
	logLevel: DEBUG ? 'debug' : 'info',

	// enable / disable watching file and executing tests whenever any file changes
	autoWatch: false,

	singleRun: !DEBUG,
};
