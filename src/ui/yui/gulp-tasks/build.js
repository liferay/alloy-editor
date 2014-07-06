var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function(callback) {
    runSequence('clean-all', 'make-css',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-plugins-config', 'copy-to-dist', 'clean-tmp', callback);
});

gulp.task('release', ['build'], function() {
    var dist = path.join(ROOT, '..', '..', '..', 'dist');

    return gulp.src(path.join(dist, '/**'))
        .pipe(zip('alloy-editor.zip'))
        .pipe(gulp.dest(dist));
});