'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var path = require('path');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('build', function(callback) {
    runSequence('clean-all', [
        'build-js'
    ], [
        'minimize-js',
        'join-ckeditor-alloy-editor'
    ], callback);
});

gulp.task('build-js', function(callback) {
    runSequence([
        'copy-ckeditor',
        'wrap-alloy-editor-adapter',
        'wrap-attribute',
        'wrap-base',
        'wrap-lang',
        'wrap-oop'
    ], 'wrap-alloy-editor-core', callback);
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(rootDir, 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('join-ckeditor-alloy-editor', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(editorDistFolder, 'alloy-editor-core.js'),
        ])
        .pipe(concat('alloy-editor-all.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-core', function() {
    return gulp.src([
        path.join(rootDir, 'src/core/debounce.js'),
        path.join(rootDir, 'src/core/link.js'),
        path.join(rootDir, 'src/core/selection-region.js'),
        path.join(rootDir, 'src/core/tools.js'),
        path.join(rootDir, 'src/core/uicore.js'),
        path.join(reactDir, 'umd/lang.js'),
        path.join(reactDir, 'umd/attribute.js'),
        path.join(reactDir, 'umd/oop.js'),
        path.join(reactDir, 'umd/base.js'),
        path.join(reactDir, 'umd/alloy-editor-adapter.js'),
    ])
    .pipe(concat('alloy-editor-core.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('minimize-js', function() {
    return gulp.src([
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(uglify())
        .pipe(rename('alloy-editor-core-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});