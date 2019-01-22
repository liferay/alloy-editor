const argv = require('yargs').argv;

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const template = require('gulp-template');
const webpack = require('webpack');
const Constants = require('../constants');

runSequence.options.ignoreUndefinedTasks = true;

function ifRelease(task) {
	return !!argv.release && task;
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

gulp.task('webpack.prod', callback => {
	createBundle('webpack.prod', callback);
});

gulp.task('webpack.dev', callback => {
	createBundle('webpack.dev', callback);
});

gulp.task('build:assets', function(callback) {
	runSequence(
		'clean-dist',
		['build-css', 'copy-ckeditor', 'copy-languages', 'copy-svgs'],
		['build-demo', 'post-cleanup', ifRelease('minimize-css')],
		callback
	);
});

gulp.task('build', function(callback) {
	runSequence(
		'build:assets',
		[ifRelease('webpack.prod'), 'webpack.dev'],
		callback
	);
});

gulp.task('clean-dist', function() {
	// Remove everything inside "dist" recursively, except "dist"
	// itself, and its .gitignore.
	return del([
		path.join(Constants.distFolder, '**'),
		`!${Constants.distFolder}`,
		`!${path.join(Constants.distFolder, '.gitignore')}`
	], {force: true});
});

gulp.task('build-demo', function() {
	var templateHead;

	if (argv.release) {
		templateHead = 'head-release.template';
	} else {
		templateHead = 'head-dev.template';
	}

	return gulp
		.src([path.join('./demo', 'index.html')])
		.pipe(
			template({
				resources: fs
					.readFileSync(path.join('./template', templateHead))
					.toString()
			})
		)
		.pipe(gulp.dest(path.join(Constants.distFolder)));
});

gulp.task('copy-ckeditor', function() {
	return gulp
		.src(path.join(Constants.rootDir, 'lib', 'ckeditor', '/**'))
		.pipe(gulp.dest(Constants.editorDistFolder));
});

gulp.task('post-cleanup', function() {
	return del(
		[
			path.join(Constants.editorDistFolder, 'adapters'),
			path.join(Constants.editorDistFolder, 'CHANGES.md'),
			path.join(Constants.editorDistFolder, 'samples')
		],
		{force: true}
	);
});
