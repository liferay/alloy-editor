// Karma configuration

'use strict';

var alloyEditorDir = 'dist/alloy-editor/';

var argv = require('yargs').argv;
var path = require('path');

var srcFiles = require('./_src.js');
srcFiles = srcFiles.main.concat(srcFiles.ui);

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

var defaultConfig = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

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

    babelPreprocessor: {
      options: {
        presets: ['es2015', 'react']
      }
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
    autoWatch: false
};

module.exports = function(config) {
    config.set(defaultConfig);
};
