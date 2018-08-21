'use strict';

var argv = require('yargs').argv;
var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var mkdirp = require('mkdirp');
var path = require('path');
var runSequence = require('run-sequence');

var rootDir = path.join(__dirname, '..');

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var coreSrcFiles = require('../test/core/_src.js');
var pluginsSrcFiles = require('../test/plugins/_src.js');

gulp.task('copy-files', function() {
    var files = coreSrcFiles.concat(pluginsSrcFiles);

    return gulp.src(files, {cwd: 'src', base: 'src'})
        .pipe(gulp.dest(path.join(editorDistFolder, 'test')));
});

gulp.task('create-output-dir', function(callback) {
    mkdirp(editorDistFolder, callback);
});

gulp.task('prepare-files', function(done) {
    runSequence(
        'clean-dist', 'create-output-dir', [
            'copy-ckeditor', 'copy-files'
        ], done);
});

gulp.task('test:core', ['prepare-files'], function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, '../test/core/karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});

gulp.task('test:plugins', ['prepare-files'], function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, '../test/plugins/karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});