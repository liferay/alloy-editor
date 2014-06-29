var concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence'),
    svgSprites = require('gulp-svg-sprites'),

    png = svgSprites.png,
    svg = svgSprites.svg,
    svgConfig,

    ROOT = path.join(__dirname, '..');

gulp.task('sass2css', function() {
    return gulp.src(path.join(ROOT, 'src/**/*.scss'))
        .pipe(compass({
            project: path.join(ROOT, 'src/assets'),
            css: 'css',
            sass: 'sass'
        }));
});

svgConfig = {
    className: '.icon-%f',
    generatePreview: false,
    pngPath: '%f',
    svgPath: '%f'
};

gulp.task('make-sprites', function () {
    return gulp.src(path.join(ROOT, 'src', 'assets', 'svg', '*.svg'))
        .pipe(svg(svgConfig)) // pass svgConfig option
        .pipe(gulp.dest(path.join(ROOT, 'dist', 'assets', 'svg')))
        .pipe(png());
});

gulp.task('copy-sprites', function() {
    var svgDir;

    svgDir = path.join(ROOT, 'dist', 'assets', 'svg');

    return gulp.src(path.join(svgDir, 'sprites', '/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, 'dist', 'assets', 'sprites')));
});

gulp.task('join-css', function() {
    var cssDir,
        svgDir;

    cssDir = path.join(ROOT, 'dist', 'assets', 'css');
    svgDir = path.join(ROOT, 'dist', 'assets', 'svg');

    return gulp.src(
        [
            path.join(cssDir, 'lao-editor-core.css'),
            path.join(cssDir, 'skin', 'lao-editor-skin.css'),
            path.join(svgDir, 'css', 'sprites.css')
        ])
        .pipe(concat('lao-editor.css'))
        .pipe(gulp.dest(path.join(ROOT, 'dist', 'assets')));
});

gulp.task('remove-svg-files', function() {
    var cssDir,
        svgDir;

    cssDir = path.join(ROOT, 'dist', 'assets', 'css');
    svgDir = path.join(ROOT, 'dist', 'assets', 'svg');

    return gulp.src([cssDir, svgDir], { read: false })
        .pipe(rimraf({force: true}));
});

gulp.task('make-css', function() {
    return runSequence('sass2css', 'make-sprites', 'copy-sprites', 'join-css', 'remove-svg-files');
});