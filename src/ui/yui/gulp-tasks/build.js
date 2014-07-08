var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function(callback) {
    runSequence('clean-all', 'make-css',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-plugins-config', 'create-alloy-editor', 'clean-tmp', callback);
});

gulp.task('release', ['build'], function() {
    var dest,
    src;

    src = path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor');
    dest = path.join(ROOT, '..', '..', '..', 'dist');

    return gulp.src(path.join(src, '/**'))
        .pipe(zip('alloy-editor.zip'))
        .pipe(gulp.dest(dest));
});