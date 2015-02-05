'use strict';

var gulp = require('gulp');

var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');

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