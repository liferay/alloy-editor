const argv = require('yargs').argv;

const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const path = require('path');
const runSequence = require('run-sequence');
const template = require('gulp-template');
const Constants = require('../constants');

gulp.task('build', function(callback) {
	const tasks = ['build-demo', 'post-cleanup'];

	if (argv.release) {
		tasks.push('minimize-css');
	}

	runSequence(
		'clean-dist',
		['build-css', 'copy-ckeditor', 'copy-languages', 'copy-svgs'],
		tasks,
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
