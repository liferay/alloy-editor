var gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..');

gulp.task('build', function(callback) {
    runSequence('clean-all', 'make-css',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        'join-js',
        ['create-alloy-editor', 'copy-demo'],
        'clean-tmp', callback);
});

gulp.task('release', ['build'], function() {
    var dest,
        pjson;

    dest = path.join(ROOT, '..', '..', '..', 'dist');

    pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

    return gulp.src(path.join(dest, '/**'))
        .pipe(zip('alloy-editor-' + pjson.version + '.zip'))
        .pipe(gulp.dest(dest));
});