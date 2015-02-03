'use strict';

var gulp = require('gulp');

var path = require('path');
var runSequence = require('run-sequence');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('build', function(callback) {
    runSequence('clean-all', [
        'build-js'
    ], callback);
});

gulp.task('build-js', function(callback) {
    runSequence(['copy-ckeditor', 'copy-js'], callback);
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(rootDir, 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('copy-js', function() {
    return gulp.src(path.join(reactDir, 'src', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});