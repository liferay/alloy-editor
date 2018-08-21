'use strict';

var consolidate = require('gulp-consolidate');
var dircompare = require('dir-compare');
var es = require('event-stream');
var fs = require('fs');
var gulp = require('gulp');
var noop = require('gulp-empty');
var iconfont = require('gulp-iconfont');
var path = require('path');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var assetsDir = path.join(reactDir, 'src', 'assets');

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var shouldUpdateSkinIconFont = function(skin) {
    var updateIconFont = true;

    var skinFontDir = path.join(assetsDir, 'sass', 'skin', skin, '.font-cache');

    try {
        var iconDiffs = dircompare.compareSync(
            path.join(skinFontDir, 'icons'),
            path.join(skinFontDir, 'tmp', 'icons'),
            {
                compareContent: true,
                includeFilter: '*.svg'
            }
        );

        updateIconFont = !iconDiffs.same;

    } catch(err) { }

    return updateIconFont;
};

var getFolders = function(dir) {
    return fs.readdirSync(dir)
        .filter(function(file) {
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
};

var skins = getFolders(path.join(assetsDir, 'sass/skin'));

gulp.task('generate-fonts', function(callback) {
    runSequence('copy-icons', 'generate-icon-fonts', callback);
});

gulp.task('copy-icons', function() {
    var tasks = skins.map(function(skin) {
        return gulp.src(
            [
                path.join(assetsDir, 'icons', 'default', 'svg', '*.svg'),
                path.join(assetsDir, 'icons', skin, 'svg', '*.svg')
            ])
            .pipe(gulp.dest(path.join(assetsDir, 'sass', 'skin', skin, '.font-cache', 'tmp', 'icons')))
    });

    return es.concat.apply(null, tasks);
});

gulp.task('generate-icon-fonts', function() {
    var tasks = skins.map(function(skin) {
        var skinDir = path.join(assetsDir, 'sass', 'skin', skin);
        var skinFontDir = path.join(skinDir, '.font-cache');
        var fontName = 'alloyeditor-' + skin;

        if (shouldUpdateSkinIconFont(skin)) {
            return gulp.src(path.join(skinFontDir, 'tmp', 'icons', '*.svg'))
                .pipe(gulp.dest(path.join(skinFontDir, 'icons')))
                .pipe(iconfont({
                    formats: ['ttf', 'eot', 'woff', 'svg'],
                    fontName: fontName,
                    normalize: true
                }))
                .on('glyphs', function(glyphs, options) {
                    gulp.src(path.join(assetsDir, 'font/font-icon-map-template.scss'))
                        .pipe(consolidate('lodash', {
                            glyphs: glyphs
                        }))
                        .pipe(rename({basename: 'font-icon-map'}))
                        .pipe(gulp.dest(skinFontDir));
                    gulp.src(path.join(assetsDir, 'font/font-template.css'))
                        .pipe(consolidate('lodash', {
                            fontName: fontName,
                            fontPath: 'fonts/',
                            glyphs: glyphs
                        }))
                        .pipe(rename({basename: 'alloyeditor-font-' + skin}))
                        .pipe(gulp.dest(path.join(skinFontDir)));
                })
                .pipe(gulp.dest(path.join(skinFontDir, 'fonts')))
                .pipe(gulp.dest(path.join(editorDistFolder, 'assets', 'fonts')));
        } else {
            // No need to regenerate the icon font, just copy to dist folder
            return gulp.src(path.join(skinFontDir, 'fonts', '*.*'))
                .pipe(gulp.dest(path.join(editorDistFolder, 'assets', 'fonts')));
        }
    });

    return es.concat.apply(null, tasks);
});