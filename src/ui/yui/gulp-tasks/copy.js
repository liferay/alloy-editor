var argv = require('yargs').argv,
    concat = require('gulp-concat'),
	gulp = require('gulp'),
    fs = require('fs'),
	path = require('path'),
    template = require('gulp-template'),

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

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(ROOT, '..', '..', '..', 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(path.join(ROOT, 'tmp', 'ckeditor')));
});

gulp.task('join-js', function() {
    var editorSRC = path.join(ROOT, '..', '..', '..', 'src');

    return gulp.src([
        path.join(editorSRC, 'core', '/**/*.js'),
        path.join(editorSRC, 'plugins', '/**/*.js'),
        path.join(ROOT, 'tmp', 'yui-config.js'),
        path.join(ROOT, 'src', 'core', '/**/*.js'),
        path.join(ROOT, 'src', 'plugins', '/**/*.js')
    ])
    .pipe(gulp.dest(path.join(ROOT, 'tmp', 'plugins')))
    .pipe(concat('all.js'))
    .pipe(gulp.dest(path.join(ROOT, 'tmp')));
});

gulp.task('copy-demo', function() {
    var pjson,
        templateHead;

    pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

    if (argv._.indexOf('release') >= 0) {
        templateHead = 'head-release.template';
    }
    else {
        templateHead = 'head-dev.template';
    }

    return gulp.src([
            path.join(ROOT, 'demo', 'index.html'),
            path.join(ROOT, 'demo', 'bootstrap.css'),
        ])
        .pipe(template({
            resources: fs.readFileSync(path.join(ROOT, 'config', templateHead))
        }))
        .pipe(gulp.dest(path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version)));
});

gulp.task('create-alloy-editor', function() {
    var pjson = require(path.join(ROOT, '..', '..', '..', 'package.json'));

    return gulp.src(path.join(ROOT, 'tmp', '/**/*.*'))
        .pipe(gulp.dest(path.join(ROOT, '..', '..', '..', 'dist', 'alloy-editor-' + pjson.version, 'alloy-editor')));
});