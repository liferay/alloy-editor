// Karma configuration

'use strict';

const Common = require('./karma.common');

const defaultConfig = Object.assign(
    Common,
    {
        browsers: ['Chrome', 'Firefox', 'IE9 - Win7', 'IE10 - Win7', 'IE11 - Win7', 'MSEdge - Win10'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'progress'],
    }
);

module.exports = function(config) {
    config.set(defaultConfig);
};
