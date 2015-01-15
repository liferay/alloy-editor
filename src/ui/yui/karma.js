// Karma configuration
// Generated on Wed Dec 24 2014 04:56:24 GMT+0100 (CET)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../..',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
        {pattern: 'dist/alloy-editor-*/bootstrap.css', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/assets/alloy-editor-dark.css', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/assets/fonts/alloyeditor.woff', included: false, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/assets/fonts/alloyeditor.ttf', included: false, watched: false},

        'src/ui/yui/test/vendor/happen.js',
        'src/ui/yui/test/vendor/zepto.js',
        'http://yui.yahooapis.com/3.17.2/build/yui/yui-min.js',

        {pattern: 'dist/alloy-editor-*/alloy-editor/ckeditor.js', included: true, watched: false},

        /* bender requires CKEDITOR, should be after ckeditor.js */
        'src/ui/yui/test/util/bender.js',

        {pattern: 'dist/alloy-editor-*/alloy-editor/styles.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/config.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/skins/moono/*.css', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/lang/*.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/yui-config.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/plugins/*.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/toolbars/*.js', included: true, watched: false},
        {pattern: 'dist/alloy-editor-*/alloy-editor/buttons/*.js', included: true, watched: false},

        'src/ui/yui/test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


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
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'IE9 - Win7', 'IE10 - Win7', 'IE11 - Win7'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
