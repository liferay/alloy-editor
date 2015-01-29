'use strict';

var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    path = require('path'),
    runSequence = require('run-sequence'),
    zip = require('gulp-zip'),

    ROOT = path.join(__dirname, '..'),
    distFolder = path.join(ROOT, '..', '..', '..', 'dist');

gulp.task('build', function(callback) {
    runSequence('clean-all', 'make-css',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'copy-ckeditor'],
        ['join-js', 'clean-fontcss', 'copy-demo'],
        'alloy-editor-dist',
        ['clean-tmp'], callback);
});

gulp.task('minimize-css', function() {
    return gulp.src(path.join(distFolder, '**', 'assets', '**/*.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distFolder));
});

gulp.task('minimize-js', function() {
    return gulp.src([
        path.join(distFolder, '**', 'adapter', '*.js'),
        path.join(distFolder, '**', 'buttons', '*.js'),
        path.join(distFolder, '**', 'toolbars', '*.js'),
        path.join(distFolder, '**', 'alloy-editor-core.js')
        ])
        .pipe(uglify())
        .pipe(gulp.dest(distFolder));
});

gulp.task('create-zip', function() {
    var pjson;

    pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

    return gulp.src(path.join(distFolder, '/**'))
        .pipe(zip('alloy-editor-' + pjson.version + '.zip'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('minimize', ['minimize-css', 'minimize-js']);

gulp.task('create-dist-file', function(callback) {
    runSequence('create-alloy-editor', 'clean-joined-files', 'create-zip', callback);
});

gulp.task('release', function(callback) {
    runSequence('build', 'minimize', 'create-dist-file', callback);
});

gulp.task('release-raw', function(callback) {
    runSequence('build', 'create-dist-file', callback);
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*', ['build']);
});