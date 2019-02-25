/**
 * Dynamically produces a list of imports so that Karma can produce a single
 * webpack bundle containing all the source files and tests.
 *
 * There are almost two hundred files matching the "files" patterns
 * defined in karma.common.js, and almost all of them get passed through
 * webpack, effectively creating hundreds of bundles. This is a problem
 * because every bundle contains its own copy of its dependencies,
 * which means that we download, parse and exectue around 65 MB of
 * JavaScript just to run the tests. We also wind up with literally
 * dozens of copies of React (and other dependencies) on the page, and
 * this breaks a lot of functionality that relies on object identity and
 * module-internal state.
 *
 * This script solves the problem by dynamically generating the source code to
 * perform all the necessary `import` statements to create a single bundle. The
 * webpack "val-loader" is used to obtain the result. This gist shows
 * some sample output:
 *
 * https://gist.github.com/wincent/42f787a6999c8cbed503f9a296401987
 *
 * NOTE: This file is processed before Babel transforms are applied, so
 * it stays within ES5.
 */

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');

/**
 * Takes a file path pattern that may contain globs (eg. "a/b/*.js") and
 * returns a regular expression capable of identifying matching paths.
 */
function globPatternToRegExp(pattern) {
	return new RegExp('^' + pattern.replace(/\*/g, '[^/]*') + '$');
}

module.exports = function() {
	var sources = [
		'test/lib/globals.js',
		'test/lib/utils.js',
		'test/lib/karma-overrides.js',
		'test/lib/mocha.js',
		'src/adapter/main.js',
		'src/core/debounce.js',
		'src/core/link.js',
		'src/core/plugins.js',
		'src/core/selection-region.js',
		'src/core/table.js',
		'src/core/tools.js',
		'src/core/uicore.js',
		'src/plugins/*.js',
		'src/components/uibridge/*.js*',
		'src/oop/lang.js',
		'src/oop/oop.js',
		'src/oop/attribute.js',
		'src/oop/base.js',
		'src/selections/selection-arrowbox.js',
		'src/selections/selection-position.js',
		'src/selections/selection-test.js',
		'src/selections/selections.js',
		'src/adapter/core.js',
		'src/components/base/*.js*',
		'src/components/buttons/*.js*',
		'src/components/toolbars/*.js*',
		'src/components/main.js*',
		'src/__generated__/lang/en.js',
		'test/core/test/*.js*',
		'test/plugins/test/*.js*',
		'test/ui/test/*.js*',
	];

	var code = '';

	sources.forEach(function(source) {
		if (source.indexOf('*') === -1) {
			code += "import '../" + source + "';\n";
		} else {
			var regExp = globPatternToRegExp(source);
			var directory = path.dirname(source);
			var entries = fs.readdirSync(path.join(ROOT, directory));

			entries.forEach(function(entry) {
				var name = path.join(directory, entry.toString());
				if (regExp.test(name)) {
					code += "import '../" + name + "';\n";
				}
			});
		}
	});

	return {code: code};
};
