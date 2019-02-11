const Constants = require('../constants');
const gulp = require('gulp');
const path = require('path');

gulp.task('icons:copy', function copyIcons() {
	const iconsPath = path.join(
		Constants.rootDir,
		'node_modules',
		'clay-css',
		'lib',
		'images',
		'icons',
		'icons.svg'
	);

	return gulp
		.src(iconsPath)
		.pipe(
			gulp.dest(path.join(Constants.editorDistFolder, 'assets', 'icons'))
		);
});
