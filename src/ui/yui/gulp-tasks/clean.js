'use strict';

var gulp = require('gulp'),
    del = require('del'),
    path = require('path'),

    ROOT = path.join(__dirname, '..'),
    distFolder = path.join(ROOT, '..', '..', '..', 'dist');

gulp.task('clean-dist', function(callback) {
	return del(path.join(ROOT, '..', '..', '..', 'dist'), callback);
});

gulp.task('clean-joined-files', function(callback) {
	var alloyEditorFolder,
		pjson;

	pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

	alloyEditorFolder = path.join(distFolder, 'alloy-editor-' + pjson.version, 'alloy-editor');

	del([
		path.join(alloyEditorFolder, 'assets', 'css'),
		path.join(alloyEditorFolder, 'assets', 'font.css'),
		path.join(alloyEditorFolder, 'plugins'),
		path.join(alloyEditorFolder, 'yui-config.js')
	], callback);
});

gulp.task('clean-tmp', function(callback) {
	del([path.join(ROOT, 'tmp')], callback);
});

gulp.task('clean-all', ['clean-tmp', 'clean-dist']);