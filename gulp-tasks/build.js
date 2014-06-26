var gulp = require('gulp'),
	runSequence = require('run-sequence');

gulp.task('build', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-css');
});