'use strict';

var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),

    ROOT = path.join(__dirname, '..'),
    distFolder = path.join(ROOT, '..', '..', '..', 'dist');

gulp.task('clean-dist', function() {
	return gulp.src(path.join(ROOT, '..', '..', '..', 'dist'), {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-joined-files', function() {
	var alloyEditorFolder,
		pjson;

	pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

	alloyEditorFolder = path.join(distFolder, 'alloy-editor-' + pjson.version, 'alloy-editor');

	return gulp.src([
		path.join(alloyEditorFolder, 'assets', 'css'),
		path.join(alloyEditorFolder, 'assets', 'font.css'),
		path.join(alloyEditorFolder, 'plugins'),
		path.join(alloyEditorFolder, 'yui-config.js')
		], {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-tmp', function() {
	return gulp.src(path.join(ROOT, 'tmp'), {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-all', ['clean-tmp', 'clean-dist']);