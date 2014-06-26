var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasksDir = requireDir('./gulp-tasks');

gulp.task('default', ['build']);