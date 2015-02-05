'use strict';

var gulp = require('gulp');

var concat = require('gulp-concat');
var path = require('path');
var react = require('gulp-react');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('build', function(callback) {
    runSequence(
        'clean-all', 'build-js', 'minimize-js', [
            'create-alloy-editor', 'create-alloy-editor-min'
        ],
        callback
    );
});

gulp.task('build-js', function(callback) {
    runSequence([
        'copy-ckeditor',
        'create-alloy-editor-core',
    ], 'wrap-alloy-editor-core', 'wrap-alloy-editor-global', callback);
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(rootDir, 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(reactDir, 'vendor', 'react.js'),
            path.join(editorDistFolder, 'alloy-editor-core.js'),
        ])
        .pipe(concat('alloy-editor-all.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-min', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(reactDir, 'vendor', 'react.js'),
            path.join(editorDistFolder, 'alloy-editor-core-min.js'),
        ])
        .pipe(concat('alloy-editor-all-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-core', function() {
    return gulp.src([
        path.join(rootDir, 'src/core/debounce.js'),
        path.join(rootDir, 'src/core/link.js'),
        path.join(rootDir, 'src/core/selection-region.js'),
        path.join(rootDir, 'src/core/tools.js'),
        path.join(rootDir, 'src/core/uicore.js'),
        path.join(reactDir, 'src/oop/lang.js'),
        path.join(reactDir, 'src/oop/attribute.js'),
        path.join(reactDir, 'src/oop/oop.js'),
        path.join(reactDir, 'src/oop/base.js'),
        path.join(reactDir, 'src/buttons/*.js'),
        path.join(reactDir, 'src/toolbars/*.js'),
        path.join(reactDir, 'src/adapter/alloy-editor-adapter.js')
    ])
    .pipe(react())
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