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
        pjson;

    pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

    dest = path.join(ROOT, '..', '..', '..', 'dist');

    return gulp.src(path.join(dest, '/**'))
        .pipe(zip('alloy-editor-' + pjson.version + '.zip'))
        .pipe(gulp.dest(dest));
});