'use strict';

var fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    rename = require('gulp-rename'),
    template = require('gulp-template'),

    ROOT = path.join(__dirname, '..');

gulp.task('export-env', function() {
    var yuiModules = fs.readFileSync(path.join(ROOT, 'config', 'yui-modules.js'));

    return gulp.src(path.join(ROOT, 'config', 'yui-config.template'))
        .pipe(template({
            modules: yuiModules
            }))
        .pipe(rename('yui-config.js'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
    });