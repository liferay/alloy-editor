var concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    gulp = require('gulp'),
    path = require('path'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence'),

    ROOT = path.join(__dirname, '..');

gulp.task('sass2css', function() {
    return gulp.src(path.join(ROOT, 'src', '**/*.scss'))
        .pipe(compass({
            project: path.join(ROOT, 'src', 'assets'),
            css: 'css',
            sass: 'sass'
        }));
});

gulp.task('copy-fonts', function() {
    return gulp.src(path.join(ROOT, 'src', 'assets', 'font', 'fonts', '/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp', '/assets', 'fonts')));
});

gulp.task('copy-fontcss', function() {
    return gulp.src(path.join(ROOT, 'src', 'assets', 'font', 'font.css'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp', 'assets')));
});

gulp.task('clean-fontcss', function() {
    return gulp.src(path.join(ROOT, 'tmp', 'assets', 'font'), {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('join-css', function() {
    var cssDir,
        fontDir;

    cssDir = path.join(ROOT, 'src', 'assets', 'css');
    fontDir = path.join(ROOT, 'tmp', 'assets');

    return gulp.src(
        [
            path.join(cssDir, '*.css'),
            path.join(cssDir, 'skin', '*.css'),
            path.join(fontDir, 'font.css')
        ])
        .pipe(concat('alloy-editor.css'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp', 'assets')));
});

gulp.task('make-css', function(callback) {
    runSequence('sass2css',
        ['copy-fonts', 'copy-fontcss'],
        'join-css', callback);
});