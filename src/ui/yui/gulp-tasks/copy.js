'use strict';

var argv = require('yargs').argv,
    concat = require('gulp-concat'),
	gulp = require('gulp'),
    fs = require('fs'),
	path = require('path'),
    runSequence = require('run-sequence'),
    template = require('gulp-template'),

    ROOT = path.join(__dirname, '..'),

    pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

gulp.task('copy-css', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.css'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-js', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.js'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(ROOT, '..', '..', '..', 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('join-js', function() {
    var editorSRC = path.join(ROOT, '..', '..', '..', 'src');

    return gulp.src([
        path.join(editorSRC, 'core', 'debounce.js'),
        path.join(editorSRC, 'core', 'link.js'),
        path.join(editorSRC, 'core', 'selection-region.js'),
        path.join(editorSRC, 'core', 'tools.js'),
        path.join(editorSRC, 'core', 'uicore.js'),
        path.join(ROOT, 'src', 'adapter', 'yui.js'),
        path.join(editorSRC, 'plugins', '/**/*.js'),
        path.join(ROOT, 'tmp', 'yui-config.js'),
        path.join(ROOT, 'src', 'plugins', '/**/*.js')
    ])
    .pipe(gulp.dest(path.join(ROOT, 'tmp', 'plugins')))
    .pipe(concat('alloy-editor-core.js'))
    .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-demo', function() {
    var templateHead;

    if (argv._.indexOf('release') >= 0) {
        templateHead = 'head-release.template';
    }
    else {
        templateHead = 'head-dev.template';
    }

    return gulp.src([
            path.join(ROOT, 'demo', 'index.html'),
            path.join(ROOT, 'demo', 'bootstrap.css'),
        ])
        .pipe(template({
            resources: fs.readFileSync(path.join(ROOT, 'config', templateHead))
        }))
        .pipe(gulp.dest(path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version)));
});

gulp.task('alloy-editor-dist', function() {
    return gulp.src(path.join(ROOT, 'tmp', '/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version, 'alloy-editor')));
});

gulp.task('join-alloy-editor-core-ckeditor', function() {
    var alloyEditorFolder = path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version, 'alloy-editor');

    return gulp.src([
        path.join(alloyEditorFolder, 'ckeditor.js'),
        path.join(alloyEditorFolder, 'alloy-editor-core.js')
    ])
    .pipe(concat('alloy-editor.js'))
    .pipe(gulp.dest(alloyEditorFolder));
});

gulp.task('alloy-editor-all', function() {
    var alloyEditorFolder = path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version, 'alloy-editor');

    return gulp.src([
        path.join(alloyEditorFolder, 'ckeditor.js'),
        path.join(alloyEditorFolder, 'alloy-editor-core.js'),
        path.join(alloyEditorFolder, 'buttons', '**/*.js'),
        path.join(alloyEditorFolder, 'toolbars', '**/*.js')
    ])
    .pipe(concat('alloy-editor-all.js'))
    .pipe(gulp.dest(alloyEditorFolder));
});

gulp.task('create-alloy-editor', function(callback) {
    runSequence(['join-alloy-editor-core-ckeditor', 'alloy-editor-all'],
        callback);
});