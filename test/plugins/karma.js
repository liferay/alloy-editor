// Karma configuration

'use strict';

var alloyEditorDir = 'dist/alloy-editor/';

var argv = require('yargs').argv;
var path = require('path');

var coreSrcFiles = require('../core/_src.js');
var pluginsSrcFiles = require('./_src.js');

var preprocessors = {
    '**/*.html': ['html2js']
};

if (!(argv.debug || argv.d)) {
    preprocessors[path.join(alloyEditorDir, 'test/**/*.js')] = ['coverage'];
}

var filesToLoad = [
    'test/vendor/zepto.js',
    'test/vendor/happen.js',

    /* CKEditor JS files */
    {
        pattern: path.join(alloyEditorDir, 'ckeditor.js'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'styles.js'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'config.js'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'skins/moono/*.css'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'lang/*.js'),
        included: true,
        watched: false
    },

    /* bender requires CKEDITOR, should be after ckeditor.js */
    'test/util/bender.js',

    'test/util/utils.js'
];

coreSrcFiles.forEach(function(file) {
    filesToLoad.push({
        pattern: path.join(alloyEditorDir, 'test', file),
        included: true,
        watched: false
    });
});

pluginsSrcFiles.forEach(function(file) {
    filesToLoad.push({
        pattern: path.join(alloyEditorDir, 'test', file),
        included: true,
        watched: false
    });
});

filesToLoad.push({
    pattern: 'test/plugins/test/*.js*',
    included: true,
    watched: false
});

var defaultConfig = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',

    browsers: ['Chrome', 'Firefox', 'IE9 - Win7', 'IE10 - Win7', 'IE11 - Win7', 'MSEdge - Win10'],

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

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage', 'progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'info',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false
};

var customConfig = defaultConfig;

if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
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
        sl_edge: {
            base: 'SauceLabs',
            browserName: 'edge',
            platform: 'Windows 10',
            version: '14'
        }
    };

    var sauceConfig = {
        browsers: Object.keys(customLaunchers),

        browserDisconnectTimeout: 10000,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 240000,

        captureTimeout: 240000,
        customLaunchers: customLaunchers,

        reporters: ['coverage', 'junit', 'progress', 'saucelabs'],

        sauceLabs: {
            testName: 'AlloyEditor tests',
            recordScreenshots: false,
            startConnect: true,
            connectOptions: {
                port: 5757,
                logfile: 'sauce_connect.log'
            }
        }
    };

    Object.keys(sauceConfig).forEach(function(key) {
        customConfig[key] = sauceConfig[key];
    });
}

module.exports = function(config) {
    config.set(customConfig);
};
