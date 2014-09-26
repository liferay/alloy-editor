'use strict';

var argv = require('yargs').argv,
    gulp = require('gulp'),
    path = require('path'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    runSequence = require('run-sequence'),
    template = require('gulp-template'),
    uglify = require('gulp-uglify'),

    ROOT = path.join(__dirname, '..'),
    DIST_DIR = path.join(ROOT, '..', '..', '..', 'dist'),
    DIST_DIR_ALLOY = path.join(DIST_DIR, 'alloy-editor');

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(ROOT, '..', '..', '..', 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(DIST_DIR_ALLOY));
});

gulp.task('copy-demo', function() {
    return gulp.src([
            path.join(ROOT, 'demo', '/**/*')
        ])
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('create-alloy-editor-core', function() {
    var editorSRC = path.join(ROOT, '..', '..', '..', 'src');

    return gulp.src([
        path.join(editorSRC, 'core', 'debounce.js'),
        path.join(editorSRC, 'core', 'link.js'),
        path.join(editorSRC, 'core', 'selection-region.js'),
        path.join(editorSRC, 'core', 'tools.js'),
        path.join(editorSRC, 'core', 'uicore.js'),
        path.join(editorSRC, 'plugins', '/**/*.js'),
        path.join(ROOT, 'adapter', '/**/*.js'),
        path.join(ROOT, 'toolbars', '/**/*.js'),
    ])
    // .pipe(uglify())
    .pipe(concat('alloy-editor-core.js'))
    .pipe(gulp.dest(DIST_DIR_ALLOY));
});

gulp.task('join-alloy-editor-core-ckeditor', function() {
    return gulp.src([
        path.join(DIST_DIR_ALLOY, 'ckeditor.js'),
        path.join(DIST_DIR_ALLOY, 'alloy-editor-core.js')
    ])
    .pipe(concat('alloy-editor.js'))
    .pipe(gulp.dest(DIST_DIR_ALLOY));
});

gulp.task('create-alloy-editor', function(callback) {
    runSequence('copy-ckeditor', 'create-alloy-editor-core', 'join-alloy-editor-core-ckeditor',
        callback);
});