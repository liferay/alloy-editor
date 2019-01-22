'use strict';

const Common = require('./karma.common');
const karmaSauceLauncher = require('karma-sauce-launcher');
const sauceLabsAccessKey = process.env.SAUCE_ACCESS_KEY_ENC;

if (sauceLabsAccessKey) {
	sauceLabsAccessKey = new Buffer(sauceLabsAccessKey, 'base64').toString(
		'binary'
	);
}

var customLaunchers = {
	sl_chrome_mac_10_13: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'macOS 10.13'
	},
	sl_chrome_linux: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'Linux'
	},
	sl_chrome_windows: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'Windows 10'
	},
	sl_firefox: {
		base: 'SauceLabs',
		browserName: 'firefox'
	},
	sl_ie_11: {
		base: 'SauceLabs',
		browserName: 'internet explorer',
		platform: 'Windows 10',
		version: '11'
	},
	sl_edge_latest: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: 'latest'
	}
};

const defaultConfig = Object.assign(Common, {
	browsers: Object.keys(customLaunchers),

	browserDisconnectTimeout: 10000,
	browserDisconnectTolerance: 2,
	browserNoActivityTimeout: 240000,

	captureTimeout: 240000,
	customLaunchers: customLaunchers,

	plugins: [
		'karma-babel-preprocessor',
		'karma-coverage',
		'karma-html2js-preprocessor',
		'karma-chai',
		'karma-fixture',
		'karma-mocha',
		'karma-sinon',
		'karma-webpack',
		karmaSauceLauncher
	],

	// test results reporter to use
	// possible values: 'dots', 'progress'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter
	// reporters: ['progress', 'saucelabs'],
	reporters: ['verbose', 'saucelabs'],

	// soucelabs specific configuration
	sauceLabs: {
		accessKey: sauceLabsAccessKey,
		testName: 'AlloyEditor tests',
		recordVideo: false,
		recordScreenshots: false,
		startConnect: true,
		connectOptions: {
			port: 5757,
			logfile: 'sauce_connect.log'
		}
	}
});

module.exports = function(config) {
	config.set(defaultConfig);
};
