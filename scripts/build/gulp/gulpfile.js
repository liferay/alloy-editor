const gulp = require('gulp');

require('./tasks/build');
require('./tasks/css');
require('./tasks/icons');
require('./tasks/languages');

gulp.task('default', ['build']);
