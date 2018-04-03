'use strict';

const argv = require('yargs').argv;
const gulp = require('gulp');
const KarmaServer = require('karma').Server;
const path = require('path');

gulp.task('test', function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, './karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});

gulp.task('test:saucelabs', function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, './karma-saucelabs.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});

gulp.task('test:core', function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, './test/core/karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});

gulp.task('test:plugins', function (done) {
    new KarmaServer({
        configFile: path.join(__dirname, './test/plugins/karma.js'),
        singleRun: (argv.debug || argv.d) ? false : true
    }, done).start();
});
