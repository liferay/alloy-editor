/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

'use strict';

const karmaSauceLauncher = require('karma-sauce-launcher');

const Common = require('./karma.common');
let sauceLabsAccessKey = process.env.SAUCE_ACCESS_KEY_ENC;

if (sauceLabsAccessKey) {
	sauceLabsAccessKey = new Buffer(sauceLabsAccessKey, 'base64').toString(
		'binary'
	);
}

var customLaunchers = {
	sl_chrome_linux: {
		base: 'SauceLabs',
		browserName: 'chrome',
	},
	sl_edge_22: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: 'latest',
	},
	sl_firefox: {
		base: 'SauceLabs',
		browserName: 'firefox',
	},
	sl_ie_11: {
		base: 'SauceLabs',
		browserName: 'internet explorer',
		platform: 'Windows 10',
		version: '11',
	},
};

const defaultConfig = Object.assign(Common, {
	browserDisconnectTimeout: 10000,
	browserDisconnectTolerance: 2,
	browserNoActivityTimeout: 240000,

	browsers: Object.keys(customLaunchers),

	captureTimeout: 240000,
	customLaunchers,

	plugins: [
		'karma-babel-preprocessor',
		'karma-html2js-preprocessor',
		'karma-chai',
		'karma-fixture',
		'karma-mocha',
		'karma-sinon',
		'karma-webpack',
		karmaSauceLauncher,
	],

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter

	reporters: ['progress', 'saucelabs'],

	// soucelabs specific configuration

	sauceLabs: {
		accessKey: sauceLabsAccessKey,
		connectOptions: {
			logfile: 'sauce_connect.log',
			'no-ssl-bump-domains': 'all',
			port: 5757,
		},
		recordScreenshots: false,
		recordVideo: false,
		startConnect: true,
		testName: 'AlloyEditor tests',
	},
});

module.exports = function(config) {
	config.set(defaultConfig);
};
