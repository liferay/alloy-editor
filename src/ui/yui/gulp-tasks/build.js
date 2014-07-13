'use strict';

var gulp = require('gulp'),
    gulpIgnore = require('gulp-ignore'),
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
        ['join-js', 'clean-fontcss'],
        ['create-alloy-editor', 'copy-demo'],
        ['clean-tmp'], callback);
});

gulp.task('minimize-css', function() {
    return gulp.src(path.join(distFolder, '**/*.css'))
        .pipe(gulpIgnore.exclude('/**/ckeditor/*.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(distFolder));
});

gulp.task('minimize-js', function() {
    return gulp.src(path.join(distFolder, '**/*.js'))
        .pipe(gulpIgnore.exclude('/**/ckeditor/*.js'))
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

gulp.task('release', function(callback) {
    runSequence('build', 'clean-joined-files', 'minimize', 'create-zip', callback);
});