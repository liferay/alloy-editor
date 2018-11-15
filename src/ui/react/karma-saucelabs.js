// Karma configuration

'use strict';

var alloyEditorDir = 'dist/alloy-editor/';
var karmaSauceLauncher = require('karma-sauce-launcher');

var argv = require('yargs').argv;
var path = require('path');

var srcFiles = require('./_src.js');
srcFiles = srcFiles.main.concat(srcFiles.ui);

var sauceLabsAccessKey = process.env.SAUCE_ACCESS_KEY_ENC;
if (sauceLabsAccessKey) {
    sauceLabsAccessKey = new Buffer(sauceLabsAccessKey, 'base64').toString('binary');
}

var preprocessors = {
    '**/*.jsx': ['babel'],
    '**/*.html': ['html2js']
};

if (!(argv.debug || argv.d)) {
    preprocessors[path.join(alloyEditorDir, 'test/**/*.js')] = ['coverage'];
}

var filesToLoad = [
    /* AlloyEditor skins */
    {
        pattern: path.join(alloyEditorDir, 'assets/alloy-editor-ocean.css'),
        included: true,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'assets/fonts/alloyeditor-ocean.woff'),
        included: false,
        watched: false
    }, {
        pattern: path.join(alloyEditorDir, 'assets/fonts/alloyeditor-ocean.ttf'),
        included: false,
        watched: false
    },

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
    }, {
        pattern: path.join(alloyEditorDir, 'plugins/test_*/plugin.js'),
        included: true,
        watched: false
    },

    /* bender requires CKEDITOR, should be after ckeditor.js */
    'test/util/bender.js',

    'test/util/utils.js',
    'src/ui/react/test/util/utils.js',

    /* ReactJS */
    {
        pattern: path.join(alloyEditorDir, 'react-with-addons-all.js'),
        included: true,
        watched: false
    },

    /* React Bridge */
    {
        pattern: path.join(alloyEditorDir, 'react-bridge.js'),
        included: true,
        watched: false
    },

    /* Fixtures */
    'test/core/test/fixtures/**/*',
    'src/ui/react/test/fixtures/**/*'
];

srcFiles.forEach(function(file) {
    filesToLoad.push({
        pattern: path.join(alloyEditorDir, 'test', file),
        included: true,
        watched: false
    });
});

filesToLoad.push({
    pattern: 'test/core/test/*.js*',
    included: true,
    watched: false
});

filesToLoad.push({
    pattern: 'test/plugins/test/*.js*',
    included: true,
    watched: false
});

filesToLoad.push({
    pattern: 'src/ui/react/test/*.js*',
    included: true,
    watched: false
});

filesToLoad.push({
    pattern: path.join(alloyEditorDir, 'test/ui/react/lang/en.js'),
    included: true,
    watched: false
});

var customLaunchers = {
    sl_chrome_mac_10_11: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.11'
    },
    sl_chrome_mac_10_12: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'macOS 10.12'
    },
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

var defaultConfig = {

	browsers: Object.keys(customLaunchers),

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 240000,

    captureTimeout: 240000,
    customLaunchers: customLaunchers,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'fixture', 'mocha', 'sinon'],

    // list of files / patterns to load in the browser
    files: filesToLoad,

    // list of files to exclude
    exclude: [],

    plugins: [
        'karma-babel-preprocessor',
        'karma-coverage',
        'karma-html2js-preprocessor',
        'karma-chai',
        'karma-fixture',
        'karma-mocha',
        'karma-sinon',
        karmaSauceLauncher
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,

    babelPreprocessor: {
      options: {
        presets: ['es2015', 'react']
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'saucelabs'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: 'info',

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

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

};

module.exports = function(config) {
    config.set(defaultConfig);
};
