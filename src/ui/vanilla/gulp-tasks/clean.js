'use strict';

var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),

    ROOT = path.join(__dirname, '..'),
    distFolder = path.join(ROOT, '..', '..', '..', 'dist');

gulp.task('clean', function() {
    return gulp.src(distFolder, {read: false})
        .pipe(rimraf({force: true}));
});