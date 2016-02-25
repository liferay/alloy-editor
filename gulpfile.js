'use strict';

var argv = require('yargs').argv,
	gulp = require('gulp'),
    liferayGulpTasks = require('liferay-gulp-tasks'),
	path = require('path'),
    requireDir = require('require-dir'),
    ui = argv.ui || 'react';

liferayGulpTasks.registerTasks();

requireDir(path.join(__dirname, 'gulp-tasks'));
requireDir(path.join(__dirname, 'src', 'ui', ui, 'gulp-tasks'));

gulp.task('default', ['build']);