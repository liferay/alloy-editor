'use strict';

const Common = require('./karma.common');
const karmaSauceLauncher = require('karma-sauce-launcher');
const sauceLabsAccessKey = process.env.SAUCE_ACCESS_KEY_ENC;

if (sauceLabsAccessKey) {
    sauceLabsAccessKey = new Buffer(sauceLabsAccessKey, 'base64').toString('binary');
}

var customLaunchers = {
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome'
    },
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    sl_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },
    sl_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
    },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    sl_edge_20: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '13'
    },
    sl_edge_21: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '14'
    },
    sl_edge_22: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '15'
    }
};

const defaultConfig = Object.assign(
    Common,
    {
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
        reporters: ['progress', 'saucelabs'],

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
    }
);

module.exports = function(config) {
    config.set(defaultConfig);
};
