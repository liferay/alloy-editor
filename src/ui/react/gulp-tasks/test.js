'use strict';

var argv = require('yargs').argv;
var gulp = require('gulp');
var karma = require('karma').server;
var mkdirp = require('mkdirp');
var path = require('path');
var react = require('gulp-react');
var runSequence = require('run-sequence');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

var srcFiles = require('../_src.js');

gulp.task('prepare-files', function(done) {
    runSequence(
        'clean-dist', 'create-output-dir', ['build-css', 'copy-ckeditor', 'copy-src-files', 'copy-react'], done);
});

gulp.task('create-output-dir', function(callback) {
    mkdirp(editorDistFolder, callback);
});

gulp.task('copy-src-files', function() {
    return gulp.src(srcFiles, {cwd: 'src', base: 'src'})
        .pipe(react())
        .pipe(gulp.dest(path.join(editorDistFolder, 'test')));
});

gulp.task('copy-react', function() {
    return gulp.src(path.join(reactDir, 'vendor', 'react-with-addons.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('test', ['prepare-files'], function (done) {
    karma.start({
        configFile: path.join(__dirname, '../karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done);
});