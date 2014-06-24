var argv = require('yargs').argv,
    clean = require('gulp-clean'),
    compass = require('gulp-compass'),
    fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    template = require('gulp-template');

gulp.task('clean', function() {
    rimraf(path.join(__dirname, 'dist'), function(err) {
        console.log(err);
    });
});

gulp.task('compass', function() {
    return gulp.src(path.resolve(__dirname + '/src/**/*.scss'))
        .pipe(compass({
            project: path.resolve(__dirname + '/src/assets'),
            css: 'css',
            sass: 'sass'
        }));
    });

gulp.task('copy-css', function() {
    return gulp.src(path.resolve(__dirname + '/src/**/*.css'))
        .pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('copy-fonts', function() {
    return gulp.src(path.resolve(__dirname + '/src/assets/font/fonts/**/*.*'))
        .pipe(gulp.dest(path.resolve(__dirname + '/dist/assets/font/fonts')));
});

gulp.task('copy-js', function() {
    return gulp.src(path.resolve(__dirname + '/src/**/*.js'))
        .pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('export-ckeditor', function() {
    var env = argv.env || 'default';

    if (env === 'default') {
        return gulp.src(path.join(__dirname, 'lib', 'ckeditor', '/**'))
            .pipe(gulp.dest(path.join(__dirname, 'dist', 'ckeditor')));
    }
});

gulp.task('export-env', function() {
    var envConfig = JSON.parse(
        fs.readFileSync(
            path.join(__dirname, 'config', (argv.env || 'default') + '.json')));

    return gulp.src(path.join(__dirname, 'config', 'yui-config.js'))
        .pipe(template(envConfig))
        .pipe(gulp.dest(path.resolve(__dirname + '/dist')));
});

gulp.task('default', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'export-ckeditor']);
});