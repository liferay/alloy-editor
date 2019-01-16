const gulp = require('gulp');

const Constants = require('../constants');
const path = require('path');
const fs = require('fs');

gulp.task('copy-svgs', function() {
    var iconsPath = path.join(Constants.rootDir, 'node_modules', 'clay-css', 'lib', 'images', 'icons', 'icons.svg');

    return gulp.src(iconsPath)
        .pipe(gulp.dest(path.join(Constants.editorDistFolder, 'assets', 'icons')));
});