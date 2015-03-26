// Karma configuration

'use strict';

var alloyEditorDir = 'dist/alloy-editor-*/alloy-editor/';

var path = require('path');
var srcFiles = require('./_src.js');

var preprocessors = {
    '**/*.jsx': ['react-jsx'],
    '**/*.html': ['html2js']
};

preprocessors[path.join(alloyEditorDir, 'test/**/*.js')] = ['coverage'];

var filesToLoad = [
    /* Fixtures */
    {
        pattern: 'src/ui/react/test/fixtures/**/*'
    },

    /* AlloyEditor skins */
    {
        pattern: path.join(alloyEditorDir, 'assets/alloy-editor-ocean.css'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'assets/fonts/alloyeditor.woff'),
        included: false,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'assets/fonts/alloyeditor.ttf'),
        included: false,
        watched: false
    },

    'src/ui/react/test/vendor/zepto.js',

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
    'src/ui/react/test/util/bender.js',

    'src/ui/react/test/util/utils.js',

    /* ReactJS */
    {
        pattern: path.join(alloyEditorDir, 'react-with-addons.js'),
        included: true,
        watched: false
    },

    /* File which defines the global namespace */
    {
        pattern: 'src/ui/react/test/util/global.js',
        included: true,
        watched: false
    }
];

srcFiles.forEach(function(file) {
    filesToLoad.push({
        pattern: path.join(alloyEditorDir, 'test', file),
        included: true,
        watched: false
    });
});

filesToLoad.push({
    pattern: 'src/ui/react/test/*.js*',
    included: true,
    watched: false
});

var defaultConfig = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    browsers: ['Chrome', 'Firefox', 'IE9 - Win7', 'IE10 - Win7', 'IE11 - Win7'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha', 'sinon', 'fixture'],

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