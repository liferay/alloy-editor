'use strict';

var consolidate = require('gulp-consolidate'),
    del = require('del'),
    gulp = require('gulp'),
    iconfont = require('gulp-iconfont'),
    rename = require('gulp-rename'),

    fontName = 'alloyeditor',
    path = require('path'),
    ROOT = path.join(__dirname, '../src/assets');

gulp.task('clean-fonts', function(callback) {
    del([path.join(ROOT, 'font', 'fonts')], callback);
});

gulp.task('generate-fonts', function(){
    gulp.src([ path.join(ROOT, 'svg', '*.svg')])
        .pipe(iconfont({
            fontName: fontName,
            normalize: true
        }))
        .on('codepoints', function(codepoints) {
            gulp.src(path.join(ROOT, 'font', 'font-template.css'))
                .pipe(consolidate('lodash', {
                    fontName: fontName,
                    fontPath: 'fonts/',
                    glyphs: codepoints
                }))
                .pipe(rename({ basename: 'font'}))
                .pipe(gulp.dest(path.join(ROOT, 'font')));
        })
        .pipe(gulp.dest(path.join(ROOT, 'font', 'fonts')));
});

gulp.task('fonts', ['clean-fonts', 'generate-fonts', 'build']);