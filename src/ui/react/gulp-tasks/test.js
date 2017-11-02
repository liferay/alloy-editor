'use strict';

var argv = require('yargs').argv;
var babel = require('gulp-babel');
var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var mkdirp = require('mkdirp');
var path = require('path');
var runSequence = require('run-sequence');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var srcFiles = require('../_src.js');
var languageFiles = require('../_languages.js');

gulp.task('prepare-files', function(done) {
    runSequence(
        'clean-dist', 'create-output-dir', [
            'build-css',
            'copy-ckeditor',
            'copy-core-files',
            'copy-language-files',
            'copy-react',
            'copy-react-bridge',
            'copy-test-plugins'
        ], done);
});

gulp.task('create-output-dir', function(callback) {
    mkdirp(editorDistFolder, callback);
});

gulp.task('copy-core-files', function() {
    return gulp.src(srcFiles.main.concat(srcFiles.ui), {cwd: 'src', base: 'src'})
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest(path.join(editorDistFolder, 'test')));
});

gulp.task('copy-language-files', function() {
    return gulp.src(languageFiles, {cwd: 'src', base: 'src'})
        .pipe(gulp.dest(path.join(editorDistFolder, 'test')));
});

gulp.task('copy-react', function() {
    return gulp.src(path.join(reactDir, 'vendor', 'react-with-addons-all.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('copy-react-bridge', function() {
    return gulp.src(path.join(reactDir, 'vendor', 'react-bridge.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('copy-test-plugins', function() {
    return gulp.src(path.join(reactDir, 'test', 'plugins', '/**'))
        .pipe(gulp.dest(path.join(editorDistFolder, 'plugins')));
});

gulp.task('test', ['prepare-files'], function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, '../karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});

gulp.task('test:saucelabs', ['prepare-files'], function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, '../karma-saucelabs.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});