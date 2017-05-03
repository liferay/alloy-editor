'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var walk = require('walk');
var hashFiles = require('hash-files');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');
var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');
var reactLangDir = path.join(reactDir, 'lang');
var langDir = path.join(reactDir, 'src', 'assets', 'lang');
var ckeditorLangKeys = path.join(langDir, 'vendor', 'ckeditor.json');
var ckeditorLangContent = require(ckeditorLangKeys);

var hashSources = [
    path.join(rootDir, 'lib', 'lang/*.js'),
    ckeditorLangKeys,
    path.join(langDir + '/*.json')
];

var hashFile = path.join(reactDir, '_hash');

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
var getStringLangValue = function(value, lang) {
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

    var langWalker = walk.walk(reactLangDir);
    langWalker.on('end', callback);

    var defaultTranslations = require(path.join(langDir, 'en.json'));

    // Iterate over every existing lang file inside src/ui/react/lang/
    langWalker.on('file', function(root, fileStats, next) {
        var lang = path.basename(fileStats.name, '.js');

        // Load the matching CKEDITOR lang file with all the strings
        require(path.join(rootDir, 'lib', 'lang', fileStats.name));

        Object.keys(ckeditorLangContent).forEach(function (key) {
            AlloyEditor.Strings[key] = getStringLangValue(ckeditorLangContent[key], lang);
        });

        // Try to load translations for "lang"
        var translations;
        try {
            translations = require(path.join(langDir, lang + '.json'));
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
        fs.writeFile(path.join(reactDir, 'lang', fileStats.name),
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
    return gulp.src(path.join(reactDir, 'lang', '/**'))
        .pipe(gulp.dest(path.join(editorDistFolder, 'lang', 'alloy-editor')));
});