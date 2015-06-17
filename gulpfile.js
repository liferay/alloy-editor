'use strict';

var argv = require('yargs').argv,
	gulp = require('gulp'),
	path = require('path'),
    requireDir = require('require-dir'),
    ui = argv.ui || 'react';

requireDir(path.join(__dirname, 'gulp-tasks'));
requireDir(path.join(__dirname, 'src', 'ui', ui, 'gulp-tasks'));

gulp.task('default', ['build']);