const gulp = require('gulp');
const path = require('path');
const requireDir = require('require-dir');

requireDir(path.join(__dirname, 'tasks'));

gulp.task('default', ['build']);
