var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function() {
    return runSequence('clean', 'make-css',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-plugins-config');
});

gulp.task('release', function() {
    return runSequence('clean',
        ['sass2css', 'svg-sprite'],
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        ['make-css', 'join-plugins-config'], function() {
            return gulp.src(
                    path.join(ROOT, 'dist', '/**/*')
                )
                .pipe(zip('lreditor.zip'))
                .pipe(gulp.dest(path.join(ROOT, 'dist')));
        });
});