var argv = require('yargs').argv,
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    fs = require('fs'),
    gulp = require('gulp'),
    gulpif = require('gulp-if'),
    minifyCSS = require('gulp-minify-css'),
    path = require('path'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    runSequence = require('run-sequence'),
    template = require('gulp-template'),
    uglify = require('gulp-uglify');

gulp.task('clean', function() {
    rimraf(path.join(__dirname, 'dist'), function(err) {
        if (err) {
            console.log(err);
        }
    });
});

gulp.task('compass', function() {
    return gulp.src(path.join(__dirname, '/src/**/*.scss'))
        .pipe(compass({
            project: path.join(__dirname, '/src/assets'),
            css: 'css',
            sass: 'sass'
        }));
    });

gulp.task('copy-css', function() {
    return gulp.src(path.join(__dirname, '/src/**/*.css'))
        .pipe(gulp.dest(path.join(__dirname, '/dist')));
});

gulp.task('copy-fonts', function() {
    return gulp.src(path.join(__dirname, 'src/assets/font/fonts/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, 'dist/assets/font/fonts')));
});

gulp.task('copy-js', function() {
    return gulp.src(path.join(__dirname, 'src/**/*.js'))
        .pipe(gulpif(argv.compress, uglify()))
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('export-ckeditor', function() {
    var env = argv.env || 'default';

    if (env === 'default') {
        return gulp.src(path.join(__dirname, 'lib', 'ckeditor', '/**'))
            .pipe(gulp.dest(path.join(__dirname, 'dist', 'ckeditor')));
    }
});

gulp.task('export-env', function() {
    var yuiModules = fs.readFileSync(path.join(__dirname, 'config', 'yui-modules.js'));

    return gulp.src(path.join(__dirname, 'config', (argv.env || 'default') + '.template'))
        .pipe(template({
            modules: yuiModules
            }))
        .pipe(gulpif(argv.compress, uglify()))
        .pipe(rename('yui-config.js'))
        .pipe(gulp.dest(path.join(__dirname, 'dist')));
});

gulp.task('join-css', function() {
    var cssDir,
        fontDir;

    cssDir = path.join(__dirname, 'dist', 'assets', 'css');
    fontDir = path.join(__dirname, 'dist', 'assets', 'font');

    return gulp.src(
        [
            path.join(cssDir, 'lao-editor-core.css'),
            path.join(cssDir, 'skin', 'lao-editor-skin.css'),
            path.join(fontDir, 'font.css')
        ])
        .pipe(concat('lao-editor.css'))
        .pipe(gulpif(argv.compress, minifyCSS()))
        .pipe(gulp.dest(path.join(__dirname, 'dist', 'assets')));
});

gulp.task('default', function() {
    runSequence('clean', 'compass',
        ['copy-js', 'copy-css', 'copy-fonts', 'export-env', 'export-ckeditor'],
        'join-css');
});