var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),

    ROOT = path.join(__dirname, '..');

gulp.task('clean', function() {
	return gulp.src(path.join(ROOT, 'dist'), { read: false })
        .pipe(rimraf({force: true}));
});