'use strict';

var concat = require('gulp-concat'),
    compass = require('gulp-compass'),
    del = require('del'),
    es = require('event-stream'),
    fs = require('fs'),
    gulp = require('gulp'),
    path = require('path'),
    runSequence = require('run-sequence'),

    ROOT = path.join(__dirname, '..');

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

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

gulp.task('clean-fontcss', function(callback) {
    del([path.join(ROOT, 'tmp', 'assets', 'font')], callback);
});

gulp.task('join-css', function() {
    var cssDir,
        fontDir,
        skinsDir,
        skins;

    cssDir = path.join(ROOT, 'src', 'assets', 'css');
    fontDir = path.join(ROOT, 'tmp', 'assets');
    skinsDir = path.join(ROOT, 'src', 'assets', 'css', 'skin');

    skins = getFolders(skinsDir);

    var tasks = skins.map(function(skin) {
        return gulp.src(
            [
                path.join(cssDir, '*.css'),
                path.join(cssDir, 'skin', skin, '*.css'),
                path.join(fontDir, 'font.css')
            ])
            .pipe(concat('alloy-editor-' + skin + '.css'))
            .pipe(gulp.dest(path.join(ROOT, 'tmp', 'assets')));
    });

    return es.concat.apply(null, tasks);
});

gulp.task('make-css', function(callback) {
    runSequence('sass2css',
        ['copy-fonts', 'copy-fontcss'],
        'join-css', callback);
});