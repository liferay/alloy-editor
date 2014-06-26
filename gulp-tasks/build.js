var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-css', 'join-plugins');
});

gulp.task('release', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-css', 'join-plugins', function() {
            return gulp.src(
                    path.join(ROOT, 'dist', '/**/*')
                )
                .pipe(zip('lreditor.zip'))
                .pipe(gulp.dest(path.join(ROOT, 'dist')));
        });
});