var gulp = require('gulp'),
	path = require('path'),

    ROOT = path.join(__dirname, '..');

gulp.task('copy-css', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.css'))
        .pipe(gulp.dest(path.join(ROOT, 'dist')));
});

gulp.task('copy-fonts', function() {
    return gulp.src(path.join(ROOT, 'src/assets/font/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, 'dist/assets/font/fonts')));
});

gulp.task('copy-js', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.js'))
        .pipe(gulp.dest(path.join(ROOT, 'dist')));
});