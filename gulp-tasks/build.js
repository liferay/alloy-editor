var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function() {
    return runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-css', 'join-plugins-config');
});

gulp.task('release', function() {
    return runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        ['join-css', 'join-plugins-config'], function() {
            return gulp.src(
                    path.join(ROOT, 'dist', '/**/*')
                )
                .pipe(zip('lreditor.zip'))
                .pipe(gulp.dest(path.join(ROOT, 'dist')));
        });
});