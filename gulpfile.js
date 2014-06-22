var compass = require('gulp-compass'),
	gulp = require('gulp'),
	path = require('path');

gulp.task('copy-js', function() {
	return gulp.src(path.resolve(__dirname + '/src/**/*.js'))
		.pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('copy-css', function() {
	return gulp.src(path.resolve(__dirname + '/src/**/*.css'))
		.pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('copy-fonts', function() {
	return gulp.src(path.resolve(__dirname + '/src/assets/font/fonts/**/*.*'))
		.pipe(gulp.dest(path.resolve(__dirname + '/dist/assets/font/fonts')));
});

gulp.task('compass', function() {
	return gulp.src(path.resolve(__dirname + '/src/**/*.scss'))
		.pipe(compass({
			project: path.resolve(__dirname + '/src/assets'),
			css: 'css',
			sass: 'sass'
		}));
	});

gulp.task('default', ['copy-js', 'copy-css', 'copy-fonts', 'compass']);