'use strict';

const {getFolders} = require('../utils');
const concat = require('gulp-concat');
const Constants = require('../constants');
const del = require('del');
const es = require('event-stream');
const fs = require('fs');
const gulp = require('gulp');
const minifyCSS = require('gulp-cssnano');
const path = require('path');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');

function errorHandler(error) {
	this.emit('end');
}

gulp.task('build-css', function(callback) {
	runSequence(
		'generate-fonts',
		'sass2css',
		'join-css',
		'clean-fonts',
		callback
	);
});

gulp.task('sass2css', function() {
	return gulp
		.src(path.join(Constants.rootDir, 'src/assets/sass/**/main.scss'))
		.pipe(
			sass({
				includePaths: [
					path.join(
						Constants.rootDir,
						'node_modules/bourbon/app/assets/stylesheets'
					),
					path.join(Constants.rootDir, 'src/assets/sass')
				],
				onError: errorHandler.bind(this)
			})
		)
		.pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets/css')));
});

gulp.task('join-css', function() {
	var cssDir = path.join(Constants.editorDistFolder, 'assets/css');
	var skins = getFolders(
		path.join(Constants.editorDistFolder, 'assets/css/skin')
	);

	var tasks = skins.map(function(skin) {
		var skinFileName = 'alloy-editor-' + skin + '.css';
		var skinFontFileName = 'alloyeditor-font-' + skin + '.css';

		return gulp
			.src([
				path.join(
					Constants.rootDir,
					'src/assets/sass/skin',
					skin,
					'.font-cache',
					skinFontFileName
				),
				path.join(cssDir, 'skin', skin, 'main.css')
			])
			.pipe(concat(skinFileName))
			.pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets')));
	});

	return es.concat.apply(null, tasks);
});

gulp.task('minimize-css', function() {
	return gulp
		.src(path.join(Constants.editorDistFolder, 'assets/*.css'))
		.pipe(minifyCSS())
		.pipe(
			rename({
				suffix: '-min'
			})
		)
		.pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets')));
});

gulp.task('clean-fonts', function() {
	return del([path.join(Constants.editorDistFolder, 'assets/css')], {
		force: true
	});
});
