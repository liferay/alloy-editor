#!/usr/bin/env node

'use strict';

var fs = require('fs');
var path = require('path');
var minimatch = require('minimatch');
var program = require('commander');
var walk = require('walk');

var ckeditorFolder;

function createLang(lang) {
	fs.readFile(path.join(__dirname, 'language-template.js'), {encoding:'utf8'}, function(err, content) {
		if (err) {
			throw err;
		}

		content = content.replace(/\{lang\}/g, lang);

		fs.writeFile(path.join(__dirname, 'lang/') + lang + '.js', content, function(err) {
			if (err) {
				throw err;
			}

			require(path.join(__dirname, 'lang/') + lang + '.js');

			fs.writeFile(path.join(__dirname, 'lang/') + lang + '.js', 'AlloyEditor.Strings = ' + JSON.stringify(global.AlloyEditor.Strings) + ';', function(err) {
				if (err) {
					throw err;
				}
			});
		});
	});
}

function parseList(value) {
    return value.split(',').map(String);
}

function processLang(langFile) {
    require(langFile);

    var lang = path.basename(langFile, '.js');

    var langWalker = walk.walk(path.join(ckeditorFolder, 'plugins'));

    langWalker.on('file', function(root, fileStats, next) {
        var pluginLangFile = path.join(root, fileStats.name);
        if (minimatch(pluginLangFile, '**/' + lang + '.js', {dot: true})) {
        	require(pluginLangFile);

        	next();
        } else {
            next();
        }
    });

    langWalker.on('end', function() {
    	createLang(lang);
    });
}

program
    .usage('[options] <file ...>', parseList)
    .version(require('../../../package.json').version)
    .parse(process.argv);

global.CKEDITOR = {
    lang: {},
    plugins: {}
};

global.AlloyEditor = {};

// Copied from CKEditor
CKEDITOR.plugins.setLang = function(pluginName, languageCode, languageEntries) {
	var langEntries = CKEDITOR.lang[languageCode] = CKEDITOR.lang[languageCode] || {};

	langEntries[pluginName] = languageEntries;
};

ckeditorFolder = program.args[0];

var mainWalker = walk.walk(path.join(ckeditorFolder, 'lang'), {
    followLinks: false
});

mainWalker.on('file', function(root, fileStats, next) {
    var file = path.join(root, fileStats.name);

    if (minimatch(file, '**/*.js', {dot: true})) {
        processLang(file);

        next();
    } else {
        next();
    }
});