var gulp = require('gulp');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');
var path = require('path');

console.log(path.resolve(__dirname + 'src/selection-region.js'));

gulp.task('selection-region-ckeditor-plugin', function() {
	return gulp.src(path.resolve(__dirname + '/src/selection-region.js'))
		.pipe(wrap({ src: 'templates/selection-region-ckeditor-plugin.template'}))
	    .pipe(rename('selection-region-plugin.js'))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['selection-region-ckeditor-plugin']);