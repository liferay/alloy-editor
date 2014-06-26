var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('rimraf'),

    ROOT = path.join(__dirname, '..');

gulp.task('clean', function() {
    rimraf(path.join(ROOT, 'dist'), function(err) {
        if (err) {
            throw err;
        }
    });
});