const argv = require('yargs').argv;

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const run = require('parallel-webpack').run;
const path = require('path');
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

let haveShownHint = false;

function createBundle(configName) {
	const config = path.join(__dirname, '../../../..', `${configName}.js`);
	const showStats = !!process.env.STATS;
	if (!showStats && !haveShownHint) {
		console.log(
			'\nNot showing webpack stats; run with `env STATS=1` to show\n'
		);
		haveShownHint = true;
	}

	return run(config, {
		watch: false,
		maxRetries: 1,
		stats: showStats,
		maxConcurrentWorkers: 4,
	})
		.then(results => {
			if (results) {
				results.forEach(result => {
					let parsed;
					try {
						// Expect an object with "errors", "warnings" etc keys. Not
						// currently using it for anything but leaving this here as
						// documentation.
						JSON.parse(result);
					} catch (e) {
						console.warn('Unable to parse worker result!');
					}
				});
			}
		})
		.catch(error => {
			if (error.message) {
				// parallel-webpack seems to throw errors that are not Error
				// instances, and they get logged by gulp as "Error: [object
				// Object]", so wrap them here to make them useful.
				throw new Error(error.message);
			} else {
				throw error;
			}
		});
}

gulp.task('build:webpack.prod', () => {
	return createBundle('webpack.prod');
});

gulp.task('build:webpack.dev', () => {
	return createBundle('webpack.dev');
});

gulp.task('build:clean', function() {
	// Remove everything inside "dist" recursively, except "dist"
	// itself, and its .gitignore.
	return del(
		[
			path.join(Constants.distFolder, '**'),
			`!${Constants.distFolder}`,
			`!${path.join(Constants.distFolder, '.gitignore')}`,
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
			path.join(Constants.editorDistFolder, 'samples'),
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
