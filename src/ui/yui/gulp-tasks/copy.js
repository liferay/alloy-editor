var argv = require('yargs').argv,
    concat = require('gulp-concat'),
	gulp = require('gulp'),
	path = require('path'),

    ROOT = path.join(__dirname, '..');

gulp.task('copy-css', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.css'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-fonts', function() {
    return gulp.src(path.join(ROOT, 'src/assets/font/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp/assets/font/fonts')));
});

gulp.task('copy-js', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.js'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-ckeditor', function(callback) {
    var env = argv.env || 'default';

    if (env === 'default') {
        return gulp.src(path.join(ROOT, '..', '..', '..', 'lib', 'ckeditor', '/**'))
            .pipe(gulp.dest(path.join(ROOT, 'tmp', 'ckeditor')));
    }
    else {
        callback();
    }
});

gulp.task('join-plugins-config', function() {
    var editorSRC = path.join(ROOT, '..', '..', '..', 'src');

    return gulp.src([
        path.join(editorSRC, 'core', '/**/*.js'),
        path.join(editorSRC, 'plugins', '/**/*.js'),
        path.join(ROOT, 'tmp', 'yui-config.js'),
        path.join(ROOT, 'src', 'core', '/**/*.js'),
        path.join(ROOT, 'src', 'plugins', '/**/*.js')
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-to-dist', function() {
    return gulp.src(path.join(ROOT, 'tmp', '/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, '..', '..', '..', 'dist')));
});