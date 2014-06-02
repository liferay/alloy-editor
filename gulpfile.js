var gulp = require('gulp');

gulp.task('bindYUI', function() {
	var stream = gulp.src('core.js');

	var result = 'YUI.add(\'lreditor\', function (Y) {\n' + stream + '\nY.LREditorBase = Base;}, \'0.1\', { requires: [\'base\'] });';

	return result;
});

gulp.task('bindStandalone', function() {
	var stream = gulp.src('core.js');

	var result = 'var LREditorBase;\n(function() {\n' + stream + '\nLREditorBase = Base;\n}());';

	return result;
});

gulp.task('default', function() {
	gulp.task('bindYUI')
		.pipe(gulp.dest('./build/core-yui'));
});