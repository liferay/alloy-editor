'use strict';

var gulp = require('gulp');

var argv = require('yargs').argv;
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var walk = require('walk');
var yuidoc = require('gulp-yuidoc-relative');
var zip = require('gulp-zip');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var apiFolder = path.join(rootDir, 'api');
var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var srcFiles = require('../_src.js');

function errorHandler(error) {
  console.log(error.toString());

  this.emit('end');
}

gulp.task('build', function(callback) {
    runSequence(
        'clean-dist',
        [
            'build-css',
            'build-js',
            'copy-languages'
        ],
        [
            'create-alloy-editor-all',
            'create-alloy-editor-no-ckeditor',
            'create-alloy-editor-no-react'
        ],
        'build-demo',
        callback
    );
});

gulp.task('release', function(callback) {
    runSequence(
        'clean-api',
        'clean-dist',
        [
            'build-api',
            'build-css',
            'build-js',
            'copy-languages'
        ],
        [
            'minimize-css',
            'minimize-alloy-editor-core'
        ],
        [
            'create-alloy-editor-all',
            'create-alloy-editor-all-min',
            'create-alloy-editor-no-ckeditor',
            'create-alloy-editor-no-ckeditor-min',
            'create-alloy-editor-no-react',
            'create-alloy-editor-no-react-min'
        ],
        'build-demo',
        callback
    );
});

gulp.task('build-api', function() {
    var parseOpts = {
        project: {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            url: pkg.homepage
        }
    };

    var renderOpts = {
        themedir: path.join(rootDir, 'api-theme')
    };

    gulp.src([
        path.join(rootDir, 'src/core/**/*.js'),
        path.join(rootDir, 'src/plugins/autolink.js'),
        path.join(rootDir, 'src/plugins/drop-images.js'),
        path.join(rootDir, 'src/plugins/placeholder.js'),
        path.join(reactDir, 'src/**/*.js*')
    ])
    .pipe(yuidoc(parseOpts, renderOpts))
    .pipe(gulp.dest(apiFolder));
});

gulp.task('build-demo', function() {
    var templateHead;

    if (argv._.indexOf('release') >= 0) {
        templateHead = 'head-release.template';
    }
    else {
        templateHead = 'head-dev.template';
    }

    return gulp.src([
            path.join(reactDir, 'demo', 'index.html'),
            path.join(reactDir, 'demo', 'bootstrap.css')
        ])
        .pipe(template({
            resources: fs.readFileSync(path.join(reactDir, 'template', templateHead))
        }))
        .pipe(gulp.dest(path.join(distFolder)));
});

gulp.task('build-js', function(callback) {
    runSequence([
        'copy-ckeditor',
        'create-alloy-editor-core'
    ], 'wrap-alloy-editor', callback);
});

gulp.task('clean-api', function(callback) {
    return del(apiFolder, callback);
});

gulp.task('clean-dist', function(callback) {
    return del(distFolder, callback);
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(rootDir, 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-all', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(reactDir, 'vendor', 'react.js'),
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(concat('alloy-editor-all.js'))
        .pipe(replace(/ckeditor(\\?).js/g, 'alloy-editor-all$1.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-ckeditor', function() {
    return gulp.src([
            path.join(reactDir, 'vendor', 'react.js'),
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(concat('alloy-editor-no-ckeditor.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-react', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(concat('alloy-editor-no-react.js'))
        .pipe(replace(/ckeditor(\\?).js/g, 'alloy-editor-no-react$1.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-all-min', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(reactDir, 'vendor', 'react-min.js'),
            path.join(editorDistFolder, 'alloy-editor-core-min.js')
        ])
        .pipe(concat('alloy-editor-all-min.js'))
        .pipe(replace(/ckeditor(\\?).js/g, 'alloy-editor-all-min$1.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-ckeditor-min', function() {
    return gulp.src([
            path.join(reactDir, 'vendor', 'react-min.js'),
            path.join(editorDistFolder, 'alloy-editor-core-min.js')
        ])
        .pipe(concat('alloy-editor-no-ckeditor-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-react-min', function() {
    return gulp.src([
            path.join(editorDistFolder, 'ckeditor.js'),
            path.join(editorDistFolder, 'alloy-editor-core-min.js')
        ])
        .pipe(concat('alloy-editor-no-react-min.js'))
        .pipe(replace(/ckeditor(\\?).js/g, 'alloy-editor-no-react-min$1.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-core', function() {
    return gulp.src(srcFiles, {cwd : rootDir + '/src'})
    .pipe(babel()).on('error', errorHandler)
    .pipe(concat('alloy-editor-core.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('release:zip', ['release'], function() {
    return gulp.src(path.join(distFolder, '/**'))
        .pipe(zip('alloy-editor-' + pkg.version + '.zip'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('minimize-alloy-editor-core', function() {
    return gulp.src([
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(uglify())
        .pipe(rename('alloy-editor-core-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*', ['build']);
});
