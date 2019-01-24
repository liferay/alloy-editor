const gulp = require('gulp');

require('./tasks/build');

gulp.task('default', gulp.parallel('build'));
