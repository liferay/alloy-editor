'use strict';

var gulp = require('gulp');

var del = require('del');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var template = require('gulp-template');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var distFolder = path.join(rootDir, 'dist');

var pkg = require(path.join(rootDir, 'package.json'));
var editorDistFolder = path.join(distFolder, 'alloy-editor-' + pkg.version, 'alloy-editor');

gulp.task('join-core-ui', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            core: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-core.js')),
            ui: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-core-ui.js'))
        }))
        .pipe(rename('alloy-editor-core.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('clean-ui', function(done) {
	del(path.join(editorDistFolder, 'alloy-editor-core-ui.js'), done);
});

gulp.task('wrap-alloy-editor', ['join-core-ui', 'clean-ui']);