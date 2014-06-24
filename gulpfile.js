var clean = require('gulp-clean'),
    compass = require('gulp-compass'),
    gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence');

gulp.task('clean', function() {
    return gulp.src(path.resolve(__dirname + '/dist/**/*.*'), {read: false})
        .pipe(clean({force: true}));
});

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

gulp.task('default', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts']);
});