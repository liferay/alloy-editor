'use strict';

var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),

    ROOT = path.join(__dirname, '..'),
    distFolder = path.join(ROOT, '..', '..', '..', 'dist');

gulp.task('clean-dist', function(callback) {
	return del(distFolder, callback);
});

gulp.task('clean-all', ['clean-dist']);