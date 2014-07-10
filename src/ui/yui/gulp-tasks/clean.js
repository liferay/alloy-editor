var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),

    ROOT = path.join(__dirname, '..');

gulp.task('clean-tmp', function() {
	return gulp.src(path.join(ROOT, 'tmp'), {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-dist', function() {
	return gulp.src(path.join(ROOT, '..', '..', '..', 'dist'), {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-all', ['clean-tmp', 'clean-dist']);