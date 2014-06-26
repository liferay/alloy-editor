var concat = require('gulp-concat'),
    gulp = require('gulp'),
    path = require('path'),

    ROOT = path.join(__dirname, '..');

gulp.task('join-css', function() {
    var cssDir,
        fontDir;

    cssDir = path.join(ROOT, 'dist', 'assets', 'css');
    fontDir = path.join(ROOT, 'dist', 'assets', 'font');

    gulp.src(
        [
            path.join(cssDir, 'lao-editor-core.css'),
            path.join(cssDir, 'skin', 'lao-editor-skin.css'),
            path.join(fontDir, 'font.css')
        ])
        .pipe(concat('lao-editor.css'))
        .pipe(gulp.dest(path.join(ROOT, 'dist', 'assets')));

    return gulp.src(path.join(fontDir, 'fonts', '/**/*'))
        .pipe(gulp.dest(path.join(ROOT, 'dist', 'assets', 'fonts')));
});

gulp.task('join-plugins-config', function() {
  return gulp.src([
        path.join(ROOT, 'dist', 'yui-config.js'),
        path.join(ROOT, 'src', 'core', '/**/*.js'),
        path.join(ROOT, 'src', 'plugins', '/**/*.js')
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest(path.join(ROOT, 'dist')));
});
