'use strict';

var gulp = require('gulp');

var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var distFolder = path.join(rootDir, 'dist');

var pkg = require(path.join(rootDir, 'package.json'));
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('wrap-alloy-editor-adapter', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor-adapter.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(reactDir, 'src/adapter/alloy-editor.js'))
        }))
        .pipe(rename('alloy-editor-adapter.js'))
        .pipe(gulp.dest(path.join(reactDir, 'umd')));
});

gulp.task('wrap-alloy-editor-core', ['create-alloy-editor-core'], function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor-core.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-core.js'))
        }))
        .pipe(rename('alloy-editor-core.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('wrap-attribute', function() {
    return gulp.src(path.join(reactDir, 'template/attribute.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(reactDir, 'src/oop/attribute.js'))
        }))
        .pipe(rename('attribute.js'))
        .pipe(gulp.dest(path.join(reactDir, 'umd')));
});

gulp.task('wrap-base', function() {
    return gulp.src(path.join(reactDir, 'template/base.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(reactDir, 'src/oop/base.js'))
        }))
        .pipe(rename('base.js'))
        .pipe(gulp.dest(path.join(reactDir, 'umd')));
});

gulp.task('wrap-lang', function() {
    return gulp.src(path.join(reactDir, 'template/lang.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(reactDir, 'src/oop/lang.js'))
        }))
        .pipe(rename('lang.js'))
        .pipe(gulp.dest(path.join(reactDir, 'umd')));
});

gulp.task('wrap-oop', function() {
    return gulp.src(path.join(reactDir, 'template/oop.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(reactDir, 'src/oop/oop.js'))
        }))
        .pipe(rename('oop.js'))
        .pipe(gulp.dest(path.join(reactDir, 'umd')));
});