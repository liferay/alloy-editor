// Karma configuration

'use strict';

const Common = require('./karma.common');

const defaultConfig = Object.assign(
    Common,
    {
        browsers: ['Chrome'],

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'progress'],
    }
);

module.exports = function(config) {
    config.set(defaultConfig);
};
