'use strict';

const {getFolders} = require('../utils');
const concat = require('gulp-concat');
const Constants = require('../constants');
const es = require('event-stream');
const gulp = require('gulp');
const minifyCSS = require('gulp-cssnano');
const path = require('path');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('css:sass', function sassCSS(callback) {
	return gulp
		.src(path.join(Constants.rootDir, 'src/assets/sass/**/main.scss'))
		.pipe(
			sass({
				includePaths: [
					path.join(
						Constants.rootDir,
						'node_modules/bourbon/app/assets/stylesheets'
					),
					path.join(Constants.rootDir, 'src/assets/sass'),
				],
				onError(err) {
					callback(err);
				},
			})
		)
		.pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets/css')));
});

function getJoinTasks() {
	const cssDir = path.join(Constants.editorDistFolder, 'assets/css');
	const skins = getFolders(
		path.join(Constants.rootDir, 'src/assets/sass/skin')
	);

	return skins.map(function(skin) {
		const skinFileName = 'alloy-editor-' + skin + '.css';

		const fn = function() {
			return gulp
				.src([path.join(cssDir, 'skin', skin, 'main.css')], {
					allowEmpty: true,
				})
				.pipe(concat(skinFileName))
				.pipe(
					gulp.dest(path.join(Constants.editorDistFolder, 'assets'))
				);
		};
		fn.displayName = `css:join:${skin}`;
		return fn;
	});
}

gulp.task('css:join', gulp.parallel(...getJoinTasks()));

gulp.task('css:minimize', function() {
	return gulp
		.src(path.join(Constants.editorDistFolder, 'assets/*.css'))
		.pipe(minifyCSS())
		.pipe(
			rename({
				suffix: '-min',
			})
		)
		.pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets')));
});

gulp.task('css:build', gulp.series('css:sass', 'css:join'));
