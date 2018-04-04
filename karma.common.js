'use strict';

const argv = require('yargs').argv;
const path = require('path');
const srcFiles = require('./test/ui/_src.js');
const alloyEditorDir = 'dist/alloy-editor/';

const preprocessors = {
    'test/**/*.html': ['html2js'],
    '+(test|src)/**/*.js*': ['webpack'],
    'scripts/test/loader-alloy-editor.js': ['webpack']
};

if (!(argv.debug || argv.d)) {
    preprocessors[path.join(alloyEditorDir, 'test/**/*.js')] = ['coverage'];
}

const filesToLoad = [
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
        pattern: 'test/ui/test/plugins/test_*/plugin.js',
        included: true,
        watched: false
    },

    /* bender requires CKEDITOR, should be after ckeditor.js */
    'scripts/test/bender.js',

    'scripts/test/loader-alloy-editor.js',
    'scripts/test/utils-ckeditor.js',
    'scripts/test/utils-alloy-editor.js',

    /* Fixtures */
    'test/core/test/fixtures/**/*',
    'test/ui/test/fixtures/**/*'
];

srcFiles.forEach(function(file) {
    filesToLoad.push({
        pattern: path.join('src/', file),
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
    pattern: 'test/ui/test/*.js*',
    included: true,
    watched: false
});

filesToLoad.push({
    pattern: 'src/lang/en.js',
    included: true,
    watched: false
});

module.exports = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

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
		module: {
			rules: [{
                test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			}]
		}
	},

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
