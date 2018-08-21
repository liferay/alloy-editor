'use strict';

var gulp = require('gulp');

var argv = require('yargs').argv;
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var del = require('del');
var fs = require('fs');
var path = require('path');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var template = require('gulp-template');
var uglify = require('gulp-uglify');
var yuidoc = require('gulp-yuidoc-relative');
var zip = require('gulp-zip');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var pkg = require(path.join(rootDir, 'package.json'));

var apiFolder = path.join(rootDir, 'api');
var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var srcFiles = require('../_src.js');

var regexCKEditor = /ckeditor(\\?).js/;

var regexReact = {
    production: {
        regex: '"development"\ !==\ \'production\'',
        replace: '"production"\ !==\ "production"'
    }
};

function errorHandler(error) {
  console.log(error.toString());

  this.emit('end');
}

gulp.task('build', function(callback) {
    runSequence(
        'clean-dist',
        [
            'build-css',
            'build-js',
            'copy-languages'
        ],
        [
            'copy-md',
            'create-alloy-editor-all',
            'create-alloy-editor-no-ckeditor',
            'create-alloy-editor-no-react'
        ],
        'build-demo',
        'post-cleanup',
        callback
    );
});

gulp.task('release', function(callback) {
    runSequence(
        'clean-api',
        'clean-dist',
        'create-react-all',
        'create-react-with-addons-all',
        [
            'build-api',
            'build-css',
            'build-js',
            'copy-languages'
        ],
        [
            'copy-md',
            'minimize-alloy-editor-core',
            'minimize-alloy-editor-main',
            'minimize-alloy-editor-ui',
            'minimize-css',
            'minimize-react'
        ],
        [
            'create-alloy-editor-all',
            'create-alloy-editor-all-min',
            'create-alloy-editor-no-ckeditor',
            'create-alloy-editor-no-ckeditor-min',
            'create-alloy-editor-no-react',
            'create-alloy-editor-no-react-min'
        ],
        'build-demo',
        'post-cleanup',
        callback
    );
});

gulp.task('build-api', function() {
    var parseOpts = {
        project: {
            name: pkg.name,
            description: pkg.description,
            version: pkg.version,
            url: pkg.homepage
        }
    };

    var renderOpts = {
        themedir: path.join(rootDir, 'api-theme')
    };

    gulp.src([
        path.join(rootDir, 'src/core/**/*.js'),
        path.join(rootDir, 'src/plugins/autolink.js'),
        path.join(rootDir, 'src/plugins/drop-images.js'),
        path.join(rootDir, 'src/plugins/placeholder.js'),
        path.join(reactDir, 'src/**/*.js*')
    ])
    .pipe(yuidoc(parseOpts, renderOpts))
    .pipe(gulp.dest(apiFolder));
});

gulp.task('build-demo', function() {
    var templateHead;

    if (argv._.indexOf('release') >= 0) {
        templateHead = 'head-release.template';
    }
    else {
        templateHead = 'head-dev.template';
    }

    return gulp.src([
            path.join(reactDir, 'demo', 'index.html'),
            path.join(reactDir, 'demo', 'bootstrap.css')
        ])
        .pipe(template({
            resources: fs.readFileSync(path.join(reactDir, 'template', templateHead)).toString()
        }))
        .pipe(gulp.dest(path.join(distFolder)));
});

gulp.task('build-js', function(callback) {
    runSequence([
        'copy-ckeditor',
        'create-alloy-editor-ui',
        'create-alloy-editor-main'
    ], 'wrap-alloy-editor-core', callback);
});

gulp.task('clean-api', function(callback) {
    del(apiFolder).then(function() {
        callback();
    });
});

gulp.task('clean-dist', function(callback) {
    del(distFolder).then(function() {
        callback();
    });
});

gulp.task('copy-ckeditor', function() {
    return gulp.src(path.join(rootDir, 'lib', 'ckeditor', '/**'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('copy-md', function() {
    return gulp.src(path.join(rootDir, '*.md'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-all', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui.js')).toString(),
            ckeditor: fs.readFileSync(path.join(editorDistFolder, 'ckeditor.js')).toString(),
            react: fs.readFileSync(path.join(reactDir, 'vendor', 'react-all.js')).toString(),
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(replace(regexCKEditor, 'alloy-editor-all$1.js'))
        .pipe(rename('alloy-editor-all.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-ckeditor', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui.js')).toString(),
            ckeditor: '',
            react: fs.readFileSync(path.join(reactDir, 'vendor', 'react-all.js')).toString(),
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(rename('alloy-editor-no-ckeditor.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-react', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui.js')).toString(),
            ckeditor: fs.readFileSync(path.join(editorDistFolder, 'ckeditor.js')).toString(),
            react: '',
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(replace(regexCKEditor, 'alloy-editor-no-react$1.js'))
        .pipe(rename('alloy-editor-no-react.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-all-min', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main-min.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui-min.js')).toString(),
            ckeditor: fs.readFileSync(path.join(editorDistFolder, 'ckeditor.js')).toString(),
            react: fs.readFileSync(path.join(reactDir, 'vendor', 'react-min.js')).toString(),
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(replace(regexCKEditor, 'alloy-editor-all-min$1.js'))
        .pipe(rename('alloy-editor-all-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-ckeditor-min', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main-min.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui-min.js')).toString(),
            ckeditor: '',
            react: fs.readFileSync(path.join(reactDir, 'vendor', 'react-min.js')).toString(),
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(rename('alloy-editor-no-ckeditor-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-no-react-min', function() {
    return gulp.src(path.join(reactDir, 'template/alloy-editor.template'))
        .pipe(template({
            alloyeditorMain: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main-min.js')).toString(),
            alloyeditorUI: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui-min.js')).toString(),
            ckeditor: fs.readFileSync(path.join(editorDistFolder, 'ckeditor.js')).toString(),
            react: '',
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(replace(regexCKEditor, 'alloy-editor-no-react-min$1.js'))
        .pipe(rename('alloy-editor-no-react-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-ui', function() {
    return gulp.src(srcFiles.ui, {cwd : rootDir + '/src'})
    .pipe(babel({
        presets: ['es2015', 'react']
    })).on('error', errorHandler)
    .pipe(concat('alloy-editor-ui.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-alloy-editor-main', function() {
    return gulp.src(srcFiles.main, {cwd : rootDir + '/src'})
    .pipe(babel({
        presets: ['es2015', 'react']
    })).on('error', errorHandler)
    .pipe(concat('alloy-editor-main.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('create-react-all', function() {
    if (!fs.existsSync(path.join(reactDir, 'vendor', 'react-all.js'))) {
        return gulp.src([
                path.join(reactDir, 'vendor', 'react.js'),
                path.join(reactDir, 'vendor', 'react-dom.js')
            ])
            .pipe(concat('react-all.js'))
            .pipe(gulp.dest(path.join(reactDir, 'vendor')));
    } else {
        return gulp.src([
            path.join(reactDir, 'vendor', 'react-all.js')
        ]);
    }
});

gulp.task('create-react-with-addons-all', function() {
    if (!fs.existsSync(path.join(reactDir, 'vendor', 'react-with-addons-all.js'))) {
        return gulp.src([
                path.join(reactDir, 'vendor', 'react-with-addons.js'),
                path.join(reactDir, 'vendor', 'react-dom.js')
            ])
            .pipe(concat('react-with-addons-all.js'))
            .pipe(gulp.dest(path.join(reactDir, 'vendor')));
    } else {
        return gulp.src([
            path.join(reactDir, 'vendor', 'react-with-addons-all.js')
        ]);
    }
});

gulp.task('release:zip', ['release'], function() {
    return gulp.src(path.join(distFolder, '/**'))
        .pipe(zip('alloy-editor-' + pkg.version + '.zip'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('minimize-alloy-editor-core', function() {
    return gulp.src([
            path.join(editorDistFolder, 'alloy-editor-core.js')
        ])
        .pipe(uglify())
        .pipe(rename('alloy-editor-core-min.js'))
        .pipe(gulp.dest(editorDistFolder));
});

gulp.task('minimize-alloy-editor-main', function() {
    return gulp.src(path.join(editorDistFolder, 'alloy-editor-main.js'))
    .pipe(uglify())
    .pipe(rename('alloy-editor-main-min.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('minimize-alloy-editor-ui', function() {
    return gulp.src(path.join(editorDistFolder, 'alloy-editor-ui.js'))
    .pipe(uglify())
    .pipe(rename('alloy-editor-ui-min.js'))
    .pipe(gulp.dest(editorDistFolder));
});

gulp.task('minimize-react', function() {
    if (!fs.existsSync(path.join(reactDir, 'vendor', 'react-min.js'))) {
        return gulp.src([
                path.join(reactDir, 'vendor', 'react-all.js')
            ])
            .pipe(replace(regexReact.production.regex, regexReact.production.replace))
            .pipe(uglify())
            .pipe(rename('react-min.js'))
            .pipe(gulp.dest(path.join(reactDir, 'vendor')));
    } else {
        return gulp.src([
            path.join(reactDir, 'vendor', 'react-min.js')
        ]);
    }
});

gulp.task('post-cleanup', function(callback) {
    del([
        path.join(editorDistFolder, 'adapters'),
        path.join(editorDistFolder, 'alloy-editor-main*.js'),
        path.join(editorDistFolder, 'alloy-editor-ui*.js'),
        path.join(editorDistFolder, 'CHANGES.md'),
        path.join(editorDistFolder, 'samples')
    ]).then(function() {
        callback();
    });
});

gulp.task('watch', ['build'], function () {
    gulp.watch('src/**/*', ['build']);
});

gulp.task('wrap-alloy-editor-core', function () {
    return gulp.src(path.join(reactDir, 'template/alloy-editor-core.template'))
        .pipe(template({
            ui: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-ui.js')).toString(),
            main: fs.readFileSync(path.join(editorDistFolder, 'alloy-editor-main.js')).toString(),
            reactBridge: fs.readFileSync(path.join(reactDir, 'vendor', 'react-bridge.js')).toString(),
            version: pkg.version
        }))
        .pipe(rename('alloy-editor-core.js'))
        .pipe(gulp.dest(editorDistFolder));
});