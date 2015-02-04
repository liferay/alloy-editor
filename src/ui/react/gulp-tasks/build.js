'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
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
    return gulp.src([
        path.join(rootDir, 'src', 'core', 'debounce.js'),
        path.join(rootDir, 'src', 'core', 'link.js'),
        path.join(rootDir, 'src', 'core', 'selection-region.js'),
        path.join(rootDir, 'src', 'core', 'tools.js'),
        path.join(rootDir, 'src', 'core', 'uicore.js'),
        path.join(reactDir, 'src', 'oop', 'lang.js'),
        path.join(reactDir, 'src', 'oop', 'attribute.js'),
        path.join(reactDir, 'src', 'oop', 'oop.js'),
        path.join(reactDir, 'src', 'oop', 'base.js'),
        path.join(reactDir, 'src', 'adapter', 'react.js'),
    ])
    .pipe(concat('alloy-editor-core.js'))
    .pipe(gulp.dest(editorDistFolder));
});