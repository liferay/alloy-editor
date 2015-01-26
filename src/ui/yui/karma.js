// Karma configuration

'use strict';

var defaultConfig = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    browsers: ['Chrome', 'Firefox', 'IE9 - Win7', 'IE10 - Win7', 'IE11 - Win7'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon'],

    // list of files / patterns to load in the browser
    files: [{
            pattern: 'dist/alloy-editor-*/bootstrap.css',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/assets/alloy-editor-dark.css',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/assets/fonts/alloyeditor.woff',
            included: false,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/assets/fonts/alloyeditor.ttf',
            included: false,
            watched: false
        },

        'bower_components/node-assert/assert.js',
        'bower_components/assertive-chai/assertive-chai.js',

        'src/ui/yui/test/vendor/happen.js',
        'src/ui/yui/test/vendor/jquery-1.11.2.min.js',
        'http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js',

        {
            pattern: 'dist/alloy-editor-*/alloy-editor/ckeditor.js',
            included: true,
            watched: false
        },

        /* bender requires CKEDITOR, should be after ckeditor.js */
        'src/ui/yui/test/util/bender.js',

        {
            pattern: 'dist/alloy-editor-*/alloy-editor/styles.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/config.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/skins/moono/*.css',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/lang/*.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/yui-config.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/plugins/*.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/toolbars/*.js',
            included: true,
            watched: false
        }, {
            pattern: 'dist/alloy-editor-*/alloy-editor/buttons/*.js',
            included: true,
            watched: false
        },

        'src/ui/yui/test/*.js'
    ],


    // list of files to exclude
    exclude: [],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'dist/alloy-editor-*/alloy-editor/yui-config.js': ['coverage'],
        'dist/alloy-editor-*/alloy-editor/plugins/*.js': ['coverage'],
        'dist/alloy-editor-*/alloy-editor/toolbars/*.js': ['coverage'],
        'dist/alloy-editor-*/alloy-editor/buttons/*.js': ['coverage'],
    },

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
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
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
                'selenium-version': '2.41.0',
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