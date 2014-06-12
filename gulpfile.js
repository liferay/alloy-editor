var gulp = require('gulp');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');
var path = require('path');

gulp.task('copy-js', function() {
	return gulp.src(path.resolve(__dirname + '/src/**/*.js'))
		.pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('selection-region-ckeditor-plugin', function() {
	return gulp.src(path.resolve(__dirname + '/src/selection-region.js'))
		.pipe(wrap({ src: path.resolve(__dirname + '/templates/selection-region-ckeditor-plugin.template')}))
	    .pipe(rename('selection-region-plugin.js'))
	    .pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('default', ['copy-js', 'selection-region-ckeditor-plugin']);