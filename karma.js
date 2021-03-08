/**
 * SPDX-FileCopyrightText: © 2014 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: LGPL-3.0-or-later
 */

// Karma configuration

'use strict';

const Common = require('./karma.common');

const defaultConfig = Object.assign(Common, {
	browsers: ['Chrome'],

	// test results reporter to use
	// possible values: 'dots', 'progress', 'verbose'
	// available reporters: https://npmjs.org/browse/keyword/karma-reporter

	reporters: ['verbose'],
});

module.exports = function(config) {
	config.set(defaultConfig);
};
