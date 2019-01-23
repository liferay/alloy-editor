import Core from './core.js';
import Lang from '../oop/lang.js';

import Buttons from '../components/buttons';
import Toolbars from '../components/toolbars';

import SelectionGetArrowBoxClasses from '../selections/selection-arrowbox';
import Selections from '../selections/selections';
import SelectionSetPosition from '../selections/selection-position';
import SelectionTest from '../selections/selection-test';

import Attribute from '../oop/attribute';
import extend from '../oop/oop';
import '../plugins';

// An object containing all currently registered plugins in AlloyEditor.
var BRIDGE_BUTTONS = {};

/**
 * Creates an instance of AlloyEditor.
 *
 * @memberof AlloyEditor
 * @method editable
 * @static
 * @param {String|Node} node The Node ID or HTMl node, which AlloyEditor should use as an editable area.
 * @param {Object} config Configuration attributes for the current instance of AlloyEditor.
 * @return {Object} An instance of {{#crossLink "Core"}}{{/crossLink}}
 */
const editable = function(node, config) {
	config = config || {};
	config.srcNode = node;

	AlloyEditor.implementEventTarget();

	return new Core(config);
};

/**
 * The full URL for the AlloyEditor installation directory.
 * It is possible to manually provide the base path by setting a
 * global variable named `ALLOYEDITOR_BASEPATH`. This global variable
 * must be set **before** the editor script loading.
 *
 * @memberof AlloyEditor
 * @method getBasePath
 * @static
 * @return {String} The found base path
 */
const getBasePath = function() {
	// Find out the editor directory path, based on its <script> tag.
	var path = window.ALLOYEDITOR_BASEPATH || '';

	if (!path) {
		var scripts = document.getElementsByTagName('script');

		for (var i = 0; i < scripts.length; i++) {
			var match = scripts[i].src.match(AlloyEditor.regexBasePath);

			if (match) {
				path = match[1];
				break;
			}
		}
	}

	// In IE (only) the script.src string is the raw value entered in the
	// HTML source. Other browsers return the full resolved URL instead.
	if (path.indexOf(':/') === -1 && path.slice(0, 2) !== '//') {
		// Absolute path.
		if (path.indexOf('/') === 0) {
			path = location.href.match(/^.*?:\/\/[^\/]*/)[0] + path;
		}
		// Relative path.
		else {
			path = location.href.match(/^[^\?]*\/(?:)/)[0] + path;
		}
	}

	if (!path) {
		throw 'The AlloyEditor installation path could not be automatically detected. Please set the global variable "ALLOYEDITOR_BASEPATH" before creating editor instances.';
	}

	return path;
};

/**
 * Detects and load the corresponding language file if AlloyEditor language strings are not already present.
 * The function fires a {{#crossLink "AlloyEditor/languageResourcesLoaded:event"}}{{/crossLink}} event
 *
 * @memberof AlloyEditor
 * @method loadLanguageResources
 * @static
 * @param {Function} callback Optional callback to be called when AlloyEditor loads the language resource.
 */
const loadLanguageResources = function(callback) {
	AlloyEditor.implementEventTarget();

	if (Lang.isFunction(callback)) {
		if (AlloyEditor.Strings) {
			setTimeout(callback, 0);
		} else {
			AlloyEditor.once('languageResourcesLoaded', function() {
				setTimeout(callback, 0);
			});
		}
	}

	if (!AlloyEditor._langResourceRequested) {
		AlloyEditor._langResourceRequested = true;

		var languages = [
			'af',
			'ar',
			'bg',
			'bn',
			'bs',
			'ca',
			'cs',
			'cy',
			'da',
			'de',
			'el',
			'en-au',
			'en-ca',
			'en-gb',
			'en',
			'eo',
			'es',
			'et',
			'eu',
			'fa',
			'fi',
			'fo',
			'fr-ca',
			'fr',
			'gl',
			'gu',
			'he',
			'hi',
			'hr',
			'hu',
			'id',
			'is',
			'it',
			'ja',
			'ka',
			'km',
			'ko',
			'ku',
			'lt',
			'lv',
			'mk',
			'mn',
			'ms',
			'nb',
			'nl',
			'no',
			'pl',
			'pt-br',
			'pt',
			'ro',
			'ru',
			'si',
			'sk',
			'sl',
			'sq',
			'sr-latn',
			'sr',
			'sv',
			'th',
			'tr',
			'tt',
			'ug',
			'uk',
			'vi',
			'zh-cn',
			'zh',
		];

		var userLanguage = navigator.language || navigator.userLanguage || 'en';

		var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
		var lang = parts[1];
		var locale = parts[2];

		if (languages.indexOf(lang + '-' + locale) >= 0) {
			lang = lang + '-' + locale;
		} else if (languages.indexOf(lang) === -1) {
			lang = 'en';
		}

		CKEDITOR.scriptLoader.load(
			AlloyEditor.getUrl('lang/alloy-editor/' + lang + '.js'),
			function(loaded) {
				if (loaded) {
					AlloyEditor.fire('languageResourcesLoaded');
				}
			},
			this
		);
	}
};

/**
 * Gets the full URL for AlloyEditor resources. By default, URLs
 * returned by this function contain a querystring parameter ("t")
 * set to the {@link CKEDITOR#timestamp} value.
 *
 * @memberof AlloyEditor
 * @method getUrl
 * @static
 * @param {String} resource The resource whose full URL we want to get.
 * It may be a full, absolute, or relative URL.
 * @return {String} The full URL.
 */
const getUrl = function(resource) {
	var basePath = AlloyEditor.getBasePath();

	// If this is not a full or absolute path.
	if (resource.indexOf(':/') === -1 && resource.indexOf('/') !== 0) {
		resource = basePath + resource;
	}

	// Add the timestamp, except for directories.
	if (
		CKEDITOR.timestamp &&
		resource.charAt(resource.length - 1) !== '/' &&
		!/[&?]t=/.test(resource)
	) {
		resource +=
			(resource.indexOf('?') >= 0 ? '&' : '?') +
			't=' +
			CKEDITOR.timestamp;
	}

	return resource;
};

/**
 * Implements event firing and subscribing via CKEDITOR.event.
 *
 * @memberof AlloyEditor
 * @method implementEventTarget
 * @static
 */
const implementEventTarget = function() {
	if (!AlloyEditor.fire && !AlloyEditor.on) {
		CKEDITOR.event.implementOn(AlloyEditor);
	}
};

/**
 * Regular expression which should match the script which have been used to load AlloyEditor.
 *
 * @memberof AlloyEditor
 * @property regexBasePath
 * @type {RegExp}
 * @static
 */
const regexBasePath = /(^|.*[\\\/])(?:alloy-editor[^/]+|alloy-editor)\.js(?:\?.*|;.*)?$/i;

/**
 * Fired when AlloyEditor detects the browser language and loads the corresponding language file. Once this event
 * is fired, AlloyEditor.Strings will be populated with data.
 *
 * @event languageResourcesLoaded
 */

/**
 * Returns the required plugin names needed for a given plugin
 * if it is already registered or an empty array.
 *
 * @memberof AlloyEditor
 * @method getButtons
 * @param {Array} buttons An array of buttons or plugin names.
 * @return {Function} A function that can be invoked to resolve the requested button names.
 * @static
 */
const getButtons = function(buttons) {
	return function() {
		return buttons.reduce(function(acc, val) {
			val = BRIDGE_BUTTONS[val] || [val];
			return acc.concat(val);
		}, []);
	};
};

/**
 * Register a button and try to get its required plugins.
 *
 * @memberof AlloyEditor
 * @method registerBridgeButton
 * @param {String} buttonName The name of the button.
 * @param {String} pluginName The name of the plugin that registers the button.
 * @static
 */
const registerBridgeButton = function(buttonName, pluginName) {
	if (!BRIDGE_BUTTONS[pluginName]) {
		BRIDGE_BUTTONS[pluginName] = [];
	}

	BRIDGE_BUTTONS[pluginName].push(buttonName);
};

/**
 * @method OOP
 * @memberof AlloyEditor
 */
const OOP = {
	extend,
};

export {
	Attribute,
	Buttons,
	Core,
	editable,
	getBasePath,
	getButtons,
	getUrl,
	implementEventTarget,
	Lang,
	loadLanguageResources,
	OOP,
	registerBridgeButton,
	SelectionGetArrowBoxClasses,
	Selections,
	SelectionSetPosition,
	SelectionTest,
	Toolbars,
};
