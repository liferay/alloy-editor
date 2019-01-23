const argv = require('yargs').argv;

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const webpack = require('webpack');
const Constants = require('../constants');

require('./css');
require('./icons');
require('./languages');

function ifRelease(task) {
	if (argv.release) {
		return task;
	} else {
		const skipTask = callback => {
			callback();
		};
		skipTask.displayName = `${task}:skipping:this-is-not-a-release-build`;
		return skipTask;
	}
}

function createBundle(configName, callback) {
	const config = require(path.join(process.env.PWD, configName));
	webpack(config, (error, {stats}) => {
		if (error) {
			callback(error);
			return;
		}
		const errors = stats.reduce((acc, {compilation: {errors}}) => {
			if (errors) {
				acc.push(...errors);
			}
			return acc;
		}, []);
		const [firstError, ...remainingErrors] = errors;
		if (firstError) {
			remainingErrors.forEach(console.log.bind(console));
			callback(firstError);
		}
		console.log(stats.toString({colors: true}));
		callback();
	});
}

gulp.task('build:webpack.prod', callback => {
	createBundle('webpack.prod', callback);
});

gulp.task('build:webpack.dev', callback => {
	createBundle('webpack.dev', callback);
});

gulp.task('build:clean', function() {
	// Remove everything inside "dist" recursively, except "dist"
	// itself, and its .gitignore.
	return del(
		[
			path.join(Constants.distFolder, '**'),
			`!${Constants.distFolder}`,
			`!${path.join(Constants.distFolder, '.gitignore')}`
		],
		{force: true}
	);
});

gulp.task('build:demo', function() {
	return gulp
		.src(path.join(__dirname, '..', 'demo', 'index.html'))
		.pipe(gulp.dest(Constants.distFolder));
});

gulp.task('build:ckeditor', function() {
	return gulp
		.src(path.join(Constants.rootDir, 'lib', 'ckeditor', '/**'))
		.pipe(gulp.dest(Constants.editorDistFolder));
});

gulp.task('build:strip', function() {
	return del(
		[
			path.join(Constants.editorDistFolder, 'adapters'),
			path.join(Constants.editorDistFolder, 'CHANGES.md'),
			path.join(Constants.editorDistFolder, 'samples')
		],
		{force: true}
	);
});

gulp.task(
	'build:assets',
	gulp.series(
		gulp.parallel('build:clean'),
		gulp.parallel(
			'css:build',
			'build:ckeditor',
			'languages:copy',
			'icons:copy'
		),
		gulp.parallel('build:demo', 'build:strip', ifRelease('css:minimize'))
	)
);

gulp.task(
	'build',
	gulp.series(
		gulp.parallel('build:assets'),
		gulp.parallel(ifRelease('build:webpack.prod'), 'build:webpack.dev')
	)
);
