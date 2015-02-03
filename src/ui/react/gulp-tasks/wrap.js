'use strict';

var gulp = require('gulp');

var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var distFolder = path.join(rootDir, 'dist');

var pkg = require(path.join(rootDir, 'package.json'));
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('wrap-alloy-editor-core', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor-core.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-core.js'))
        }))
        .pipe(rename('alloy-editor-core.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('wrap-alloy-editor-global', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor-global.template'))
        .pipe(template({
            source: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-core.js'))
        }))
        .pipe(rename('alloy-editor-core.js'))
        .pipe(gulp.dest(editorDistFolder));
});

