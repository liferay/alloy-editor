var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('rimraf'),

    ROOT = path.join(__dirname, '..');

gulp.task('clean', function(callback) {
    rimraf(path.join(ROOT, 'dist'), callback);
});