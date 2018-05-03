'use strict';

const Constants = require('../constants');
const fs = require('fs');
const gulp = require('gulp');
const hashFiles = require('hash-files');
const path = require('path');
const walk = require('walk');

const hashSources = [
    path.join(Constants.rootDir, 'lib', 'lang/*.js'),
    Constants.ckeditorLangKeys,
    path.join(Constants.langDir + '/*.json')
];

const hashFile = path.join('./', '_hash');

function errorHandler(error) {
  console.log(error.toString());

  this.emit('end');
}

/**
 * Normalizes the different string values that can be stored in a language template.
 * @param  {String} value The stored value
 * @param  {String} lang  The language in which we want the value to be resolved
 * @return {String} The normalized string
 */
const getStringLangValue = function(value, lang) {
    if (value.indexOf('.') !== -1) {
        value = 'CKEDITOR.lang["' + lang + '"].' + value.replace(/"/g, '');
    }

    // Value can be at this point a string 'value' or a reference to a CKEDITOR lang property
    // 'CKEDITOR.lang['en'].table'. Eval will, in both cases, resolve the proper value.
    return eval(value);
};

var updateLangFiles = function(callback) {

    // Mock the CKEDITOR.lang object to walk the ckeditor js lang files
    global.CKEDITOR = {
        lang: {}
    };

    // Mock AlloyEditor
    global.AlloyEditor = {
        Strings: {}
    };

    var langWalker = walk.walk(Constants.srcLangDir);
    langWalker.on('end', callback);

    var defaultTranslations = require(path.join(Constants.langDir, 'en.json'));

    // Iterate over every existing lang file inside src/lang
    langWalker.on('file', function(root, fileStats, next) {
        var lang = path.basename(fileStats.name, '.js');

        // Load the matching CKEDITOR lang file with all the strings
        require(path.join(Constants.rootDir, 'lib', 'lang', fileStats.name));

        Object.keys(Constants.ckeditorLangContent).forEach(function (key) {
            AlloyEditor.Strings[key] = getStringLangValue(Constants.ckeditorLangContent[key], lang);
        });

        // Try to load translations for "lang"
        var translations;
        try {
            translations = require(path.join(Constants.langDir, lang + '.json'));
        } catch (err) {
            console.log('translations not found for:', lang);
        }

        if (translations) {
            Object.keys(defaultTranslations).forEach(function (key) {
                AlloyEditor.Strings[key] = defaultTranslations[key];
            });

            Object.keys(translations).forEach(function (key) {
                AlloyEditor.Strings[key] = translations[key];
            });
        }

        // Update the contents of the current lang file
        fs.writeFile(path.join(Constants.rootDir, 'src', 'lang', fileStats.name),
            'AlloyEditor.Strings = ' + JSON.stringify(AlloyEditor.Strings) + ';',
            function(err) {
                if (err) {
                    errorHandler(err);
                }

                next();
            });
    });

};

function createHash(callback) {
    hashFiles({files: hashSources}, function (err, hash) {
        if (err) {
            return callback(err, null);
        }

        fs.writeFile(hashFile, hash, function (err) {
            if (err) {
                return callback(err, null);
            }
            callback(null, hash);
        });
    });
}

function compareHash(originalHash, callback) {
    hashFiles({files: hashSources}, function (err, hash) {
        if (err) {
            return callback(err, false);
        }

        var changed = originalHash !== hash;
        callback(changed);
    });
}

gulp.task('build-languages', function(callback) {
    var self = this;
    fs.exists(hashFile, function (exists) {
        if (!exists) {
            updateLangFiles(function () {
                createHash(callback);
            });
        } else {
            fs.readFile(hashFile, function (err, data) {
                if (err) {
                    console.error(err);
                    self.emit('end');
                    return;
                }

                compareHash(data.toString(), function (changed) {
                    if (changed) {
                        updateLangFiles(function () {
                            createHash(callback);
                        });
                    } else {
                        callback();
                    }
                });
            });
        }
    });
});

gulp.task('copy-languages', ['build-languages'], function() {
    return gulp.src(path.join(Constants.rootDir, 'src', 'lang', '/**'))
        .pipe(gulp.dest(path.join(Constants.editorDistFolder, 'lang', 'alloy-editor')));
});
