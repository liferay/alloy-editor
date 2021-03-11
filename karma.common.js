/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

'use strict';

const {argv} = require('yargs');

const preprocessors = {
	'src/**/*.js*': ['webpack'],
	'test/(core|plugins|ui)/**/*.js*': ['webpack'],
	'test/**/*.html': ['html2js'],
	'test/*.js': ['webpack'],
	'test/lib/*.js': ['webpack'],
};

const DEBUG = argv.debug || argv.d;

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
	// enable / disable watching file and executing tests whenever any file changes

	autoWatch: false,

	// base path that will be used to resolve all patterns (eg. files, exclude)

	basePath: './',

	browsers: ['Chrome'],

	// enable / disable colors in the output (reporters and logs)

	colors: true,

	// list of files to exclude

	exclude: [],

	// list of files / patterns to load in the browser

	files: filesToLoad,

	// frameworks to use
	// available frameworks: https://npmjs.org/browse/keyword/karma-adapter

	frameworks: ['chai', 'fixture', 'mocha', 'sinon'],

	// level of logging
	// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG

	logLevel: DEBUG ? 'debug' : 'info',

	// web server port

	port: 9876,

	// preprocess matching files before serving them to the browser
	// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

	preprocessors,

	singleRun: !DEBUG,

	webpack: {
		// Beware! Don't set devtool to 'eval' or similar because it will
		// cause modules to be executed as many times as they are required
		// instead of once only, breaking everything.

		devtool: false,

		mode: 'development',

		module: {
			rules: [
				{
					exclude: /(node_modules)/,
					test: /\.(js|jsx)$/,
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
};
