var gulp = require('gulp');
var wrap = require('gulp-wrap');
var rename = require('gulp-rename');
var path = require('path');
var sass = require('gulp-sass');

gulp.task('copy-js', function() {
	return gulp.src(path.resolve(__dirname + '/src/**/*.js'))
		.pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('sass', function () {
    gulp.src(path.resolve(__dirname + '/src/**/*.scss'))
        .pipe(sass())
        .pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('default', ['copy-js', 'sass']);