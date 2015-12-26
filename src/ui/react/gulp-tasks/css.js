'use strict';

var concat = require('gulp-concat');
var del = require('del');
var es = require('event-stream');
var fs = require('fs');
var gulp = require('gulp');
var minifyCSS = require('gulp-cssnano');
var path = require('path');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

function errorHandler(error) {
    console.error(error.toString());

    this.emit('end');
}

function getFolders(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('sass2css', function() {
    return gulp.src(path.join(reactDir, 'src/assets/sass/**/main.scss'))
        .pipe(sass({
            includePaths: [
                path.join(rootDir, 'node_modules/bourbon/app/assets/stylesheets'),
                path.join(reactDir, 'src/assets/sass')
            ],
            onError: errorHandler.bind(this)
        }))
        .pipe(gulp.dest(path.join(editorDistFolder, 'assets/css')));
});

gulp.task('join-css', function() {
    var cssDir = path.join(editorDistFolder, 'assets/css');
    var skins = getFolders(path.join(editorDistFolder, 'assets/css/skin'));

    var tasks = skins.map(function(skin) {
        var skinFileName = 'alloy-editor-' + skin + '.css';
        var skinFontFileName = 'alloyeditor-font-' + skin + '.css';

        return gulp.src(
            [
                path.join(reactDir, 'src', 'assets', 'sass', 'skin', skin, '.font-cache', skinFontFileName),
                path.join(cssDir, 'skin', skin, 'main.css')
            ])
            .pipe(concat(skinFileName))
            .pipe(gulp.dest(path.join(editorDistFolder, 'assets')));
    });

    return es.concat.apply(null, tasks);
});

gulp.task('build-css', function(callback) {
    runSequence('generate-fonts', 'sass2css', 'join-css', 'clean-fonts', callback);
});

gulp.task('minimize-css', function() {
    return gulp.src(path.join(editorDistFolder, 'assets/*.css'))
        .pipe(minifyCSS())
        .pipe(rename({
            suffix: '-min'
        }))
        .pipe(gulp.dest(path.join(editorDistFolder, 'assets')));
});

gulp.task('clean-fonts', function(callback) {
    del([
        path.join(editorDistFolder, 'assets/css')
    ]).then(function() {
        callback();
    });
});