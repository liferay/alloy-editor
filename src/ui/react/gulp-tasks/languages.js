'use strict';

var gulp = require('gulp');

var fs = require('fs');
var path = require('path');
var walk = require('walk');

var rootDir = path.join(__dirname, '..', '..', '..', '..');
var reactDir = path.join(rootDir, 'src', 'ui', 'react');

var distFolder = path.join(rootDir, 'dist');
var editorDistFolder = path.join(distFolder, 'alloy-editor');

var currentLangTemplate = path.join(reactDir, 'language-template.js');
var processedLangTemplate = path.join(reactDir, '_processed_lang_keys.js');
var reactLangDir = path.join(reactDir, 'lang');

function errorHandler(error) {
  console.log(error.toString());

  this.emit('end');
}

/**
 * Compares a couple of string sets to find differences between them.
 *
 * @param {Object} oldStrings Old set of strings
 * @param {Object} newStrings New set of strings
 * @return {Object} An object with `added`, `deleted` and `updated` arrays of the strings that differ from
 * one set to the other.
 */
var compareStringSets = function(oldStrings, newStrings) {
    var diff;
    var added = [];
    var deleted = [];
    var updated = [];

    // Iterate over every old string tuple
    Object.keys(oldStrings).forEach(function(key) {
        // If it's not in the new set, it was deleted
        if (!Object.prototype.hasOwnProperty.call(newStrings, key)) {
            deleted.push({
                key: key,
                value: oldStrings[key]
            });
        } else {
            // If its value is different it was updated
            if (oldStrings[key] !== newStrings[key]) {
                updated.push({
                    key: key,
                    value: newStrings[key]
                });
            }

            // In any case, it is not a newly added string
            delete newStrings[key];
        }
    });

    // All remaining keys in newStrings have just been added
    Object.keys(newStrings).forEach(function(key) {
        added.push({
            key: key,
            value: newStrings[key]
        });
    });

    if (added.length || deleted.length || updated.length) {
        diff = {
            added: added,
            deleted: deleted,
            updated: updated
        };
    }

    return diff;
};

/**
 * Extract the strings from the contents of a language template.
 *
 * @param {String} langTemplateContent The language template content.
 * @return {Object} An object with all the template strings.
 */
var extractStrings = function(langTemplateContent) {
    var match;
    var langStrings = {};
    var langStringRegex = /\s*(.+):\s*(.+(?=(?:,|\s*})))/g;

    while ((match = langStringRegex.exec(langTemplateContent)) !== null) {
        langStrings[match[1]] = match[2];
    }

    return langStrings;
};

/**
 * Normalizes the different string values that can be stored in a language template.
 * @param  {String} value The stored value
 * @param  {String} lang  The language in which we want the value to be resolved
 * @return {String} The normalized string
 */
var getStringLangValue = function(value, lang) {
    if (value.indexOf("CKEDITOR.lang['{lang}']") === 0) {
        value = value.replace(/\{lang\}/, lang);
    }

    // Value can be at this point a string 'value' or a reference to a CKEDITOR lang property
    // 'CKEDITOR.lang['en'].table'. Eval will, in both cases, resolve the proper value.
    return eval(value);
};

/**
 * Walks over every existing lang file in the ui, applying the changes defined by the lang diff object.
 * @param  {Object}   langDiff A diff object as the one returned from the `compareStringSets` method.
 * @param  {Function} callback Callback to give the logic control back
 */
var updateLangFiles = function(langDiff, callback) {
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

    // Iterate over every existing lang file inside src/ui/react/lang/
    langWalker.on('file', function(root, fileStats, next) {
        var lang = path.basename(fileStats.name, '.js');

        // Load the matching CKEDITOR lang file with all the strings
        require(path.join(rootDir, 'lib', 'lang', fileStats.name));

        // Load the corresponding AlloyEditor lang file
        require(path.join(reactDir, 'lang', fileStats.name));

        // Update deleted strings
        langDiff.deleted.forEach(function(deletedString) {
            delete AlloyEditor.Strings[deletedString.key];
        });

        // Update added strings
        langDiff.added.forEach(function(newString) {
            AlloyEditor.Strings[newString.key] = getStringLangValue(newString.value, lang);
        });

        // Update changed strings
        langDiff.updated.forEach(function(updatedString) {
            AlloyEditor.Strings[updatedString.key] = getStringLangValue(updatedString.value, lang);
        });

        // Update the contents of the current lang file
        fs.writeFile(path.join(reactDir, 'lang', fileStats.name), 'AlloyEditor.Strings = ' + JSON.stringify(AlloyEditor.Strings) + ';', function(err) {
            if (err) {
                errorHandler(err);
            }

            next();
        });
    });
};

gulp.task('build-languages', function(callback) {
    // Load already processed strings
    fs.readFile(processedLangTemplate, {encoding:'utf8'}, function(err, processedLangTemplateContent) {
        if (err) {
            errorHandler(err);
        }

        fs.readFile(currentLangTemplate, {encoding:'utf8'}, function(err, currentLangTemplateContent) {
            if (err) {
                errorHandler(err);
            }

            // Extract the lang files string sets and compare one against the other
            var diff = compareStringSets(
                extractStrings(processedLangTemplateContent),
                extractStrings(currentLangTemplateContent)
            );

            if (!diff) {
                // Nothing changed, move on with the build
                callback();
            } else {
                // Update all lang files and overwrite the old lang template to mark all the updated strings
                // as valid and prevent further modifications once we're done with the updates.
                updateLangFiles(diff, function() {
                    fs.writeFile(processedLangTemplate, currentLangTemplateContent , function(err) {
                        if (err) {
                            errorHandler(err);
                        }

                        callback();
                    });
                });
            }
        });
    });
});

gulp.task('copy-languages', ['build-languages'], function() {
    return gulp.src(path.join(reactDir, 'lang', '/**'))
        .pipe(gulp.dest(path.join(editorDistFolder, 'lang', 'alloy-editor')));
});