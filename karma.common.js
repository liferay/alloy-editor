'use strict';

const argv = require('yargs').argv;
const path = require('path');
const srcFiles = require('./test/ui/_src');
const alloyEditorDir = 'dist/alloy-editor/';

const preprocessors = {
	'test/**/*.html': ['html2js'],
	'src/**/*.js*': ['webpack'],
	'test/**/*.js*': ['webpack'],
	'scripts/test/loader-alloy-editor.js': ['webpack'],
};

const DEBUG = argv.debug || argv.d;

if (!DEBUG) {
	preprocessors[path.join(alloyEditorDir, 'src/**/*.js')] = ['coverage'];
}

const filesToLoad = [
	/* AlloyEditor skins */
	path.join(alloyEditorDir, 'assets/alloy-editor-ocean.css'),

	'test/vendor/happen.js',

	/* CKEditor JS files */
	path.join(alloyEditorDir, 'ckeditor.js'),
	path.join(alloyEditorDir, 'styles.js'),
	path.join(alloyEditorDir, 'config.js'),
	path.join(alloyEditorDir, 'skins/moono/*.css'),
	path.join(alloyEditorDir, 'lang/*.js'),
	'test/ui/test/plugins/test_*/plugin.js',

	/* bender requires CKEDITOR, should be after ckeditor.js */
	'scripts/test/bender.js',

	'scripts/test/loader-alloy-editor.js',
	'scripts/test/utils-alloy-editor.js',
	'scripts/test/utils-ckeditor.js',

	/* Fixtures */
	'test/core/test/fixtures/**/*',
	'test/ui/test/fixtures/**/*',
];

srcFiles.forEach(function(file) {
	filesToLoad.push(path.join('src/', file));
});

filesToLoad.push('test/core/test/*.js*');
filesToLoad.push('test/plugins/test/*.js*');
filesToLoad.push('test/ui/test/*.js*');
filesToLoad.push('src/__generated__/lang/en.js');

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
