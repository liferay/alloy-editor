'use strict';

const {getFolders} = require('../utils');
const consolidate = require('gulp-consolidate');
const Constants = require('../constants');
const dircompare = require('dir-compare');
const es = require('event-stream');
const fs = require('fs');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const noop = require('gulp-empty');
const path = require('path');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

const shouldUpdateSkinIconFont = function(skin) {
    var updateIconFont = true;

    var skinFontDir = path.join(Constants.assetsDir, 'sass', 'skin', skin, '.font-cache');

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

const skins = getFolders(path.join(Constants.assetsDir, 'sass/skin'));

gulp.task('generate-fonts', function(callback) {
    runSequence('copy-icons', 'generate-icon-fonts', callback);
});

gulp.task('copy-icons', function() {
    var tasks = skins.map(function(skin) {
        return gulp.src(
            [
                path.join(Constants.assetsDir, 'icons', 'default', 'svg', '*.svg'),
                path.join(Constants.assetsDir, 'icons', skin, 'svg', '*.svg')
            ])
            .pipe(gulp.dest(path.join(Constants.assetsDir, 'sass', 'skin', skin, '.font-cache', 'tmp', 'icons')))
    });

    return es.concat.apply(null, tasks);
});

gulp.task('generate-icon-fonts', function() {
    var tasks = skins.map(function(skin) {
        var skinDir = path.join(Constants.assetsDir, 'sass', 'skin', skin);
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
                    gulp.src(path.join(Constants.assetsDir, 'font/font-icon-map-template.scss'))
                        .pipe(consolidate('lodash', {
                            glyphs: glyphs
                        }))
                        .pipe(rename({basename: 'font-icon-map'}))
                        .pipe(gulp.dest(skinFontDir));
                    gulp.src(path.join(Constants.assetsDir, 'font/font-template.css'))
                        .pipe(consolidate('lodash', {
                            fontName: fontName,
                            fontPath: 'fonts/',
                            glyphs: glyphs
                        }))
                        .pipe(rename({basename: 'alloyeditor-font-' + skin}))
                        .pipe(gulp.dest(path.join(skinFontDir)));
                })
                .pipe(gulp.dest(path.join(skinFontDir, 'fonts')))
                .pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets', 'fonts')));
        } else {
            // No need to regenerate the icon font, just copy to dist folder
            return gulp.src(path.join(skinFontDir, 'fonts', '*.*'))
                .pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets', 'fonts')));
        }
    });

    return es.concat.apply(null, tasks);
});
