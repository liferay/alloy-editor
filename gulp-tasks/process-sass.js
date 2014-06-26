var compass = require('gulp-compass'),
    gulp = require('gulp'),
    path = require('path'),

    ROOT = path.join(__dirname, '..');

gulp.task('compass', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.scss'))
        .pipe(compass({
            project: path.join(ROOT, 'src/assets'),
            css: 'css',
            sass: 'sass'
        }));
});