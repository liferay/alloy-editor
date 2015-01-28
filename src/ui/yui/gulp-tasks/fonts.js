'use strict';

var consolidate = require('gulp-consolidate'),
	gulp = require('gulp'),
	iconfont = require('gulp-iconfont'),
	rename = require("gulp-rename"),
	rimraf = require('gulp-rimraf'),

	fontName = 'alloyeditor',
	path = require('path'),
	ROOT = path.join(__dirname, '../src/assets');

gulp.task('clean-fonts', function() {
	return gulp.src(path.join(ROOT, 'font', 'fonts'), {read: false})
        .pipe(rimraf({force: true}));
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