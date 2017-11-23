/**
 * AlloyEditor v1.5.1
 *
 * Copyright 2014-present, Liferay, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the GNU LGPL-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function() {
    'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    // An object containing all currently registered plugins in AlloyEditor.

    var BRIDGE_BUTTONS = {};

    /**
     * AlloyEditor static object.
     *
     * @class AlloyEditor
     */
    var AlloyEditor = {
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
        editable: function editable(node, config) {
            config = config || {};
            config.srcNode = node;

            AlloyEditor.implementEventTarget();

            return new AlloyEditor.Core(config);
        },

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
        getBasePath: function getBasePath() {
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
        },

        /**
         * Detects and load the corresponding language file if AlloyEditor language strings are not already present.
         * The function fires a {{#crossLink "AlloyEditor/languageResourcesLoaded:event"}}{{/crossLink}} event
         *
         * @memberof AlloyEditor
         * @method loadLanguageResources
         * @static
         * @param {Function} callback Optional callback to be called when AlloyEditor loads the language resource.
         */
        loadLanguageResources: function loadLanguageResources(callback) {
            AlloyEditor.implementEventTarget();

            if (AlloyEditor.Lang.isFunction(callback)) {
                if (AlloyEditor.Strings) {
                    setTimeout(callback, 0);
                } else {
                    AlloyEditor.once('languageResourcesLoaded', function () {
                        setTimeout(callback, 0);
                    });
                }
            }

            if (!AlloyEditor._langResourceRequested) {
                AlloyEditor._langResourceRequested = true;

                var languages = ['af', 'ar', 'bg', 'bn', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'el', 'en-au', 'en-ca', 'en-gb', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fo', 'fr-ca', 'fr', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'is', 'it', 'ja', 'ka', 'km', 'ko', 'ku', 'lt', 'lv', 'mk', 'mn', 'ms', 'nb', 'nl', 'no', 'pl', 'pt-br', 'pt', 'ro', 'ru', 'si', 'sk', 'sl', 'sq', 'sr-latn', 'sr', 'sv', 'th', 'tr', 'tt', 'ug', 'uk', 'vi', 'zh-cn', 'zh'];

                var userLanguage = navigator.language || navigator.userLanguage || 'en';

                var parts = userLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/);
                var lang = parts[1];
                var locale = parts[2];

                if (languages.indexOf(lang + '-' + locale) >= 0) {
                    lang = lang + '-' + locale;
                } else if (languages.indexOf(lang) === -1) {
                    lang = 'en';
                }

                CKEDITOR.scriptLoader.load(AlloyEditor.getUrl('lang/alloy-editor/' + lang + '.js'), function (loaded) {
                    if (loaded) {
                        AlloyEditor.fire('languageResourcesLoaded');
                    }
                }, this);
            }
        },

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
        getUrl: function getUrl(resource) {
            var basePath = AlloyEditor.getBasePath();

            // If this is not a full or absolute path.
            if (resource.indexOf(':/') === -1 && resource.indexOf('/') !== 0) {
                resource = basePath + resource;
            }

            // Add the timestamp, except for directories.
            if (CKEDITOR.timestamp && resource.charAt(resource.length - 1) !== '/' && !/[&?]t=/.test(resource)) {
                resource += (resource.indexOf('?') >= 0 ? '&' : '?') + 't=' + CKEDITOR.timestamp;
            }

            return resource;
        },

        /**
         * Implements event firing and subscribing via CKEDITOR.event.
         *
         * @memberof AlloyEditor
         * @method implementEventTarget
         * @static
         */
        implementEventTarget: function implementEventTarget() {
            if (!AlloyEditor.fire && !AlloyEditor.on) {
                CKEDITOR.event.implementOn(AlloyEditor);
            }
        },

        /**
         * Regular expression which should match the script which have been used to load AlloyEditor.
         *
         * @memberof AlloyEditor
         * @property regexBasePath
         * @type {RegExp}
         * @static
         */
        regexBasePath: /(^|.*[\\\/])(?:alloy-editor[^/]+|alloy-editor)\.js(?:\?.*|;.*)?$/i,

        /**
         * And object, containing all currently registered buttons in AlloyEditor.
         *
         * @memberof AlloyEditor
         * @property Buttons
         * @type {Object}
         * @static
         */
        Buttons: {},

        /**
         * And object, containing all currently registered toolbars in AlloyEditor.
         *
         * @memberof AlloyEditor
         * @property Toolbars
         * @type {Object}
         * @static
         */
        Toolbars: {},

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
        getButtons: function getButtons(buttons) {
            return function () {
                return buttons.reduce(function (acc, val) {
                    val = BRIDGE_BUTTONS[val] || [val];
                    return acc.concat(val);
                }, []);
            };
        },

        /**
         * Register a button and try to get its required plugins.
         *
         * @memberof AlloyEditor
         * @method registerBridgeButton
         * @param {String} buttonName The name of the button.
         * @param {String} pluginName The name of the plugin that registers the button.
         * @static
         */
        registerBridgeButton: function registerBridgeButton(buttonName, pluginName) {
            if (!BRIDGE_BUTTONS[pluginName]) {
                BRIDGE_BUTTONS[pluginName] = [];
            }

            BRIDGE_BUTTONS[pluginName].push(buttonName);
        }
    };

    if (typeof module !== 'undefined' && _typeof(module.exports) === 'object') {
        module.exports = AlloyEditor;
    }

    if (typeof window !== 'undefined') {
        window.AlloyEditor = AlloyEditor;
    } else if (typeof global !== 'undefined') {
        global.AlloyEditor = AlloyEditor;
    } else if (typeof self !== 'undefined') {
        self.AlloyEditor = AlloyEditor;
    } else {
        this.AlloyEditor = AlloyEditor;
    }
})();

    var React = (function() {
    	return (0, eval)('this').React;
    }());

    if (typeof React === 'undefined') {
        React = AlloyEditor.React;
    }

    var ReactDOM = (function() {
        return (0, eval)('this').ReactDOM;
    }());

    if (typeof React === 'undefined') {
        ReactDOM = AlloyEditor.ReactDOM;
    }

     /**
  * React bridge between v16 and older version
  */
var PropTypes = (function() {
    return (0, eval)('this').PropTypes || React.PropTypes;
}());

var createReactClass = (function() {
    return (0, eval)('this').createReactClass || React.createClass;
}());    


    if (typeof window !== 'undefined') {
        'use strict';

(function () {
    'use strict';

    /**
     * Debounce util function. If a function execution is expensive, it might be debounced. This means
     * that it will be executed after some amount of time after its last call. For example, if we attach a
     * a function on scroll event, it might be called hundreds times per second. In this case it may be
     * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
     * scroll event.
     *
     * @memberof CKEDITOR.tools
     * @method debounce
     * @param {Array} args An array of arguments which the callback will receive.
     * @param {Function} callback The callback which has to be called after given timeout.
     * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
     * @param {Object} context The context in which the callback will be called. This argument is optional.
     * @static
     */

    CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function (callback, timeout, context, args) {
        var debounceHandle;

        var callFn = function callFn() {
            var callContext = context || this;

            clearTimeout(debounceHandle);

            var result = [];

            for (var len = arguments.length, startIndex = 0; startIndex < len; ++startIndex) {
                result.push(arguments[startIndex]);
            }

            var callArgs = result.concat(args || []);

            debounceHandle = setTimeout(function () {
                callback.apply(callContext, callArgs);
            }, timeout);
        };

        callFn.detach = function () {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    var REGEX_BOOKMARK_SCHEME = /^#.*/i;
    var REGEX_EMAIL_SCHEME = /^[a-z0-9\u0430-\u044F\._-]+@/i;
    var REGEX_URI_SCHEME = /^(?:[a-z][a-z0-9+\-.]*)\:|^\//i;

    /**
     * Link class utility. Provides methods for create, delete and update links.
     *
     * @class CKEDITOR.Link
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */
    function Link(editor, config) {
        this._editor = editor;
        this.appendProtocol = config && config.appendProtocol === false ? false : true;
    }

    Link.prototype = {
        constructor: Link,

        /**
         * Advances the editor selection to the next available position after a
         * given link or the one in the current selection.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method advanceSelection
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         */
        advanceSelection: function advanceSelection(link) {
            link = link || this.getFromSelection();

            var range = this._editor.getSelection().getRanges()[0];

            if (link) {
                range.moveToElementEditEnd(link);

                var nextNode = range.getNextEditableNode();

                if (nextNode && !this._editor.element.equals(nextNode.getCommonAncestor(link))) {
                    var whitespace = /\s/.exec(nextNode.getText());

                    var offset = whitespace ? whitespace.index + 1 : 0;

                    range.setStart(nextNode, offset);
                    range.setEnd(nextNode, offset);
                }
            }

            this._editor.getSelection().selectRanges([range]);
        },

        /**
         * Create a link with given URI as href.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method create
         * @param {Object} attrs A config object with link attributes. These might be arbitrary DOM attributes.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         * @param {String} URI The URI of the link.
         */
        create: function create(URI, attrs, modifySelection) {
            var selection = this._editor.getSelection();

            var range = selection.getRanges()[0];

            if (range.collapsed) {
                var text = new CKEDITOR.dom.text(URI, this._editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

            URI = this._getCompleteURI(URI);

            var linkAttrs = CKEDITOR.tools.merge({
                'data-cke-saved-href': URI,
                href: URI
            }, attrs);

            var style = new CKEDITOR.style({
                attributes: linkAttrs,
                element: 'a'
            });

            style.type = CKEDITOR.STYLE_INLINE;
            style.applyToRange(range, this._editor);

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection();
            } else {
                range.select();
            }
        },

        /**
         * Retrieves a link from the current selection.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved link or null if not found.
         */
        getFromSelection: function getFromSelection() {
            var selection = this._editor.getSelection();

            var selectedElement = selection.getSelectedElement();

            if (selectedElement && selectedElement.is('a')) {
                return selectedElement;
            }

            var range = selection.getRanges()[0];

            if (range) {
                range.shrink(CKEDITOR.SHRINK_TEXT);

                return this._editor.elementPath(range.getCommonAncestor()).contains('a', 1);
            }

            return null;
        },

        /**
         * Removes a link from the editor.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method remove
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        remove: function remove(link, modifySelection) {
            var editor = this._editor;

            if (link) {
                if (modifySelection && modifySelection.advance) {
                    this.advanceSelection();
                }

                link.remove(editor);
            } else {
                var style = new CKEDITOR.style({
                    alwaysRemoveElement: 1,
                    element: 'a',
                    type: CKEDITOR.STYLE_INLINE
                });

                // 'removeStyle()' removes the style from the editor's current selection.
                //  We need to force the selection to be the whole link element
                //  to remove it properly.

                var selection = editor.getSelection();
                selection.selectElement(selection.getStartElement());

                editor.removeStyle(style);
            }
        },

        /**
         * Updates the href of an already existing link.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method update
         * @param {CKEDITOR.dom.element} link The link element which href should be removed.
         * @param {Object|String} attrs The attributes to update or remove. Attributes with null values will be removed.
         * @param {Object} modifySelection A config object with an advance attribute to indicate if the selection should be moved after the link creation.
         */
        update: function update(attrs, link, modifySelection) {
            var instance = this;

            link = link || this.getFromSelection();

            if (typeof attrs === 'string') {
                var uri = instance._getCompleteURI(attrs);

                link.setAttributes({
                    'data-cke-saved-href': uri,
                    href: uri
                });
            } else if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) === 'object') {
                var removeAttrs = [];

                var setAttrs = {};

                Object.keys(attrs).forEach(function (key) {
                    if (attrs[key] === null) {
                        if (key === 'href') {
                            removeAttrs.push('data-cke-saved-href');
                        }

                        removeAttrs.push(key);
                    } else {
                        if (key === 'href') {
                            var uri = instance._getCompleteURI(attrs[key]);

                            setAttrs['data-cke-saved-href'] = uri;
                            setAttrs[key] = uri;
                        } else {
                            setAttrs[key] = attrs[key];
                        }
                    }
                });

                link.removeAttributes(removeAttrs);
                link.setAttributes(setAttrs);
            }

            if (modifySelection && modifySelection.advance) {
                this.advanceSelection(link);
            }
        },

        /**
         * Checks if the URI begins with a '#' symbol to determine if it's an on page bookmark.
         * If it doesn't, it then checks if the URI has an '@' symbol. If it does and the URI
         * looks like an email and doesn't have 'mailto:', 'mailto:' is added to the URI.
         * If it doesn't and the URI doesn't have a scheme, the default 'http' scheme with
         * hierarchical path '//' is added to the URI.
         *
         * @instance
         * @memberof CKEDITOR.Link
         * @method _getCompleteURI
         * @param {String} URI The URI of the link.
         * @protected
         * @return {String} The URI updated with the protocol.
         */
        _getCompleteURI: function _getCompleteURI(URI) {
            if (REGEX_BOOKMARK_SCHEME.test(URI)) {
                return URI;
            } else if (REGEX_EMAIL_SCHEME.test(URI)) {
                URI = 'mailto:' + URI;
            } else if (!REGEX_URI_SCHEME.test(URI)) {
                URI = this.appendProtocol ? 'http://' + URI : URI;
            }

            return URI;
        }
    };

    CKEDITOR.Link = CKEDITOR.Link || Link;
})();
'use strict';

(function () {
    'use strict';

    // Wraps each of the plugin lifecycle methods in a closure that will
    // set up the editor.__processingPlugin__ variable so it can be globally
    // accessed exposing the plugin being processed and the lifecycle phase
    // in which it is happening
    //
    // @param {Object} plugin The plugin to wrap lifecycle methods

    var wrapPluginLifecycle = function wrapPluginLifecycle(plugin) {
        var methods = ['beforeInit', 'init', 'afterInit'];

        methods.forEach(function (methodName) {
            if (plugin[methodName]) {
                plugin[methodName] = CKEDITOR.tools.override(plugin[methodName], function (originalPluginMethod) {
                    var payload = {
                        phase: methodName,
                        plugin: plugin
                    };

                    return function (editor) {
                        editor.__processingPlugin__ = payload;

                        originalPluginMethod.call(this, editor);

                        editor.__processingPlugin__ = null;
                    };
                });
            }
        });
    };

    /**
     * CKEDITOR.plugins class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.plugins
     */

    /**
     * Overrides CKEDITOR.plugins.load method so we can extend the lifecycle methods of
     * the loaded plugins to add some metainformation about the plugin being processed
     *
    * @param {String/Array} names The name of the resource to load. It may be a
    * string with a single resource name, or an array with several names.
    * @param {Function} callback A function to be called when all resources
    * are loaded. The callback will receive an array containing all loaded names.
    * @param {Object} [scope] The scope object to be used for the callback call.
     * @memberof CKEDITOR.plugins
     * @method load
     * @static
     */
    CKEDITOR.plugins.load = CKEDITOR.tools.override(CKEDITOR.plugins.load, function (pluginsLoad) {
        // Wrap original load function so we can transform the plugin input parameter
        // before passing it down to the original callback
        return function (names, callback, scope) {
            pluginsLoad.call(this, names, function (plugins) {
                if (callback) {
                    Object.keys(plugins).forEach(function (pluginName) {
                        wrapPluginLifecycle(plugins[pluginName]);
                    });

                    callback.call(scope, plugins);
                }
            });
        };
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_selectionregion')) {
        return;
    }

    CKEDITOR.SELECTION_TOP_TO_BOTTOM = 0;
    CKEDITOR.SELECTION_BOTTOM_TO_TOP = 1;
    CKEDITOR.SELECTION_LEFT_TO_RIGHT = 2;
    CKEDITOR.SELECTION_RIGHT_TO_LEFT = 3;

    /**
     * SelectionRegion utility class which provides metadata about the selection. The metadata may be the start and end
     * rectangles, caret region, etc. **This class is not intended to be used standalone. Its functions will
     * be merged into each editor instance, so the developer may use them directly via the editor, without making
     * an instance of this class**.
     *
     * @class SelectionRegion
     * @constructor
     */
    function SelectionRegion() {}

    SelectionRegion.prototype = {
        constructor: SelectionRegion,

        /**
         * Creates selection from two points in page coordinates.
         *
         * @instance
         * @memberof SelectionRegion
         * @method createSelectionFromPoint
         * @param {Number} x X point in page coordinates.
         * @param {Number} y Y point in page coordinates.
         */
        createSelectionFromPoint: function createSelectionFromPoint(x, y) {
            this.createSelectionFromRange(x, y, x, y);
        },

        /**
         * Creates selection from range. A range consists from two points in page coordinates.
         *
         * @instance
         * @memberof SelectionRegion
         * @method createSelectionFromRange
         * @param {Number} startX X coordinate of the first point.
         * @param {Number} startY Y coordinate of the first point.
         * @param {Number} endX X coordinate of the second point.
         * @param {Number} endY Y coordinate of the second point.
         */
        createSelectionFromRange: function createSelectionFromRange(startX, startY, endX, endY) {
            var end;
            var endContainer;
            var endOffset;
            var range;
            var start;
            var startContainer;
            var startOffset;

            if (typeof document.caretPositionFromPoint === 'function') {
                start = document.caretPositionFromPoint(startX, startY);
                end = document.caretPositionFromPoint(endX, endY);

                startContainer = start.offsetNode;
                endContainer = end.offsetNode;

                startOffset = start.offset;
                endOffset = end.offset;

                range = this.createRange();
            } else if (typeof document.caretRangeFromPoint === 'function') {
                start = document.caretRangeFromPoint(startX, startY);
                end = document.caretRangeFromPoint(endX, endY);

                startContainer = start.startContainer;
                endContainer = end.startContainer;

                startOffset = start.startOffset;
                endOffset = end.startOffset;

                range = this.createRange();
            }

            if (range && document.getSelection) {
                range.setStart(new CKEDITOR.dom.node(startContainer), startOffset);
                range.setEnd(new CKEDITOR.dom.node(endContainer), endOffset);

                this.getSelection().selectRanges([range]);
            } else if (typeof document.body.createTextRange === 'function') {
                var selection = this.getSelection();

                selection.unlock();

                range = document.body.createTextRange();
                range.moveToPoint(startX, startY);

                var endRange = range.duplicate();
                endRange.moveToPoint(endX, endY);

                range.setEndPoint('EndToEnd', endRange);
                range.select();

                this.getSelection().lock();
            }
        },

        /**
         * Returns the region of the current position of the caret. The points are in page coordinates.
         *
         * @instance
         * @memberof SelectionRegion
         * @method getCaretRegion
         * @return {Object} Returns object with the following properties:
         * - bottom
         * - left
         * - right
         * - top
         */
        getCaretRegion: function getCaretRegion() {
            var selection = this.getSelection();

            var region = {
                bottom: 0,
                left: 0,
                right: 0,
                top: 0
            };

            var bookmarks = selection.createBookmarks();

            if (!bookmarks.length) {
                return region;
            }

            var bookmarkNodeEl = bookmarks[0].startNode.$;

            bookmarkNodeEl.style.display = 'inline-block';

            region = new CKEDITOR.dom.element(bookmarkNodeEl).getClientRect();

            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);

            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

            region.bottom = scrollPos.y + region.bottom;
            region.left = scrollPos.x + region.left;
            region.right = scrollPos.x + region.right;
            region.top = scrollPos.y + region.top;

            return region;
        },

        /**
         * Returns data for the current selection.
         *
         * @instance
         * @memberof SelectionRegion
         * @method getSelectionData
         * @return {Object|null} Returns an object with the following data:
         * - element - The currently selected element, if any
         * - text - The selected text
         * - region - The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionRegion:method"}}{{/crossLink}}
         */
        getSelectionData: function getSelectionData() {
            var selection = this.getSelection();

            if (!selection.getNative()) {
                return null;
            }

            var result = {
                element: selection.getSelectedElement(),
                text: selection.getSelectedText()
            };

            result.region = this.getSelectionRegion(selection);

            return result;
        },

        /**
         * Returns the region of the current selection.
         *
         * @instance
         * @memberof SelectionRegion
         * @method getSelectionRegion
         * @return {Object} Returns object which is being returned from
         * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getClientRectsRegion:method"}}{{/crossLink}} with three more properties:
         * - direction - the direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * - height - The height of the selection region
         * - width - The width of the selection region
         */
        getSelectionRegion: function getSelectionRegion() {
            var region = this.getClientRectsRegion();

            region.direction = this.getSelectionDirection();

            region.height = region.bottom - region.top;
            region.width = region.right - region.left;

            return region;
        },

        /**
         * Returns true if the current selection is empty, false otherwise.
         *
         * @instance
         * @memberof SelectionRegion
         * @method isSelectionEmpty
         * @return {Boolean} Returns true if the current selection is empty, false otherwise.
         */
        isSelectionEmpty: function isSelectionEmpty() {
            var ranges;

            var selection = this.getSelection();

            return selection.getType() === CKEDITOR.SELECTION_NONE || (ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed;
        },

        /**
         * Returns object with data about the [client rectangles](https://developer.mozilla.org/en-US/docs/Web/API/Element.getClientRects) of the selection,
         * normalized across browses. All offsets below are in page coordinates.
         *
         * @instance
         * @memberof SelectionRegion
         * @method getClientRectsRegion
         * @return {Object} Returns object with the following data:
         * - bottom - bottom offset of all client rectangles
         * - left - left offset of all client rectangles
         * - right - right offset of all client rectangles
         * - top - top offset of all client rectangles
         * - startRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         * - endRect - An Object, which contains the following information:
         *     + bottom - bottom offset
         *     + height - the height of the rectangle
         *     + left - left offset of the selection
         *     + right - right offset of the selection
         *     + top - top offset of the selection
         *     + width - the width of the rectangle
         *
         * If there is no native selection, the objects will be filled with 0.
         */
        getClientRectsRegion: function getClientRectsRegion() {
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            var defaultRect = {
                bottom: 0,
                height: 0,
                left: 0,
                right: 0,
                top: 0,
                width: 0
            };

            var region = {
                bottom: 0,
                endRect: defaultRect,
                left: 0,
                right: 0,
                top: 0,
                startRect: defaultRect
            };

            if (!nativeSelection) {
                return region;
            }

            var bottom = 0;
            var clientRects;
            var left = Infinity;
            var rangeCount;
            var right = -Infinity;
            var top = Infinity;

            if (nativeSelection.createRange) {
                clientRects = nativeSelection.createRange().getClientRects();
            } else {
                rangeCount = nativeSelection.rangeCount;
                clientRects = nativeSelection.rangeCount > 0 ? nativeSelection.getRangeAt(0).getClientRects() : [];
            }

            if (clientRects.length === 0) {
                region = this.getCaretRegion();
            } else {
                for (var i = 0, length = clientRects.length; i < length; i++) {
                    var item = clientRects[i];

                    if (item.left < left) {
                        left = item.left;
                    }

                    if (item.right > right) {
                        right = item.right;
                    }

                    if (item.top < top) {
                        top = item.top;
                    }

                    if (item.bottom > bottom) {
                        bottom = item.bottom;
                    }
                }

                var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

                region.bottom = scrollPos.y + bottom;
                region.left = scrollPos.x + left;
                region.right = scrollPos.x + right;
                region.top = scrollPos.y + top;

                if (clientRects.length) {
                    var endRect = clientRects[clientRects.length - 1];
                    var startRect = clientRects[0];

                    region.endRect = {
                        bottom: scrollPos.y + endRect.bottom,
                        height: endRect.height,
                        left: scrollPos.x + endRect.left,
                        right: scrollPos.x + endRect.right,
                        top: scrollPos.y + endRect.top,
                        width: endRect.width
                    };

                    region.startRect = {
                        bottom: scrollPos.y + startRect.bottom,
                        height: startRect.height,
                        left: scrollPos.x + startRect.left,
                        right: scrollPos.x + startRect.right,
                        top: scrollPos.y + startRect.top,
                        width: startRect.width
                    };
                }
            }

            return region;
        },

        /**
         * Retrieves the direction of the selection. The direction is from top to bottom or from bottom to top.
         * For IE < 9 it is not possible, so the direction for these browsers will be always CKEDITOR.SELECTION_TOP_TO_BOTTOM.
         *
         * @instance
         * @memberof SelectionRegion
         * @method getSelectionDirection
         * @return {Number} Returns a number which represents selection direction. It might be one of these:
         * - CKEDITOR.SELECTION_TOP_TO_BOTTOM;
         * - CKEDITOR.SELECTION_BOTTOM_TO_TOP;
         */
        getSelectionDirection: function getSelectionDirection() {
            var direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            if (!nativeSelection) {
                return direction;
            }

            var anchorNode;

            if ((anchorNode = nativeSelection.anchorNode) && anchorNode.compareDocumentPosition) {
                var position = anchorNode.compareDocumentPosition(nativeSelection.focusNode);

                if (!position && nativeSelection.anchorOffset > nativeSelection.focusOffset || position === Node.DOCUMENT_POSITION_PRECEDING) {
                    direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
                }
            }

            return direction;
        }
    };

    CKEDITOR.plugins.add('ae_selectionregion', {
        init: function init(editor) {
            var attr, hasOwnProperty;

            hasOwnProperty = Object.prototype.hasOwnProperty;

            for (attr in SelectionRegion.prototype) {
                if (hasOwnProperty.call(SelectionRegion.prototype, attr) && typeof editor[attr] === 'undefined') {
                    editor[attr] = SelectionRegion.prototype[attr];
                }
            }
        }
    });
})();
'use strict';

(function () {
    'use strict';

    var IE_NON_DIRECTLY_EDITABLE_ELEMENT = {
        'table': 1,
        'col': 1,
        'colgroup': 1,
        'tbody': 1,
        'td': 1,
        'tfoot': 1,
        'th': 1,
        'thead': 1,
        'tr': 1
    };

    /**
     * Table class utility. Provides methods for create, delete and update tables.
     *
     * @class CKEDITOR.Table
     * @constructor
     * @param {Object} editor The CKEditor instance.
     */

    function Table(editor) {
        this._editor = editor;
    }

    Table.HEADING_BOTH = 'Both';
    Table.HEADING_COL = 'Column';
    Table.HEADING_NONE = 'None';
    Table.HEADING_ROW = 'Row';

    Table.prototype = {
        constructor: Table,

        /**
         * Creates a table.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method create
         * @param {Object} config Table configuration object
         * @return {Object} The created table
         */
        create: function create(config) {
            var editor = this._editor;
            var table = this._createElement('table');

            config = config || {};

            // Generate the rows and cols.
            var tbody = table.append(this._createElement('tbody'));
            var rows = config.rows || 1;
            var cols = config.cols || 1;

            for (var i = 0; i < rows; i++) {
                var row = tbody.append(this._createElement('tr'));
                for (var j = 0; j < cols; j++) {
                    var cell = row.append(this._createElement('td'));

                    cell.appendBogus();
                }
            }

            this.setAttributes(table, config.attrs);
            this.setHeading(table, config.heading);

            // Insert the table element if we're creating one.
            editor.insertElement(table);

            var firstCell = new CKEDITOR.dom.element(table.$.rows[0].cells[0]);
            var range = editor.createRange();
            range.moveToPosition(firstCell, CKEDITOR.POSITION_AFTER_START);
            range.select();

            return table;
        },

        /**
         * Retrieves a table from the current selection.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved table or null if not found.
         */
        getFromSelection: function getFromSelection() {
            var table;
            var selection = this._editor.getSelection();
            var selected = selection.getSelectedElement();

            if (selected && selected.is('table')) {
                table = selected;
            } else {
                var ranges = selection.getRanges();

                if (ranges.length > 0) {
                    // Webkit could report the following range on cell selection (#4948):
                    // <table><tr><td>[&nbsp;</td></tr></table>]

                    /* istanbul ignore else */
                    if (CKEDITOR.env.webkit) {
                        ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                    }

                    table = this._editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                }
            }

            return table;
        },

        /**
         * Checks if a given table can be considered as editable. This method
         * workarounds a limitation of IE where for some elements (like table),
         * `isContentEditable` returns always false. This is because IE does not support
         * `contenteditable` on such elements. However, despite such elements
         * cannot be set as content editable directly, a content editable SPAN,
         * or DIV element can be placed inside the individual table cells.
         * See https://msdn.microsoft.com/en-us/library/ms537837%28v=VS.85%29.aspx
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method isEditable
         * @param {CKEDITOR.dom.element} el The table element to test if editable
         * @return {Boolean}
         */
        isEditable: function isEditable(el) {
            if (!CKEDITOR.env.ie || !el.is(IE_NON_DIRECTLY_EDITABLE_ELEMENT)) {
                return !el.isReadOnly();
            }

            if (el.hasAttribute('contenteditable')) {
                return el.getAttribute('contenteditable') !== 'false';
            }

            return this.isEditable(el.getParent());
        },

        /**
         * Returns which heading style is set for the given table.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method getHeading
         * @param {CKEDITOR.dom.element} table The table to gather the heading from. If null, it will be retrieved from the current selection.
         * @return {String} The heading of the table. Expected values are `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
         */
        getHeading: function getHeading(table) {
            table = table || this.getFromSelection();

            if (!table) {
                return null;
            }

            var rowHeadingSettings = table.$.tHead !== null;

            var colHeadingSettings = true;

            // Check if all of the first cells in every row are TH
            for (var row = 0; row < table.$.rows.length; row++) {
                // If just one cell isn't a TH then it isn't a header column
                var cell = table.$.rows[row].cells[0];

                if (cell && cell.nodeName.toLowerCase() !== 'th') {
                    colHeadingSettings = false;
                    break;
                }
            }

            var headingSettings = Table.HEADING_NONE;

            if (rowHeadingSettings) {
                headingSettings = Table.HEADING_ROW;
            }

            if (colHeadingSettings) {
                headingSettings = headingSettings === Table.HEADING_ROW ? Table.HEADING_BOTH : Table.HEADING_COL;
            }

            return headingSettings;
        },

        /**
         * Removes a table from the editor.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method remove
         * @param {CKEDITOR.dom.element} table The table element which table style should be removed.
         */
        remove: function remove(table) {
            var editor = this._editor;

            if (table) {
                table.remove();
            } else {
                table = editor.elementPath().contains('table', 1);

                if (table) {
                    // If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)
                    var parent = table.getParent();
                    var editable = editor.editable();

                    if (parent.getChildCount() === 1 && !parent.is('td', 'th') && !parent.equals(editable)) {
                        table = parent;
                    }

                    var range = editor.createRange();
                    range.moveToPosition(table, CKEDITOR.POSITION_BEFORE_START);
                    table.remove();
                    range.select();
                }
            }
        },

        /**
         * Assigns provided attributes to a table.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method setAttributes
         * @param {Object} table The table to which the attributes should be assigned
         * @param {Object} attrs The attributes which have to be assigned to the table
         */
        setAttributes: function setAttributes(table, attrs) {
            if (attrs) {
                Object.keys(attrs).forEach(function (attr) {
                    table.setAttribute(attr, attrs[attr]);
                });
            }
        },

        /**
         * Sets the appropriate table heading style to a table.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @method setHeading
         * @param {CKEDITOR.dom.element} table The table element to which the heading should be set. If null, it will be retrieved from the current selection.
         * @param {String} heading The table heading to be set. Accepted values are: `CKEDITOR.Table.NONE`, `CKEDITOR.Table.ROW`, `CKEDITOR.Table.COL` and `CKEDITOR.Table.BOTH`.
         */
        setHeading: function setHeading(table, heading) {
            table = table || this.getFromSelection();

            var i, newCell;
            var tableHead;
            var tableBody = table.getElementsByTag('tbody').getItem(0);

            var tableHeading = this.getHeading(table);
            var hadColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;

            var needColHeading = heading === Table.HEADING_COL || heading === Table.HEADING_BOTH;
            var needRowHeading = heading === Table.HEADING_ROW || heading === Table.HEADING_BOTH;

            // If we need row heading and don't have a <thead> element yet, move the
            // first row of the table to the head and convert the nodes to <th> ones.
            if (!table.$.tHead && needRowHeading) {
                var tableFirstRow = tableBody.getElementsByTag('tr').getItem(0);
                var tableFirstRowChildCount = tableFirstRow.getChildCount();

                // Change TD to TH:
                for (i = 0; i < tableFirstRowChildCount; i++) {
                    var cell = tableFirstRow.getChild(i);

                    // Skip bookmark nodes. (#6155)
                    if (cell.type === CKEDITOR.NODE_ELEMENT && !cell.data('cke-bookmark')) {
                        cell.renameNode('th');
                        cell.setAttribute('scope', 'col');
                    }
                }

                tableHead = this._createElement(table.$.createTHead());
                tableHead.append(tableFirstRow.remove());
            }

            // If we don't need row heading and we have a <thead> element, move the
            // row out of there and into the <tbody> element.
            if (table.$.tHead !== null && !needRowHeading) {
                // Move the row out of the THead and put it in the TBody:
                tableHead = this._createElement(table.$.tHead);

                var previousFirstRow = tableBody.getFirst();

                while (tableHead.getChildCount() > 0) {
                    var newFirstRow = tableHead.getFirst();
                    var newFirstRowChildCount = newFirstRow.getChildCount();

                    for (i = 0; i < newFirstRowChildCount; i++) {
                        newCell = newFirstRow.getChild(i);

                        if (newCell.type === CKEDITOR.NODE_ELEMENT) {
                            newCell.renameNode('td');
                            newCell.removeAttribute('scope');
                        }
                    }

                    newFirstRow.insertBefore(previousFirstRow);
                }

                tableHead.remove();
            }

            tableHeading = this.getHeading(table);
            var hasColHeading = tableHeading === Table.HEADING_COL || tableHeading === Table.HEADING_BOTH;

            // If we need column heading and the table doesn't have it, convert every first cell in
            // every row into a `<th scope="row">` element.
            if (!hasColHeading && needColHeading) {
                for (i = 0; i < table.$.rows.length; i++) {
                    if (table.$.rows[i].cells[0].nodeName.toLowerCase() !== 'th') {
                        newCell = new CKEDITOR.dom.element(table.$.rows[i].cells[0]);
                        newCell.renameNode('th');
                        newCell.setAttribute('scope', 'row');
                    }
                }
            }

            // If we don't need column heading but the table has it, convert every first cell in every
            // row back into a `<td>` element.
            if (hadColHeading && !needColHeading) {
                for (i = 0; i < table.$.rows.length; i++) {
                    var row = new CKEDITOR.dom.element(table.$.rows[i]);

                    if (row.getParent().getName() === 'tbody') {
                        newCell = new CKEDITOR.dom.element(row.$.cells[0]);
                        newCell.renameNode('td');
                        newCell.removeAttribute('scope');
                    }
                }
            }
        },

        /**
         * Creates a new CKEDITOR.dom.element using the passed tag name.
         *
         * @instance
         * @memberof CKEDITOR.Table
         * @protected
         * @method _createElement
         * @param {String} name The tag name from which an element should be created
         * @return {CKEDITOR.dom.element} Instance of CKEDITOR DOM element class
         */
        _createElement: function _createElement(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
        }
    };

    CKEDITOR.on('instanceReady', function (event) {
        var headingCommands = [Table.HEADING_NONE, Table.HEADING_ROW, Table.HEADING_COL, Table.HEADING_BOTH];

        var tableUtils = new Table(event.editor);

        headingCommands.forEach(function (heading) {
            event.editor.addCommand('tableHeading' + heading, {
                exec: function exec(editor) {
                    tableUtils.setHeading(null, heading);
                }
            });
        });
    });

    CKEDITOR.Table = CKEDITOR.Table || Table;
})();
'use strict';

(function () {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Sends a request using the JSONP technique.
     *
     * @memberof CKEDITOR.tools
     * @method jsonp
     * @param {CKEDITOR.template} urlTemplate The template of the URL to be requested. All properties passed in `urlParams` can be used, plus a `{callback}`, which represent a JSONP callback, must be defined.
     * @param {Function} callback A function to be called in case of success.
     * @param {Function} errorCallback A function to be called in case of failure.
     * @param {Object} urlParams Parameters to be passed to the `urlTemplate`.
     * @return {Object} An object with the following properties:
     *  - id: the transaction ID
     *  - a `cancel()` method
     * @static
     */

    CKEDITOR.tools.jsonp = function (urlTemplate, urlParams, callback, errorCallback) {
        var callbackKey = CKEDITOR.tools.getNextNumber();

        urlParams = urlParams || {};
        urlParams.callback = 'CKEDITOR._.jsonpCallbacks[' + callbackKey + ']';

        if (!CKEDITOR._.jsonpCallbacks) {
            CKEDITOR._.jsonpCallbacks = {};
        }

        CKEDITOR._.jsonpCallbacks[callbackKey] = function (response) {
            setTimeout(function () {
                cleanUp();

                callback(response);
            });
        };

        var scriptElement = new CKEDITOR.dom.element('script');
        scriptElement.setAttribute('src', urlTemplate.output(urlParams));
        scriptElement.on('error', function () {
            cleanUp();

            if (errorCallback) {
                errorCallback();
            }
        });

        function cleanUp() {
            if (scriptElement) {
                scriptElement.remove();
                delete CKEDITOR._.jsonpCallbacks[callbackKey];
                scriptElement = null;
            }
        }

        CKEDITOR.document.getBody().append(scriptElement);

        return {
            cancel: cleanUp,
            id: callbackKey
        };
    };

    /**
     * Returns a new object containing all of the properties of all the supplied
     * objects. The properties from later objects will overwrite those in earlier
     * objects.
     *
     * Passing in a single object will create a shallow copy of it.
     *
     * @memberof CKEDITOR.tools
     * @method merge
     * @param {Object} objects* One or more objects to merge.
     * @return {Object} A new merged object.
     * @static
     */
    CKEDITOR.tools.merge = CKEDITOR.tools.merge || function () {
        var result = {};

        for (var i = 0; i < arguments.length; ++i) {
            var obj = arguments[i];

            for (var key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    result[key] = obj[key];
                }
            }
        }

        return result;
    };

    /**
     * Simulates event on a DOM element.
     *
     * @memberof CKEDITOR.tools
     * @method simulate
     * @param {DOMElement} element The element on which the event shoud be simualted.
     * @param {String} event The name of the event which have to be simulated.
     * @static
     */
    CKEDITOR.tools.simulate = function (element, event) {
        var eventInstance = document.createEvent('Events');
        eventInstance.initEvent(event, true, false);
        element.dispatchEvent(eventInstance);
    };
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_uicore')) {
        return;
    }

    /**
     * UICore class which will handle user interactions with the editor. These interactions
     * might be triggered via mouse, keyboard or touch devices. The class fill fire an event via
     * CKEditor's event system - "editorInteraction". The UI may listen to this event and
     * execute some actions - for example to show/hide toolbars.
     *
     * By default if user presses the Esc key, 'editorInteraction' event won't be fired. However, this behaviour can be changed
     * by setting {{#crossLink "CKEDITOR.plugins.ae_uicore/allowEsc:attribute"}}{{/crossLink}} config property in editor's configuration to true.
     *
     * @class ae_uicore
     */

    /**
     * Fired when user interacts somehow with the browser. This may be clicking with the mouse, pressing keyboard button,
     * or touching screen. This even will be not fired after each interaction. It will be debounced. By default the timeout
     * is 50ms. This value can be overwritten via {{#crossLink "CKEDITOR.plugins.ae_uicore/timeout:attribute"}}{{/crossLink}}
     * property of editor's configuration, like: editor.config.uicore.timeout = 100
     *
     * @memberof ae_uicore
     * @event ae_uicore#editorInteraction
     * @param {Object} data An object which contains the following properties:
     * - nativeEvent - The event as received from CKEditor.
     * - selectionData - The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
     */

    /**
     * Fired by UI elements like Toolbars or Buttons when their state changes. The listener updates the live region with the provided data.
     *
     * @memberof ae_uicore
     * @event ae_uicore#ariaUpdate
     * @param {Object} data An object which contains the following properties:
     * - message - The provided message from the UI element.
     */

    /**
     * If set to true, the editor will still fire {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event,
     * if user presses Esc key.
     *
     * @memberof ae_uicore
     * @attribute allowEsc
     * @default false
     * @type Boolean
     */

    /**
     * Specifies the default timeout after which the {{#crossLink "CKEDITOR.plugins.ae_uicore/editorInteraction:event"}}{{/crossLink}} event
     * will be fired.
     *
     * @memberof ae_uicore
     * @attribute timeout
     * @default 50 (ms)
     * @type Number
     */

    CKEDITOR.plugins.add('ae_uicore', {
        /**
         * Initializer lifecycle implementation for the UICore plugin.
         *
         * @memberof ae_uicore
         * @method init
         * @param {Object} editor The current CKEditor instance.
         * @protected
         */
        init: function init(editor) {
            var ariaState = [];

            var ariaElement = this._createAriaElement(editor.id);

            var uiTasksTimeout = editor.config.uicore ? editor.config.uicore.timeout : 50;

            var handleUI = CKEDITOR.tools.debounce(function (event) {
                ariaState = [];

                if (event.name !== 'keyup' || event.data.$.keyCode !== 27 || editor.config.allowEsc) {
                    var selectionData = editor.getSelectionData();

                    if (selectionData) {
                        editor.fire('editorInteraction', {
                            nativeEvent: event.data.$,
                            selectionData: selectionData
                        });
                    }
                }
            }, uiTasksTimeout);

            var handleAria = CKEDITOR.tools.debounce(function (event) {
                ariaElement.innerHTML = ariaState.join('. ');
            }, uiTasksTimeout);

            var handleMouseLeave = CKEDITOR.tools.debounce(function (event) {
                var aeUINodes = document.querySelectorAll('.ae-ui');

                var found;

                for (var i = 0; i < aeUINodes.length; i++) {
                    if (aeUINodes[i].contains(event.data.$.relatedTarget)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    handleUI(event);
                }
            }, uiTasksTimeout);

            editor.on('ariaUpdate', function (event) {
                // handleAria is debounced function, so if it is being called multiple times, it will
                // be canceled until some time passes.
                // For that reason here we explicitly append the current message to the list of messages
                // and call handleAria. Since it is debounced, when some timeout passes,
                // all the messages will be applied to the live region and not only the last one.

                ariaState.push(event.data.message);

                handleAria();
            });

            editor.once('contentDom', function () {
                var editable = editor.editable();

                var focusHandler = editable.attachListener(editable, 'focus', function (event) {
                    focusHandler.removeListener();

                    editable.attachListener(editable, 'keyup', handleUI);
                    editable.attachListener(editable, 'mouseup', handleUI);
                    editable.attachListener(editable, 'mouseleave', handleMouseLeave);

                    handleUI(event);
                });
            });

            editor.on('destroy', function (event) {
                ariaElement.parentNode.removeChild(ariaElement);

                handleUI.detach();
            });
        },

        /**
         * Creates and applies an HTML element to the body of the document which will contain ARIA messages.
         *
         * @memberof ae_uicore
         * @method _createAriaElement
         * @param {String} id The provided id of the element. It will be used as prefix for the final element Id.
         * @protected
         * @return {HTMLElement} The created and applied to DOM element.
         */
        _createAriaElement: function _createAriaElement(id) {
            var statusElement = document.createElement('div');

            statusElement.className = 'ae-sr-only';

            statusElement.setAttribute('aria-live', 'polite');
            statusElement.setAttribute('role', 'status');
            statusElement.setAttribute('id', id + 'LiveRegion');

            document.body.appendChild(statusElement);

            return statusElement;
        }
    });
})();
'use strict';

(function () {
    'use strict';

    var isIE = CKEDITOR.env.ie;

    if (CKEDITOR.plugins.get('ae_addimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows Drag&Drop of images directly into the editable area. The image will be encoded
     * as Data URI. An event `beforeImageAdd` will be fired with the list of dropped images. If any of the listeners
     * returns `false` or cancels the event, the images won't be added to the content. Otherwise,
     * an event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_addimages
     */

    /**
     * Fired before adding images to the editor.
     *
     * @event CKEDITOR.plugins.ae_addimages#beforeImageAdd
     * @instance
     * @memberof CKEDITOR.plugins.ae_addimages
     * @param {Array} imageFiles Array of image files
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event CKEDITOR.plugins.ae_addimages#imageAdd
     * @instance
     * @memberof CKEDITOR.plugins.ae_addimages
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     * @param {File} file The image file
     */

    CKEDITOR.plugins.add('ae_addimages', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'dragenter', 'dragover', 'drop' and `paste` events on the editing area.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'dragover', this._onDragOver, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'drop', this._onDragDrop, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'paste', this._onPaste, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * Accepts an array of dropped files to the editor. Then, it filters the images and sends them for further
         * processing to {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}}
         *
         * @fires CKEDITOR.plugins.ae_addimages#beforeImageAdd
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _handleFiles
         * @param {Array} files Array of dropped files. Only the images from this list will be processed.
         * @param {Object} editor The current editor instance
         * @protected
         */
        _handleFiles: function _handleFiles(files, editor) {
            var file;
            var i;

            var imageFiles = [];

            for (i = 0; i < files.length; i++) {
                file = files[i];

                if (file.type.indexOf('image') === 0) {
                    imageFiles.push(file);
                }
            }

            var result = editor.fire('beforeImageAdd', {
                imageFiles: imageFiles
            });

            if (!!result) {
                for (i = 0; i < imageFiles.length; i++) {
                    file = imageFiles[i];

                    this._processFile(file, editor);
                }
            }

            return false;
        },

        /**
         * Handles drag drop event. The function will create a selection from the current
         * point and will send a list of files to be processed to
         * {{#crossLink "CKEDITOR.plugins.ae_addimages/_handleFiles:method"}}{{/crossLink}} method.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _onDragDrop
         * @param {CKEDITOR.dom.event} event dragdrop event, as received natively from CKEditor
         * @protected
         */
        _onDragDrop: function _onDragDrop(event) {
            var nativeEvent = event.data.$;

            new CKEDITOR.dom.event(nativeEvent).preventDefault();

            var editor = event.listenerData.editor;

            event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);

            this._handleFiles(nativeEvent.dataTransfer.files, editor);
        },

        /**
         * Handles drag enter event. In case of IE, this function will prevent the event.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _onDragEnter
         * @param {DOM event} event dragenter event, as received natively from CKEditor
         * @protected
         */
        _onDragEnter: function _onDragEnter(event) {
            if (isIE) {
                this._preventEvent(event);
            }
        },

        /**
         * Handles drag over event. In case of IE, this function will prevent the event.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _onDragOver
         * @param {DOM event} event dragover event, as received natively from CKEditor
         * @protected
         */
        _onDragOver: function _onDragOver(event) {
            if (isIE) {
                this._preventEvent(event);
            }
        },

        /**
         * Checks if the pasted data is image and passes it to
         * {{#crossLink "CKEDITOR.plugins.ae_addimages/_processFile:method"}}{{/crossLink}} for processing.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _onPaste
         * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
         * @protected
         */
        _onPaste: function _onPaste(event) {
            if (event.data && event.data.$ && event.data.$.clipboardData && event.data.$.clipboardData.items && event.data.$.clipboardData.items.length > 0) {
                var pastedData = event.data.$.clipboardData.items[0];

                if (pastedData.type.indexOf('image') === 0) {
                    var imageFile = pastedData.getAsFile();

                    this._processFile(imageFile, event.listenerData.editor);
                }
            }
        },

        /**
         * Prevents a native event.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _preventEvent
         * @param {DOM event} event The event to be prevented.
         * @protected
         */
        _preventEvent: function _preventEvent(event) {
            event = new CKEDITOR.dom.event(event.data.$);

            event.preventDefault();
            event.stopPropagation();
        },

        /**
         * Processes an image file. The function creates an img element and sets as source
         * a Data URI, then fires an 'imageAdd' event via CKEditor's event system.
         *
         * @fires CKEDITOR.plugins.ae_addimages#imageAdd
         * @instance
         * @memberof CKEDITOR.plugins.ae_addimages
         * @method _preventEvent
         * @param {DOM event} event The event to be prevented.
         * @protected
         */
        _processFile: function _processFile(file, editor) {
            var reader = new FileReader();

            reader.addEventListener('loadend', function () {
                var bin = reader.result;

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                editor.insertElement(el);

                var imageData = {
                    el: el,
                    file: file
                };

                editor.fire('imageAdd', imageData);
            });

            reader.readAsDataURL(file);
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_autolink')) {
        return;
    }

    // Disables the auto URL detection feature in IE, their lacks functionality:
    // They convert the links only on space. We do on space, comma, semicolon and Enter.
    if (/MSIE ([^;]*)|Trident.*; rv:([0-9.]+)/.test(navigator.userAgent)) {
        document.execCommand('AutoUrlDetect', false, false);
    }

    var KEY_BACK = 8;

    var KEY_COMMA = 188;

    var KEY_ENTER = 13;

    var KEY_SEMICOLON = 186;

    var KEY_SPACE = 32;

    var DELIMITERS = [KEY_COMMA, KEY_ENTER, KEY_SEMICOLON, KEY_SPACE];

    var REGEX_LAST_WORD = /[^\s]+/mg;

    var REGEX_URL = /(https?\:\/\/|www\.)(-\.)?([^(\s/?\.#-)]+\.?)+(\b\/[^\s]*)?$/i;

    /**
     * CKEditor plugin which automatically generates links when user types text which looks like URL.
     *
     * @class CKEDITOR.plugins.ae_autolink
     * @constructor
     */
    CKEDITOR.plugins.add('ae_autolink', {

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers the `keyup` event on the editing area.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'keyup', this._onKeyUp, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * Retrieves the last word introduced by the user. Reads from the current
         * caret position backwards until it finds the first white space.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _getLastWord
         * @protected
         * @return {String} The last word introduced by user
         */
        _getLastWord: function _getLastWord(editor) {
            var range = editor.getSelection().getRanges()[0];

            var offset = range.startOffset;

            var previousText = '';

            // The user pressed Enter, so we have to look on the previous node
            if (this._currentKeyCode === KEY_ENTER) {
                var previousNode = range.startContainer.getPrevious();

                var lastChild;

                if (previousNode) {
                    // If previous node is a SPACE, (it does not have 'getLast' method),
                    // ignore it and find the previous text node
                    while (!previousNode.getLast) {
                        previousNode = previousNode.getPrevious();
                    }

                    lastChild = previousNode.getLast();

                    // Depending on the browser, the last child node may be a <BR>
                    // (which does not have 'getText' method),
                    // so ignore it and find the previous text node
                    while (lastChild && !lastChild.getText()) {
                        lastChild = lastChild.getPrevious();
                    }
                }

                // Check if the lastChild is already a link
                if (!(lastChild && lastChild.$.href)) {
                    this._startContainer = lastChild;
                    previousText = lastChild ? lastChild.getText() : '';
                    this._offset = previousText.length;
                }
            } else {
                this._startContainer = range.startContainer;

                // Last character is the delimiter, ignore it
                previousText = this._startContainer.getText().substring(0, offset - 1);

                this._offset = offset - 1;
            }

            var lastWord = '';

            var match = previousText.match(REGEX_LAST_WORD);

            if (match) {
                lastWord = match.pop();
            }

            return lastWord;
        },

        /**
         * Checks if the given link is a valid URL.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method isValidURL
         * @param {String} link The link we want to know if it is a valid URL
         * @protected
         * @return {Boolean} Returns true if the link is a valid URL, false otherwise
         */
        _isValidURL: function _isValidURL(link) {
            return REGEX_URL.test(link);
        },

        /**
         * Listens to the `keydown` event and if the keycode is `Backspace`, removes the previously
         * created link.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _onKeyDown
         * @param {EventFacade} event EventFacade object
         * @protected
         */
        _onKeyDown: function _onKeyDown(event) {
            var nativeEvent = event.data.$;

            var editor = event.listenerData.editor;

            var editable = editor.editable();

            editable.removeListener('keydown', this._onKeyDown);

            if (nativeEvent.keyCode === KEY_BACK) {
                event.cancel();
                event.data.preventDefault();

                this._removeLink(editor);
            }

            this._ckLink = null;
        },

        /**
         * Listens to the `Enter` and `Space` key events in order to check if the last word
         * introduced by the user should be replaced by a link element.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _onKeyUp
         * @param {EventFacade} event EventFacade object
         * @protected
         */
        _onKeyUp: function _onKeyUp(event) {
            var nativeEvent = event.data.$;

            this._currentKeyCode = nativeEvent.keyCode;

            if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
                var editor = event.listenerData.editor;

                var lastWord = this._getLastWord(editor);

                if (this._isValidURL(lastWord)) {
                    this._replaceContentByLink(editor, lastWord);
                }
            }
        },

        /**
         * Replaces content by a link element.
         *
         * @fires CKEDITOR.plugins.ae_autolink#autolinkAdd
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _replaceContentByLink
         * @param {String} content The text that has to be replaced by an link element
         * @protected
         */
        _replaceContentByLink: function _replaceContentByLink(editor, content) {
            var range = editor.createRange();
            var node = CKEDITOR.dom.element.get(this._startContainer);
            var offset = this._offset;

            // Select the content, so CKEDITOR.Link can properly replace it
            range.setStart(node, offset - content.length);
            range.setEnd(node, offset);
            range.select();

            var ckLink = new CKEDITOR.Link(editor);
            ckLink.create(content);
            this._ckLink = ckLink;

            var linkNode = ckLink.getFromSelection();
            editor.fire('autolinkAdd', linkNode);

            this._subscribeToKeyEvent(editor);

            // Now range is on the link and it is selected. We have to
            // return focus to the caret position.
            range = editor.getSelection().getRanges()[0];

            // If user pressed `Enter`, get the next editable node at position 0,
            // otherwise set the cursor at the next character of the link (the white space)
            if (this._currentKeyCode === KEY_ENTER) {
                var nextEditableNode = range.getNextEditableNode();

                range.setStart(nextEditableNode, 0);
                range.setEnd(nextEditableNode, 0);
            } else {
                var nextNode = range.getNextNode();

                range.setStart(nextNode, 1);
                range.setEnd(nextNode, 1);
            }

            range.select();
        },

        /**
         * Fired when a URL is detected in text and converted to a link.
         *
         * @event CKEDITOR.plugins.ae_autolink#autolinkAdd
         * @memberof CKEDITOR.plugins.ae_autolink
         * @param {CKEDITOR.dom.element} el Node of the created link.
         */

        /**
         * Removes the created link element, and replaces it by its text.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _removeLink
         * @protected
         */
        _removeLink: function _removeLink(editor) {
            var range = editor.getSelection().getRanges()[0];
            var caretOffset = range.startOffset;

            // Select the link, so CKEDITOR.Link can properly remove it
            var linkNode = this._startContainer.getNext() || this._startContainer;

            var newRange = editor.createRange();
            newRange.setStart(linkNode, 0);
            newRange.setEndAfter(linkNode);
            newRange.select();

            this._ckLink.remove();

            // Return focus to the caret position
            range.setEnd(range.startContainer, caretOffset);
            range.setStart(range.startContainer, caretOffset);

            range.select();
        },

        /**
         * Subscribe to a key event of the editable aria.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolink
         * @method _subscribeToKeyEvent
         * @protected
         */
        _subscribeToKeyEvent: function _subscribeToKeyEvent(editor) {
            var editable = editor.editable();

            // Change the priority of keydown listener - 1 means the highest priority.
            // In Chrome on pressing `Enter` the listener is not being invoked.
            // See http://dev.ckeditor.com/ticket/11861 for more information.
            editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
                editor: editor
            }, 1);
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_autolist')) {
        return;
    }

    var KEY_BACK = 8;

    var KEY_SPACE = 32;

    var DEFAULT_CONFIG = [{
        regex: /^\*$/,
        type: 'bulletedlist'
    }, {
        regex: /^1\.$/,
        type: 'numberedlist'
    }];

    /**
        * CKEditor plugin which automatically generates ordered/unordered list when user types text which looks like a list.
        *
        * @class CKEDITOR.plugins.ae_autolist
        * @constructor
        */
    CKEDITOR.plugins.add('ae_autolist', {

        /**
         * Initialization of the plugin, part of CKeditor plugin lifecycle.
         * The function registers the `keydown` event on the content editing area.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolist
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'keydown', this._onKeyDown, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * Checks for pressing the `Backspace` key in order to undo the list creation.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolist
         * @method _checkForBackspaceAndUndo
         * @param {Event} event Event object
         * @protected
         */
        _checkForBackspaceAndUndo: function _checkForBackspaceAndUndo(event) {
            var editor = event.listenerData.editor;

            var nativeEvent = event.data.$;

            var editable = editor.editable();

            editable.removeListener('keydown', this._checkForBackspaceAndUndo);

            if (nativeEvent.keyCode === KEY_BACK) {
                editor.execCommand('undo');
                editor.insertHtml(event.listenerData.bullet + '&nbsp;');
                event.data.preventDefault();
            }
        },

        /**
         * Checks current line to find match with MATCHES object to create OL or UL.
         *
         * @instance
         * @memberof CKEDITOR.plugins.ae_autolist
         * @method _checkLine
         * @param {editor} Editor object
         * @protected
         * @return {Object|null} Returns an object which contains the detected list config if any
         */
        _getListConfig: function _getListConfig(editor) {
            var configRegex = editor.config.autolist || DEFAULT_CONFIG;

            var range = editor.getSelection().getRanges()[0];

            var textContainer = range.endContainer.getText();

            var bullet = textContainer.substring(0, range.startOffset);

            var text = textContainer.substring(range.startOffset, textContainer.length);

            var index = 0;

            var regexLen = configRegex.length;

            var autolistCfg = null;

            while (!autolistCfg && regexLen > index) {
                var regexItem = configRegex[index];

                if (regexItem.regex.test(bullet)) {
                    autolistCfg = {
                        bullet: bullet,
                        editor: editor,
                        text: text,
                        type: regexItem.type
                    };

                    break;
                }

                index++;
            }

            return autolistCfg;
        },

        /**
                  * Create list with different types: Bulleted or Numbered list
                  *
                  * @instance
                  * @memberof CKEDITOR.plugins.ae_autolist
                  * @method _createList
                  * @param {Object} listConfig Object that contains bullet, text and type for creating the list
                  * @protected
         */
        _createList: function _createList(listConfig) {
            var editor = listConfig.editor;

            var range = editor.getSelection().getRanges()[0];

            range.endContainer.setText(listConfig.text);
            editor.execCommand(listConfig.type);

            var editable = editor.editable();

            // Subscribe to keydown in order to check if the next key press is `Backspace`.
            // If so, the creation of the list will be discarded.
            editable.attachListener(editable, 'keydown', this._checkForBackspaceAndUndo, this, {
                editor: editor,
                bullet: listConfig.bullet
            }, 1);
        },

        /**
                  * Listens to the `Space` key events to check if the last word
                  * introduced by the user should be replaced by a list (OL or UL)
                  *
                  * @instance
                  * @memberof CKEDITOR.plugins.ae_autolist
                  * @method _onKeyDown
                  * @param {Event} event Event object
                  * @protected
                  */
        _onKeyDown: function _onKeyDown(event) {
            var nativeEvent = event.data.$;

            if (nativeEvent.keyCode === KEY_SPACE) {
                var listConfig = this._getListConfig(event.listenerData.editor);

                if (listConfig) {
                    event.data.preventDefault();
                    this._createList(listConfig);
                }
            }
        }
    });
})();
'use strict';

/**
 * CKEditor plugin: Dragable image resizing
 * https://github.com/sstur/ck-dragresize
 * - Shows semi-transparent overlay while resizing
 * - Enforces Aspect Ratio (unless holding shift)
 * - Snap to size of other images in editor
 * - Escape while dragging cancels resize
 */
(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_dragresize')) {
        return;
    }

    var IMAGE_HANDLES = {
        both: ['tl', 'tm', 'tr', 'lm', 'rm', 'bl', 'bm', 'br'],
        height: ['tl', 'tm', 'tr', 'bl', 'bm', 'br'],
        scale: ['tl', 'tr', 'bl', 'br'],
        width: ['tl', 'tr', 'lm', 'rm', 'bl', 'br']
    };

    var POSITION_ELEMENT_FN = {
        bl: function bl(handle, left, top, box) {
            positionElement(handle, -3 + left, box.height - 4 + top);
        },
        bm: function bm(handle, left, top, box) {
            positionElement(handle, Math.round(box.width / 2) - 3 + left, box.height - 4 + top);
        },
        br: function br(handle, left, top, box) {
            positionElement(handle, box.width - 4 + left, box.height - 4 + top);
        },
        lm: function lm(handle, left, top, box) {
            positionElement(handle, -3 + left, Math.round(box.height / 2) - 3 + top);
        },
        tl: function tl(handle, left, top, box) {
            positionElement(handle, left - 3, top - 3);
        },
        tm: function tm(handle, left, top, box) {
            positionElement(handle, Math.round(box.width / 2) - 3 + left, -3 + top);
        },
        tr: function tr(handle, left, top, box) {
            positionElement(handle, box.width - 4 + left, -3 + top);
        },
        rm: function rm(handle, left, top, box) {
            positionElement(handle, box.width - 4 + left, Math.round(box.height / 2) - 3 + top);
        }
    };

    var IMAGE_SNAP_TO_SIZE = 7;

    var isFirefox = 'MozAppearance' in document.documentElement.style;

    var isWebKit = 'WebkitAppearance' in document.documentElement.style;

    var enablePlugin = isWebKit || isFirefox;

    if (enablePlugin) {
        // CSS is added in a compressed form
        CKEDITOR.addCss('img::selection{color:rgba(0,0,0,0)}img.ckimgrsz{outline:1px dashed #000}#ckimgrsz{position:absolute;width:0;height:0;cursor:default;z-index:10001}#ckimgrsz span{display:none;position:absolute;top:0;left:0;width:0;height:0;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#ckimgrsz i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#ckimgrsz i.active,#ckimgrsz i:hover{background:#000}#ckimgrsz i.br,#ckimgrsz i.tl{cursor:nwse-resize}#ckimgrsz i.bm,#ckimgrsz i.tm{cursor:ns-resize}#ckimgrsz i.bl,#ckimgrsz i.tr{cursor:nesw-resize}#ckimgrsz i.lm,#ckimgrsz i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}');
    }

    /**
     * Initializes the plugin
     */
    CKEDITOR.plugins.add('ae_dragresize', {
        onLoad: function onLoad() {
            if (!enablePlugin) {
                return;
            }
        },
        init: function init(editor) {
            if (!enablePlugin) {
                return;
            }

            editor.once('contentDom', function (evt) {
                _init(editor);
            });
        }
    });

    function _init(editor) {
        var window = editor.window.$,
            document = editor.document.$;

        if (isFirefox) {
            // Disable the native image resizing
            document.execCommand('enableObjectResizing', false, false);
        }

        var snapToSize = typeof IMAGE_SNAP_TO_SIZE === 'undefined' ? null : IMAGE_SNAP_TO_SIZE;

        editor.config.imageScaleResize = editor.config.imageScaleResize || 'both';

        var resizer = new Resizer(editor, {
            imageScaleResize: editor.config.imageScaleResize,
            snapToSize: snapToSize
        });

        var mouseDownListener = function mouseDownListener(e) {
            if (resizer.isHandle(e.target)) {
                resizer.initDrag(e);
            }
        };

        document.addEventListener('mousedown', mouseDownListener, false);

        function selectionChange() {
            var selection = editor.getSelection();

            if (!selection) return;
            // If an element is selected and that element is an IMG
            if (selection.getType() !== CKEDITOR.SELECTION_NONE && selection.getStartElement().is('img')) {
                // And we're not right or middle clicking on the image
                if (!window.event || !window.event.button || window.event.button === 0) {
                    resizer.show(selection.getStartElement().$);
                }
            } else {
                resizer.hide();
            }
        }

        editor.on('selectionChange', selectionChange);

        editor.on('getData', function (e) {
            var html = e.data.dataValue || '';
            html = html.replace(/<div id="ckimgrsz"([\s\S]*?)<\/div>/i, '');
            html = html.replace(/\b(ckimgrsz)\b/g, '');
            e.data.dataValue = html;
        });

        editor.on('beforeUndoImage', function () {
            // Remove the handles before undo images are saved
            resizer.hide();
        });

        editor.on('afterUndoImage', function () {
            // Restore the handles after undo images are saved
            selectionChange();
        });

        editor.on('blur', function () {
            // Remove the handles when editor loses focus
            resizer.hide();
        });

        editor.on('beforeModeUnload', function self() {
            editor.removeListener('beforeModeUnload', self);
            resizer.hide();
        });

        editor.on('destroy', function () {
            var resizeElement = document.getElementById('ckimgrsz');

            if (resizeElement) {
                resizeElement.remove();
            }

            if (isFirefox) {
                document.execCommand('enableObjectResizing', false, true);
            }

            document.removeEventListener('mousedown', mouseDownListener);
        });

        // Update the selection when the browser window is resized
        var resizeTimeout;
        editor.window.on('resize', function () {
            // Cancel any resize waiting to happen
            clearTimeout(resizeTimeout);
            // Delay resize to "debounce"
            resizeTimeout = setTimeout(selectionChange, 50);
        });
    }

    function Resizer(editor, cfg) {
        this.editor = editor;
        this.window = editor.window.$;
        this.document = editor.document.$;
        this.cfg = cfg || {};
        this.init();
    }

    Resizer.prototype = {
        init: function init() {
            var instance = this;

            var container = this.container = this.document.createElement('div');

            container.id = 'ckimgrsz';
            this.preview = this.document.createElement('span');
            container.appendChild(this.preview);

            var handles = this.handles = {};

            IMAGE_HANDLES[this.cfg.imageScaleResize].forEach(function (handleName, index) {
                handles[handleName] = instance.handles[handleName] = instance.createHandle(handleName);
            });

            for (var n in handles) {
                container.appendChild(handles[n]);
            }
        },
        createHandle: function createHandle(name) {
            var el = this.document.createElement('i');
            el.classList.add(name);
            return el;
        },
        isHandle: function isHandle(el) {
            var handles = this.handles;
            for (var n in handles) {
                if (handles[n] === el) {
                    return true;
                }
            }
            return false;
        },
        show: function show(el) {
            this.el = el;
            if (this.cfg.snapToSize) {
                this.otherImages = toArray(this.document.getElementsByTagName('img'));
                this.otherImages.splice(this.otherImages.indexOf(el), 1);
            }
            var box = this.box = getBoundingBox(this.window, el);
            positionElement(this.container, box.left, box.top);
            this.document.body.appendChild(this.container);
            this.el.classList.add('ckimgrsz');
            this.showHandles();
        },
        hide: function hide() {
            // Remove class from all img.ckimgrsz
            var elements = this.document.getElementsByClassName('ckimgrsz');
            for (var i = 0; i < elements.length; ++i) {
                elements[i].classList.remove('ckimgrsz');
            }
            this.hideHandles();
            if (this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
        },
        initDrag: function initDrag(e) {
            if (e.button !== 0) {
                //right-click or middle-click
                return;
            }
            var resizer = this;
            var drag = new DragEvent(this.window, this.document);
            drag.onStart = function () {
                resizer.showPreview();
                resizer.isDragging = true;
                resizer.editor.getSelection().lock();
            };
            drag.onDrag = function () {
                resizer.calculateSize(this);
                resizer.updatePreview();
                var box = resizer.previewBox;
                resizer.updateHandles(box, box.left, box.top);
            };
            drag.onRelease = function () {
                resizer.isDragging = false;
                resizer.hidePreview();
                resizer.hide();
                resizer.editor.getSelection().unlock();
                // Save an undo snapshot before the image is permanently changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.onComplete = function () {
                resizer.resizeComplete();
                // Save another snapshot after the image is changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.start(e);
        },
        updateHandles: function updateHandles(box, left, top) {
            left = left || 0;
            top = top || 0;
            var handles = this.handles;

            for (var handle in handles) {
                POSITION_ELEMENT_FN[handle](handles[handle], left, top, box);
            }
        },
        showHandles: function showHandles() {
            var handles = this.handles;
            this.updateHandles(this.box);
            for (var n in handles) {
                handles[n].style.display = 'block';
            }
        },
        hideHandles: function hideHandles() {
            var handles = this.handles;
            for (var n in handles) {
                handles[n].style.display = 'none';
            }
        },
        showPreview: function showPreview() {
            this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
            this.calculateSize();
            this.updatePreview();
            this.preview.style.display = 'block';
        },
        updatePreview: function updatePreview() {
            var box = this.previewBox;
            positionElement(this.preview, box.left, box.top);
            this.preview.style.width = this.previewBox.width + 'px';
            this.preview.style.height = this.previewBox.height + 'px';
        },
        hidePreview: function hidePreview() {
            var box = getBoundingBox(this.window, this.preview);
            this.result = {
                width: box.width,
                height: box.height
            };
            this.preview.style.display = 'none';
        },
        calculateSize: function calculateSize(data) {
            var box = this.previewBox = {
                top: 0,
                left: 0,
                width: this.box.width,
                height: this.box.height
            };

            if (!data) return;

            var attr = data.target.className;

            if (~attr.indexOf('r')) {
                box.width = Math.max(32, this.box.width + data.delta.x);
            }
            if (~attr.indexOf('b')) {
                box.height = Math.max(32, this.box.height + data.delta.y);
            }
            if (~attr.indexOf('l')) {
                box.width = Math.max(32, this.box.width - data.delta.x);
            }
            if (~attr.indexOf('t')) {
                box.height = Math.max(32, this.box.height - data.delta.y);
            }
            //if dragging corner, enforce aspect ratio (unless shift key is being held)
            if (attr.indexOf('m') < 0 && !data.keys.shift) {
                var ratio = this.box.width / this.box.height;
                if (box.width / box.height > ratio) {
                    box.height = Math.round(box.width / ratio);
                } else {
                    box.width = Math.round(box.height * ratio);
                }
            }

            var snapToSize = this.cfg.snapToSize;

            if (snapToSize) {
                var others = this.otherImages;
                for (var i = 0; i < others.length; i++) {
                    var other = getBoundingBox(this.window, others[i]);
                    if (Math.abs(box.width - other.width) <= snapToSize && Math.abs(box.height - other.height) <= snapToSize) {
                        box.width = other.width;
                        box.height = other.height;
                        break;
                    }
                }
            }

            //recalculate left or top position
            if (~attr.indexOf('l')) {
                box.left = this.box.width - box.width;
            }
            if (~attr.indexOf('t')) {
                box.top = this.box.height - box.height;
            }
        },
        resizeComplete: function resizeComplete() {
            resizeElement.call(this, this.el, this.result.width, this.result.height);
        }
    };

    function DragEvent(window, document) {
        this.window = window;
        this.document = document;
        this.events = {
            mousemove: bind(this.mousemove, this),
            keydown: bind(this.keydown, this),
            mouseup: bind(this.mouseup, this)
        };
    }

    DragEvent.prototype = {
        start: function start(e) {
            e.preventDefault();
            e.stopPropagation();
            this.target = e.target;
            this.attr = e.target.className;
            this.startPos = {
                x: e.clientX,
                y: e.clientY
            };
            this.update(e);
            var events = this.events;
            this.document.addEventListener('mousemove', events.mousemove, false);
            this.document.addEventListener('keydown', events.keydown, false);
            this.document.addEventListener('mouseup', events.mouseup, false);
            this.document.body.classList.add('dragging-' + this.attr);
            this.onStart && this.onStart();
        },
        update: function update(e) {
            this.currentPos = {
                x: e.clientX,
                y: e.clientY
            };
            this.delta = {
                x: e.clientX - this.startPos.x,
                y: e.clientY - this.startPos.y
            };
            this.keys = {
                shift: e.shiftKey,
                ctrl: e.ctrlKey,
                alt: e.altKey
            };
        },
        mousemove: function mousemove(e) {
            this.update(e);
            this.onDrag && this.onDrag();
            if (e.which === 0) {
                //mouse button released outside window; mouseup wasn't fired (Chrome)
                this.mouseup(e);
            }
        },
        keydown: function keydown(e) {
            //escape key cancels dragging
            if (e.keyCode === 27) {
                this.release();
            }
        },
        mouseup: function mouseup(e) {
            this.update(e);
            this.release();
            this.onComplete && this.onComplete();
        },
        release: function release() {
            this.document.body.classList.remove('dragging-' + this.attr);
            var events = this.events;
            this.document.removeEventListener('mousemove', events.mousemove, false);
            this.document.removeEventListener('keydown', events.keydown, false);
            this.document.removeEventListener('mouseup', events.mouseup, false);
            this.onRelease && this.onRelease();
        }
    };

    //helper functions
    function toArray(obj) {
        var len = obj.length,
            arr = new Array(len);
        for (var i = 0; i < len; i++) {
            arr[i] = obj[i];
        }
        return arr;
    }

    function bind(fn, ctx) {
        if (fn.bind) {
            return fn.bind(ctx);
        }
        return function () {
            fn.apply(ctx, arguments);
        };
    }

    function positionElement(el, left, top) {
        el.style.left = String(left) + 'px';
        el.style.top = String(top) + 'px';
    }

    function resizeElement(el, width, height) {
        var imageScaleResize = this.editor.config.imageScaleResize;
        if (imageScaleResize === 'both') {
            el.style.width = String(width) + 'px';
            el.style.height = String(height) + 'px';
        } else if (imageScaleResize === 'width' || imageScaleResize === 'scale') {
            el.style.height = 'auto';
            el.style.width = String(width) + 'px';
        } else if (imageScaleResize === 'height') {
            el.style.height = String(height) + 'px';
            el.style.width = 'auto';
        }
    }

    function getBoundingBox(window, el) {
        var rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset,
            width: rect.width,
            height: rect.height
        };
    }
})();
'use strict';

/**
 * CKEditor plugin: Image2
 * - Show gripper to resize images on IE
 */
(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_dragresize_ie')) {
        return;
    }

    var alignmentsObj = {
        center: 1,
        left: 0,
        right: 2
    };

    /*
     * Set cursor css depend on imageScaleResize config
     **/

    var cursor = {
        both: 'nwse-resize',
        height: 'ns-resize',
        scale: 'nwse-resize',
        width: 'ew-resize'
    };

    var regexPercent = /^\s*(\d+\%)\s*$/i;

    var template = '<img alt="" src="" />';

    CKEDITOR.plugins.add('ae_dragresize_ie', {
        hidpi: true,

        icons: 'image',

        init: function init(editor) {
            var image = widgetDef(editor);

            // Register the widget.
            editor.widgets.add('image', image);
        },

        onLoad: function onLoad() {
            CKEDITOR.addCss('.cke_image_resizer_nwse-resize{' + 'cursor: nwse-resize;' + '}' + '.cke_image_resizer_ns-resize{' + 'cursor: ns-resize;' + '}' + '.cke_image_resizer_nwse-resize{' + 'cursor: nwse-resize;' + '}' + '.cke_image_resizer_ew-resize{' + 'cursor: ew-resize;' + '}' + '.cke_image_nocaption{' +
            // This is to remove unwanted space so resize
            // wrapper is displayed property.
            'line-height:0' + '}' + '.cke_image_resizer{' + 'display:none;' + 'position:absolute;' + 'width:10px;' + 'height:10px;' + 'bottom:-5px;' + 'right:-5px;' + 'background:#000;' + 'outline:1px solid #fff;' +
            // Prevent drag handler from being misplaced (#11207).
            'line-height:0;' + 'cursor:nwse-resize;' + '}' + '.cke_image_resizer_wrapper{' + 'position:relative;' + 'display:inline-block;' + 'line-height:0;' + '}' + '.cke_widget_wrapper:hover .cke_image_resizer,' + '.cke_image_resizer.cke_image_resizing{' + 'display:block' + '}');
        },

        requires: 'widget'
    });

    // Wiget states (forms) depending on alignment and configuration.
    //
    // Non-captioned widget (inline styles)
    // 		┌──────┬───────────────────────────────┬─────────────────────────────┐
    // 		│Align │Internal form                  │Data                         │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│none  │<wrapper>                      │<img />                      │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│left  │<wrapper style=”float:left”>   │<img style=”float:left” />   │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│center│<wrapper>                      │<p style=”text-align:center”>│
    // 		│      │ <p style=”text-align:center”> │  <img />                    │
    // 		│      │   <img />                     │</p>                         │
    // 		│      │ </p>                          │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│right │<wrapper style=”float:right”>  │<img style=”float:right” />  │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		└──────┴───────────────────────────────┴─────────────────────────────┘
    //
    // Non-captioned widget (config.image2_alignClasses defined)
    // 		┌──────┬───────────────────────────────┬─────────────────────────────┐
    // 		│Align │Internal form                  │Data                         │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│none  │<wrapper>                      │<img />                      │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│left  │<wrapper class=”left”>         │<img class=”left” />         │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│center│<wrapper>                      │<p class=”center”>           │
    // 		│      │ <p class=”center”>            │ <img />                     │
    // 		│      │   <img />                     │</p>                         │
    // 		│      │ </p>                          │                             │
    // 		│      │</wrapper>                     │                             │
    // 		├──────┼───────────────────────────────┼─────────────────────────────┤
    // 		│right │<wrapper class=”right”>        │<img class=”right” />        │
    // 		│      │ <img />                       │                             │
    // 		│      │</wrapper>                     │                             │
    // 		└──────┴───────────────────────────────┴─────────────────────────────┘
    //
    // Captioned widget (inline styles)
    // 		┌──────┬────────────────────────────────────────┬────────────────────────────────────────┐
    // 		│Align │Internal form                           │Data                                    │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│none  │<wrapper>                               │<figure />                              │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│left  │<wrapper style=”float:left”>            │<figure style=”float:left” />           │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│center│<wrapper style=”text-align:center”>     │<div style=”text-align:center”>         │
    // 		│      │ <figure style=”display:inline-block” />│ <figure style=”display:inline-block” />│
    // 		│      │</wrapper>                              │</p>                                    │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│right │<wrapper style=”float:right”>           │<figure style=”float:right” />          │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		└──────┴────────────────────────────────────────┴────────────────────────────────────────┘
    //
    // Captioned widget (config.image2_alignClasses defined)
    // 		┌──────┬────────────────────────────────────────┬────────────────────────────────────────┐
    // 		│Align │Internal form                           │Data                                    │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│none  │<wrapper>                               │<figure />                              │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│left  │<wrapper class=”left”>                  │<figure class=”left” />                 │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│center│<wrapper class=”center”>                │<div class=”center”>                    │
    // 		│      │ <figure />                             │ <figure />                             │
    // 		│      │</wrapper>                              │</p>                                    │
    // 		├──────┼────────────────────────────────────────┼────────────────────────────────────────┤
    // 		│right │<wrapper class=”right”>                 │<figure class=”right” />                │
    // 		│      │ <figure />                             │                                        │
    // 		│      │</wrapper>                              │                                        │
    // 		└──────┴────────────────────────────────────────┴────────────────────────────────────────┘
    //
    // @param {CKEDITOR.editor}
    // @returns {Object}
    function widgetDef(editor) {
        editor.config.imageScaleResize = editor.config.imageScaleResize || 'both';

        editor.on('imageAdd', function (imageData) {
            editor.widgets.initOn(imageData.data.el, 'image');
        });

        var alignClasses = editor.config.image2_alignClasses;

        var captionedClass = editor.config.image2_captionedClass;

        return {
            init: function init() {
                var helpers = CKEDITOR.plugins.image2;

                var image = this.parts.image;

                var data = {
                    alt: image.getAttribute('alt') || '',
                    hasCaption: !!this.parts.caption,
                    height: image.getAttribute('height') || '',
                    // Lock ratio is on by default (#10833).
                    lock: this.ready ? helpers.checkHasNaturalRatio(image) : true,
                    src: image.getAttribute('src'),
                    width: image.getAttribute('width') || ''
                };

                // If we used 'a' in widget#parts definition, it could happen that
                // selected element is a child of widget.parts#caption. Since there's no clever
                // way to solve it with CSS selectors, it's done like that. (#11783).
                var link = image.getAscendant('a');

                if (link && this.wrapper.contains(link)) {
                    this.parts.link = link;
                }

                // Depending on configuration, read style/class from element and
                // then remove it. Removed style/class will be set on wrapper in #data listener.
                // Note: Center alignment is detected during upcast, so only left/right cases
                // are checked below.
                if (!data.align) {
                    var alignElement = data.hasCaption ? this.element : image;

                    // Read the initial left/right alignment from the class set on element.
                    if (alignClasses) {
                        if (alignElement.hasClass(alignClasses[0])) {
                            data.align = 'left';
                        } else if (alignElement.hasClass(alignClasses[2])) {
                            data.align = 'right';
                        }

                        if (data.align) {
                            alignElement.removeClass(alignClasses[alignmentsObj[data.align]]);
                        } else {
                            data.align = 'none';
                        }
                    }
                    // Read initial float style from figure/image and then remove it.
                    else {
                            data.align = alignElement.getStyle('float') || 'none';
                            alignElement.removeStyle('float');
                        }
                }

                // Get rid of extra vertical space when there's no caption.
                // It will improve the look of the resizer.
                this.wrapper[(data.hasCaption ? 'remove' : 'add') + 'Class']('cke_image_nocaption');

                this.setData(data);

                if (editor.config.image2_disableResizer !== true) {
                    setupResizer(this);
                }
            },

            // Overrides default method to handle internal mutability of Image2.
            // @see CKEDITOR.plugins.widget#addClass
            addClass: function addClass(className) {
                getStyleableElement(this).addClass(className);
            },

            allowedContent: getWidgetAllowedContent(editor),

            // This widget converts style-driven dimensions to attributes.
            contentTransformations: [['img[width]: sizeToAttribute']],

            data: function data() {
                var features = this.features;

                // Image can't be captioned when figcaption is disallowed (#11004).
                if (this.data.hasCaption && !editor.filter.checkFeature(features.caption)) {
                    this.data.hasCaption = false;
                }

                // Image can't be aligned when floating is disallowed (#11004).
                if (this.data.align != 'none' && !editor.filter.checkFeature(features.align)) {
                    this.data.align = 'none';
                }

                // Update widget.parts.link since it will not auto-update unless widget
                // is destroyed and re-inited.
                if (!this.data.link) {
                    if (this.parts.link) {
                        delete this.parts.link;
                    }
                } else {
                    if (!this.parts.link) {
                        this.parts.link = this.parts.image.getParent();
                    }
                }

                this.parts.image.setAttributes({
                    alt: this.data.alt,

                    contenteditable: this.parts.image.getAttribute('contenteditable') ? this.parts.image.getAttribute('contenteditable') : true,

                    // This internal is required by the editor.
                    'data-cke-saved-src': this.data.src,

                    src: this.data.src
                });

                // If shifting non-captioned -> captioned, remove classes
                // related to styles from <img/>.
                if (this.oldData && !this.oldData.hasCaption && this.data.hasCaption) {
                    for (var c in this.data.classes) {
                        this.parts.image.removeClass(c);
                    }
                }

                // Set dimensions of the image according to gathered data.
                // Do it only when the attributes are allowed (#11004).
                if (editor.filter.checkFeature(features.dimension)) {
                    setDimensions(this);
                }

                // Cache current data.
                this.oldData = CKEDITOR.tools.extend({}, this.data);
            },

            downcast: downcastWidgetElement(editor),

            draggable: false,

            // This widget has an editable caption.
            editables: {
                caption: {
                    selector: 'figcaption',
                    allowedContent: 'br em strong sub sup u s; a[!href,target]'
                }
            },

            features: getWidgetFeatures(editor),

            // Overrides default method to handle internal mutability of Image2.
            // @see CKEDITOR.plugins.widget#getClasses
            getClasses: function () {
                var classRegex = new RegExp('^(' + [].concat(captionedClass, alignClasses).join('|') + ')$');

                return function () {
                    var classes = this.repository.parseElementClasses(getStyleableElement(this).getAttribute('class'));

                    // Neither config.image2_captionedClass nor config.image2_alignClasses
                    // do not belong to style classes.
                    for (var c in classes) {
                        if (classRegex.test(c)) {
                            delete classes[c];
                        }
                    }

                    return classes;
                };
            }(),

            getLabel: function getLabel() {
                var label = (this.data.alt || '') + ' ' + this.pathName;

                return label;
            },

            // Overrides default method to handle internal mutability of Image2.
            // @see CKEDITOR.plugins.widget#hasClass
            hasClass: function hasClass(className) {
                return getStyleableElement(this).hasClass(className);
            },

            parts: {
                caption: 'figcaption',
                image: 'img'
            },

            // Overrides default method to handle internal mutability of Image2.
            // @see CKEDITOR.plugins.widget#removeClass
            removeClass: function removeClass(className) {
                getStyleableElement(this).removeClass(className);
            },

            requiredContent: 'img[src,alt]',

            styleableElements: 'img figure',

            // Template of the widget: plain image.
            template: template,

            upcast: upcastWidgetElement(editor)
        };
    }

    /**
     * A set of Enhanced Image (image2) plugin helpers.
     *
     * @class
     * @singleton
     */
    CKEDITOR.plugins.image2 = {
        /**
         * Checks whether the current image ratio matches the natural one
         * by comparing dimensions.
         *
         * @param {CKEDITOR.dom.element} image
         * @returns {Boolean}
         */
        checkHasNaturalRatio: function checkHasNaturalRatio(image) {
            var $ = image.$,
                natural = this.getNatural(image);

            // The reason for two alternative comparisons is that the rounding can come from
            // both dimensions, e.g. there are two cases:
            // 	1. height is computed as a rounded relation of the real height and the value of width,
            //	2. width is computed as a rounded relation of the real width and the value of heigh.
            return Math.round($.clientWidth / natural.width * natural.height) == $.clientHeight || Math.round($.clientHeight / natural.height * natural.width) == $.clientWidth;
        },

        /**
         * Returns natural dimensions of the image. For modern browsers
         * it uses natural(Width|Height). For old ones (IE8) it creates
         * a new image and reads the dimensions.
         *
         * @param {CKEDITOR.dom.element} image
         * @returns {Object}
         */
        getNatural: function getNatural(image) {
            var dimensions;

            if (image.$.naturalWidth) {
                dimensions = {
                    height: image.$.naturalHeigh,
                    width: image.$.naturalWidth
                };
            } else {
                var img = new Image();

                img.src = image.getAttribute('src');

                dimensions = {
                    height: img.heigh,
                    width: img.width
                };
            }

            return dimensions;
        }
    };

    // Returns a function that creates widgets from all <img> and
    // <figure class="{config.image2_captionedClass}"> elements.
    //
    // @param {CKEDITOR.editor} editor
    // @returns {Function}
    function upcastWidgetElement(editor) {
        var isCenterWrapper = centerWrapperChecker(editor);

        var captionedClass = editor.config.image2_captionedClass;

        // @param {CKEDITOR.htmlParser.element} el
        // @param {Object} data
        return function (el, data) {
            var dimensions = {
                height: 1,
                width: 1
            };

            var name = el.name;

            var image;

            // #11110 Don't initialize on pasted fake objects.
            if (el.attributes['data-cke-realelement']) {
                return;
            }

            // If a center wrapper is found, there are 3 possible cases:
            //
            // 1. <div style="text-align:center"><figure>...</figure></div>.
            //    In this case centering is done with a class set on widget.wrapper.
            //    Simply replace centering wrapper with figure (it's no longer necessary).
            //
            // 2. <p style="text-align:center"><img/></p>.
            //    Nothing to do here: <p> remains for styling purposes.
            //
            // 3. <div style="text-align:center"><img/></div>.
            //    Nothing to do here (2.) but that case is only possible in enterMode different
            //    than ENTER_P.
            if (isCenterWrapper(el)) {
                if (name == 'div') {
                    var figure = el.getFirst('figure');

                    // Case #1.
                    if (figure) {
                        el.replaceWith(figure);
                        el = figure;
                    }
                }
                // Cases #2 and #3 (handled transparently)

                // If there's a centering wrapper, save it in data.
                data.align = 'center';

                // Image can be wrapped in link <a><img/></a>.
                image = el.getFirst('img') || el.getFirst('a').getFirst('img');
            }

            // No center wrapper has been found.
            else if (name == 'figure' && el.hasClass(captionedClass)) {
                    image = el.getFirst('img') || el.getFirst('a').getFirst('img');

                    // Upcast linked image like <a><img/></a>.
                } else if (isLinkedOrStandaloneImage(el)) {
                    image = el.name == 'a' ? el.children[0] : el;
                }

            if (!image) {
                return;
            }

            // If there's an image, then cool, we got a widget.
            // Now just remove dimension attributes expressed with %.
            for (var d in dimensions) {
                var dimension = image.attributes[d];

                if (dimension && dimension.match(regexPercent)) {
                    delete image.attributes[d];
                }
            }

            return el;
        };
    }

    // Returns a function which transforms the widget to the external format
    // according to the current configuration.
    //
    // @param {CKEDITOR.editor}
    function downcastWidgetElement(editor) {
        var alignClasses = editor.config.image2_alignClasses;

        // @param {CKEDITOR.htmlParser.element} el
        return function (el) {
            // In case of <a><img/></a>, <img/> is the element to hold
            // inline styles or classes (image2_alignClasses).
            var attrsHolder = el.name == 'a' ? el.getFirst() : el;

            var attrs = attrsHolder.attributes;

            var align = this.data.align;

            // De-wrap the image from resize handle wrapper.
            // Only block widgets have one.
            if (!this.inline) {
                var resizeWrapper = el.getFirst('span');

                if (resizeWrapper) {
                    resizeWrapper.replaceWith(resizeWrapper.getFirst({
                        a: 1,
                        img: 1
                    }));
                }
            }

            if (align && align != 'none') {
                var styles = CKEDITOR.tools.parseCssText(attrs.style || '');

                // When the widget is captioned (<figure>) and internally centering is done
                // with widget's wrapper style/class, in the external data representation,
                // <figure> must be wrapped with an element holding an style/class:
                //
                // 	<div style="text-align:center">
                // 		<figure class="image" style="display:inline-block">...</figure>
                // 	</div>
                // or
                // 	<div class="some-center-class">
                // 		<figure class="image">...</figure>
                // 	</div>
                //
                if (align == 'center' && el.name == 'figure') {
                    el = el.wrapWith(new CKEDITOR.htmlParser.element('div', alignClasses ? {
                        'class': alignClasses[1]
                    } : {
                        style: 'text-align:center'
                    }));
                }

                // If left/right, add float style to the downcasted element.
                else if (align in {
                        left: 1,
                        right: 1
                    }) {
                        if (alignClasses) {
                            attrsHolder.addClass(alignClasses[alignmentsObj[align]]);
                        } else {
                            styles['float'] = align;
                        }
                    }

                // Update element styles.
                if (!alignClasses && !CKEDITOR.tools.isEmpty(styles)) {
                    attrs.style = CKEDITOR.tools.writeCssText(styles);
                }
            }

            return el;
        };
    }

    // Returns a function that checks if an element is a centering wrapper.
    //
    // @param {CKEDITOR.editor} editor
    // @returns {Function}
    function centerWrapperChecker(editor) {
        var captionedClass = editor.config.image2_captionedClass;

        var alignClasses = editor.config.image2_alignClasses;

        var validChildren = {
            a: 1,
            figure: 1,
            img: 1
        };

        return function (el) {
            // Wrapper must be either <div> or <p>.
            if (!(el.name in {
                div: 1,
                p: 1
            })) {
                return false;
            }

            var children = el.children;

            // Centering wrapper can have only one child.
            if (children.length !== 1) {
                return false;
            }

            var child = children[0];

            // Only <figure> or <img /> can be first (only) child of centering wrapper,
            // regardless of its type.
            if (!(child.name in validChildren)) {
                return false;
            }

            // If centering wrapper is <p>, only <img /> can be the child.
            //   <p style="text-align:center"><img /></p>
            if (el.name == 'p') {
                if (!isLinkedOrStandaloneImage(child)) {
                    return false;
                }
            }
            // Centering <div> can hold <img/> or <figure>, depending on enterMode.
            else {
                    // If a <figure> is the first (only) child, it must have a class.
                    //   <div style="text-align:center"><figure>...</figure><div>
                    if (child.name == 'figure') {
                        if (!child.hasClass(captionedClass)) {
                            return false;
                        }
                    } else {
                        // Centering <div> can hold <img/> or <a><img/></a> only when enterMode
                        // is ENTER_(BR|DIV).
                        //   <div style="text-align:center"><img /></div>
                        //   <div style="text-align:center"><a><img /></a></div>
                        if (editor.enterMode == CKEDITOR.ENTER_P) {
                            return false;
                        }

                        // Regardless of enterMode, a child which is not <figure> must be
                        // either <img/> or <a><img/></a>.
                        if (!isLinkedOrStandaloneImage(child)) {
                            return false;
                        }
                    }
                }

            // Centering wrapper got to be... centering. If image2_alignClasses are defined,
            // check for centering class. Otherwise, check the style.
            if (alignClasses ? el.hasClass(alignClasses[1]) : CKEDITOR.tools.parseCssText(el.attributes.style || '', true)['text-align'] == 'center') {
                return true;
            }

            return false;
        };
    }

    // Checks whether element is <img/> or <a><img/></a>.
    //
    // @param {CKEDITOR.htmlParser.element}
    function isLinkedOrStandaloneImage(el) {
        if (el.name == 'img') {
            return true;
        } else if (el.name == 'a') {
            return el.children.length == 1 && el.getFirst('img');
        }

        return false;
    }

    // Sets width and height of the widget image according to current widget data.
    //
    // @param {CKEDITOR.plugins.widget} widget
    function setDimensions(widget) {
        var data = widget.data;

        var dimensions = {
            height: data.height,
            width: data.width
        };

        var image = widget.parts.image;

        for (var d in dimensions) {
            if (dimensions[d]) {
                image.setAttribute(d, dimensions[d]);
            } else {
                image.removeAttribute(d);
            }
        }
    }

    // Defines all features related to drag-driven image resizing.
    //
    // @param {CKEDITOR.plugins.widget} widget
    function setupResizer(widget) {
        var editor = widget.editor;

        var editable = editor.editable();

        var doc = editor.document;

        // Store the resizer in a widget for testing (#11004).
        var resizer = widget.resizer = doc.createElement('span');

        resizer.addClass('cke_image_resizer');
        resizer.addClass('cke_image_resizer_' + cursor[editor.config.imageScaleResize]);
        resizer.append(new CKEDITOR.dom.text('\u200B', doc));

        // Inline widgets don't need a resizer wrapper as an image spans the entire widget.
        if (!widget.inline) {
            var imageOrLink = widget.parts.link || widget.parts.image;

            var oldResizeWrapper = imageOrLink.getParent();

            var resizeWrapper = doc.createElement('span');

            resizeWrapper.addClass('cke_image_resizer_wrapper');
            resizeWrapper.append(imageOrLink);
            resizeWrapper.append(resizer);
            widget.element.append(resizeWrapper, true);

            // Remove the old wrapper which could came from e.g. pasted HTML
            // and which could be corrupted (e.g. resizer span has been lost).
            if (oldResizeWrapper.is('span')) {
                oldResizeWrapper.remove();
            }
        } else {
            widget.wrapper.append(resizer);
        }

        // Calculate values of size variables and mouse offsets.
        resizer.on('mousedown', function (evt) {
            var image = widget.parts.image;

            // "factor" can be either 1 or -1. I.e.: For right-aligned images, we need to
            // subtract the difference to get proper width, etc. Without "factor",
            // resizer starts working the opposite way.
            var factor = widget.data.align == 'right' ? -1 : 1;

            // The x-coordinate of the mouse relative to the screen
            // when button gets pressed.
            var startX = evt.data.$.screenX;

            var startY = evt.data.$.screenY;

            // The initial dimensions and aspect ratio of the image.
            var startWidth = image.$.clientWidth;

            var startHeight = image.$.clientHeight;

            var listeners = [];

            // A class applied to editable during resizing.
            var cursorClass = 'cke_image_s' + (!~factor ? 'w' : 'e');

            var nativeEvt, newWidth, newHeight, updateData;

            var moveDiffX, moveDiffY, moveRatio;

            // Save the undo snapshot first: before resizing.
            editor.fire('saveSnapshot');

            // Mousemove listeners are removed on mouseup.
            attachToDocuments('mousemove', onMouseMove, listeners);

            // Clean up the mousemove listener. Update widget data if valid.
            attachToDocuments('mouseup', onMouseUp, listeners);

            // The entire editable will have the special cursor while resizing goes on.
            editable.addClass(cursorClass);

            // This is to always keep the resizer element visible while resizing.
            resizer.addClass('cke_image_resizing');

            // Attaches an event to a global document if inline editor.
            // Additionally, if classic (`iframe`-based) editor, also attaches the same event to `iframe`'s document.
            function attachToDocuments(name, callback, collection) {
                var globalDoc = CKEDITOR.document;

                var listeners = [];

                if (!doc.equals(globalDoc)) {
                    listeners.push(globalDoc.on(name, callback));
                }

                listeners.push(doc.on(name, callback));

                if (collection) {
                    for (var i = listeners.length; i--;) {
                        collection.push(listeners.pop());
                    }
                }
            }

            // This is how variables refer to the geometry.
            // Note: x corresponds to moveOffset, this is the position of mouse
            // Note: o corresponds to [startX, startY].
            //
            // 	+--------------+--------------+
            // 	|              |              |
            // 	|      I       |      II      |
            // 	|              |              |
            // 	+------------- o -------------+ _ _ _
            // 	|              |              |      ^

            // 	|      VI      |     III      |      | moveDiffY
            // 	|              |         x _ _ _ _ _ v
            // 	+--------------+---------|----+
            // 	               |         |
            // 	                <------->
            // 	                moveDiffX
            function onMouseMove(evt) {
                var imageScaleResize = editor.config.imageScaleResize;

                nativeEvt = evt.data.$;

                // This is how far the mouse is from the point the button was pressed.
                moveDiffX = nativeEvt.screenX - startX;
                moveDiffY = startY - nativeEvt.screenY;

                // This is the aspect ratio of the move difference.
                moveRatio = Math.abs(moveDiffX / moveDiffY);

                if (imageScaleResize === 'width' || imageScaleResize === 'both' || imageScaleResize === 'scale') {
                    newWidth = startWidth + factor * moveDiffX;
                }

                if (imageScaleResize === 'height' || imageScaleResize === 'both') {
                    newHeight = startHeight - moveDiffY;
                }

                if (imageScaleResize === 'scale') {
                    newHeight = 'auto';
                }

                newWidth = newWidth || startWidth;
                newHeight = newHeight || startHeight;

                // Don't update attributes if less than 10.
                // This is to prevent images to visually disappear.
                if (newWidth >= 15 && (newHeight >= 15 || newHeight === 'auto')) {
                    image.setAttributes({
                        width: newWidth,
                        height: newHeight
                    });
                    updateData = true;
                } else {
                    updateData = false;
                }
            }

            function onMouseUp() {
                var l;

                while (l = listeners.pop()) {
                    l.removeListener();
                }

                // Restore default cursor by removing special class.
                editable.removeClass(cursorClass);

                // This is to bring back the regular behaviour of the resizer.
                resizer.removeClass('cke_image_resizing');

                if (updateData) {
                    widget.setData({
                        height: newHeight,
                        width: newWidth
                    });

                    // Save another undo snapshot: after resizing.
                    editor.fire('saveSnapshot');
                }

                // Don't update data twice or more.
                updateData = false;
            }
        });

        // Change the position of the widget resizer when data changes.
        widget.on('data', function () {
            resizer[widget.data.align == 'right' ? 'addClass' : 'removeClass']('cke_image_resizer_left');
        });

        widget.parts.image.on('click', function () {

            editor._.editable.editor.getSelection().selectElement(this);

            var selectionData = editor._.editable.editor.getSelectionData();
            if (selectionData) {
                editor.fire('editorInteraction', {
                    nativeEvent: event,
                    selectionData: selectionData
                });
            }
        });
    }

    // Returns a set of widget allowedContent rules, depending
    // on configurations like config#image2_alignClasses or
    // config#image2_captionedClass.
    //
    // @param {CKEDITOR.editor}
    // @returns {Object}
    function getWidgetAllowedContent(editor) {
        var rules = {
            figcaption: true,
            figure: {
                classes: '!' + editor.config.image2_captionedClass
            },
            img: {
                attributes: '!src,alt,width,height'
            }
        };

        return rules;
    }

    // Returns a set of widget feature rules, depending
    // on editor configuration. Note that the following may not cover
    // all the possible cases since requiredContent supports a single
    // tag only.
    //
    // @param {CKEDITOR.editor}
    // @returns {Object}
    function getWidgetFeatures(editor) {
        var alignClasses = editor.config.image2_alignClasses;

        var features = {
            align: {
                requiredContent: 'img' + (alignClasses ? '(' + alignClasses[0] + ')' : '{float}')
            },
            caption: {
                requiredContent: 'figcaption'
            },
            dimension: {
                requiredContent: 'img[width,height]'
            }
        };

        return features;
    }

    // Returns element which is styled, considering current
    // state of the widget.
    //
    // @see CKEDITOR.plugins.widget#applyStyle
    // @param {CKEDITOR.plugins.widget} widget
    // @returns {CKEDITOR.dom.element}
    function getStyleableElement(widget) {
        return widget.data.hasCaption ? widget.element : widget.parts.image;
    }
})();

CKEDITOR.config.image2_captionedClass = 'image';
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_embed')) {
        return;
    }

    var REGEX_HTTP = /^https?/;

    var REGEX_DEFAULT_LINK = /<a href=/;

    var PROVIDERS = ['youtube', 'twitter'];

    CKEDITOR.DEFAULT_AE_EMBED_URL_TPL = 'http://alloy.iframe.ly/api/oembed?url={url}&callback={callback}';
    CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL = '<div data-ae-embed-url="{url}"></div>';
    CKEDITOR.DEFAULT_AE_EMBED_DEFAULT_LINK_TPL = '<a href="{url}">{url}</a>';
    /**
     * CKEditor plugin which adds the infrastructure to embed urls as media objects using an oembed
     * service. By default, and for demoing purposes only, the oembed service is hosted in iframe.ly
     * at //alloy.iframe.ly/api/oembed?url={url}&callback={callback}. Note this should be changed to
     * a self-hosted or paid service in production environments. Access to the alloy.iframe.ly endpoint
     * may be restricted per domain due to significant traffic.
     *
     * This plugin adds an `embedUrl` command that can be used to easily embed a URL and transform it
     * to an embedded content.
     *
     * @class CKEDITOR.plugins.ae_embed
     */
    CKEDITOR.plugins.add('ae_embed', {
        requires: 'widget',
        init: function init(editor) {
            var AE_EMBED_URL_TPL = new CKEDITOR.template(editor.config.embedUrlTemplate || CKEDITOR.DEFAULT_AE_EMBED_URL_TPL);
            var AE_EMBED_WIDGET_TPL = new CKEDITOR.template(editor.config.embedWidgetTpl || CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL);
            var AE_EMBED_DEFAULT_LINK_TPL = new CKEDITOR.template(editor.config.embedLinkDefaultTpl || CKEDITOR.DEFAULT_AE_EMBED_DEFAULT_LINK_TPL);

            // Default function to upcast DOM elements to embed widgets.
            // It matches CKEDITOR.DEFAULT_AE_EMBED_WIDGET_TPL
            var defaultEmbedWidgetUpcastFn = function defaultEmbedWidgetUpcastFn(element, data) {
                if (element.name === 'div' && element.attributes['data-ae-embed-url']) {
                    data.url = element.attributes['data-ae-embed-url'];

                    return true;
                }
            };

            // Create a embedUrl command that can be invoked to easily embed media URLs
            editor.addCommand('embedUrl', {
                exec: function exec(editor, data) {
                    editor.insertHtml(AE_EMBED_WIDGET_TPL.output({
                        url: data.url
                    }));
                }
            });

            // Create a widget to properly handle embed operations
            editor.widgets.add('ae_embed', {

                mask: true,
                requiredContent: 'div[data-ae-embed-url]',

                /**
                 * Listener to be executed every time the widget's data changes. It takes care of
                 * requesting the embed object to the configured oembed service and render it in
                 * the editor
                 *
                 * @method data
                 * @param {event} event Data change event
                 */
                data: function data(event) {
                    var widget = this;

                    var url = event.data.url;

                    if (url) {
                        CKEDITOR.tools.jsonp(AE_EMBED_URL_TPL, {
                            url: encodeURIComponent(url)
                        }, function (response) {
                            if (response.html) {
                                if (REGEX_DEFAULT_LINK.test(response.html)) {
                                    widget.createATag(url);
                                } else {
                                    widget.element.setHtml(response.html);
                                }
                            } else {
                                widget.createATag(url);
                            }
                        }, function (msg) {
                            widget.createATag(url);
                        });
                    }
                },

                createATag: function createATag(url) {
                    this.editor.execCommand('undo');

                    var currentSelection = this.editor.getSelection().getSelectedElement();

                    var aTagHtml = AE_EMBED_DEFAULT_LINK_TPL.output({
                        url: url
                    });

                    this.editor.insertHtml(aTagHtml);
                    this.editor.fire('actionPerformed', this);
                },

                /**
                 * Function used to upcast an element to ae_embed widgets.
                 *
                 * @method upcast
                 * @param {CKEDITOR.htmlParser.element} element The element to be checked
                 * @param {Object} data The object that will be passed to the widget
                 */
                upcast: function upcast(element, data) {
                    var embedWidgetUpcastFn = editor.config.embedWidgetUpcastFn || defaultEmbedWidgetUpcastFn;

                    return embedWidgetUpcastFn(element, data);
                }
            });

            // Add a listener to handle paste events and turn links into embed objects
            editor.once('contentDom', function () {
                editor.on('paste', function (event) {
                    var link = event.data.dataValue;

                    if (REGEX_HTTP.test(link)) {
                        event.stop();

                        editor.execCommand('embedUrl', {
                            url: event.data.dataValue
                        });
                    }
                });
            });

            // Add a listener to handle selection change events and properly detect editor
            // interactions on the widgets without messing with widget native selection
            editor.on('selectionChange', function (event) {
                var selection = editor.getSelection();

                if (selection) {
                    var element = selection.getSelectedElement();

                    if (element) {
                        var widgetElement = element.findOne('[data-widget="ae_embed"]');

                        if (widgetElement) {
                            var region = element.getClientRect();

                            var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();
                            region.left -= scrollPosition.x;
                            region.top += scrollPosition.y;

                            region.direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;

                            editor.fire('editorInteraction', {
                                nativeEvent: {},
                                selectionData: {
                                    element: widgetElement,
                                    region: region
                                }
                            });
                        }
                    }
                }
            });

            // Add a filter to skip filtering widget elements
            editor.filter.addElementCallback(function (element) {
                if ('data-ae-embed-url' in element.attributes) {
                    return CKEDITOR.FILTER_SKIP_TREE;
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_imagealignment')) {
        return;
    }

    /**
     * Enum for supported image alignments
     * @type {Object}
     */
    var IMAGE_ALIGNMENT = {
        CENTER: 'center',
        LEFT: 'left',
        RIGHT: 'right'
    };

    /**
     * Enum values for supported image alignments
     * @type {Array}
     */
    var ALIGN_VALUES = [IMAGE_ALIGNMENT.LEFT, IMAGE_ALIGNMENT.RIGHT, IMAGE_ALIGNMENT.CENTER];

    /**
     * Necessary styles for the center alignment
     * @type {Array.<Object>}
     */
    var CENTERED_IMAGE_STYLE = [{
        name: 'display',
        value: 'block'
    }, {
        name: 'margin-left',
        value: 'auto'
    }, {
        name: 'margin-right',
        value: 'auto'
    }];

    /**
     * Retrieves the alignment value of an image.
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @return {String} The alignment value
     */
    var getImageAlignment = function getImageAlignment(image) {
        var imageAlignment = image.getStyle('float');

        if (!imageAlignment || imageAlignment === 'inherit' || imageAlignment === 'none') {
            imageAlignment = image.getAttribute('align');
        }

        if (!imageAlignment) {
            var centeredImage = CENTERED_IMAGE_STYLE.every(function (style) {
                var styleCheck = image.getStyle(style.name) === style.value;

                if (!styleCheck && style.vendorPrefixes) {
                    styleCheck = style.vendorPrefixes.some(function (vendorPrefix) {
                        return image.getStyle(vendorPrefix + style.name) === style.value;
                    });
                }

                return styleCheck;
            });

            imageAlignment = centeredImage ? IMAGE_ALIGNMENT.CENTER : null;
        }

        return imageAlignment;
    };

    /**
     * Removes the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be removed
     */
    var removeImageAlignment = function removeImageAlignment(image, imageAlignment) {
        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.removeStyle('float');

            if (imageAlignment === getImageAlignment(image)) {
                image.removeAttribute('align');
            }
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function (style) {
                image.removeStyle(style.name);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function (vendorPrefix) {
                        image.removeStyle(vendorPrefix + style.name);
                    });
                }
            });
        }
    };

    /**
     * Sets the alignment value of an image
     *
     * @param {CKEDITOR.dom.element} image The image element
     * @param {String} imageAlignment The image alignment value to be set
     */
    var setImageAlignment = function setImageAlignment(image, imageAlignment) {
        removeImageAlignment(image, getImageAlignment(image));

        if (imageAlignment === IMAGE_ALIGNMENT.LEFT || imageAlignment === IMAGE_ALIGNMENT.RIGHT) {
            image.setStyle('float', imageAlignment);
        } else if (imageAlignment === IMAGE_ALIGNMENT.CENTER) {
            CENTERED_IMAGE_STYLE.forEach(function (style) {
                image.setStyle(style.name, style.value);

                if (style.vendorPrefixes) {
                    style.vendorPrefixes.forEach(function (vendorPrefix) {
                        image.setStyle(vendorPrefix + style.name, style.value);
                    });
                }
            });
        }
    };

    /**
     * CKEditor plugin which modifies the justify commands to properly align images. This
     * plugin is an excerpt of CKEditor's original image one that can be found at
     * https://github.com/ckeditor/ckeditor-dev/blob/master/plugins/image/plugin.js
     *
     * @class CKEDITOR.plugins.ae_imagealignment
     */
    CKEDITOR.plugins.add('ae_imagealignment', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'paste' event on the editing area.
         *
         * @method afterInit
         * @param {Object} editor The current editor instance
         */
        afterInit: function afterInit(editor) {
            var self = this;

            ALIGN_VALUES.forEach(function (value) {
                var command = editor.getCommand('justify' + value);

                if (command) {
                    command.on('exec', function (event) {
                        var selectionData = editor.getSelectionData();

                        if (selectionData && AlloyEditor.SelectionTest.image({ data: { selectionData: selectionData } })) {
                            var image = selectionData.element;

                            var imageAlignment = getImageAlignment(image);

                            if (imageAlignment === value) {
                                removeImageAlignment(image, value);
                            } else {
                                setImageAlignment(image, value);
                            }

                            event.cancel();

                            self.refreshCommands(editor, new CKEDITOR.dom.elementPath(image));
                        }
                    });

                    command.on('refresh', function (event) {
                        var selectionData = {
                            element: event.data.path.lastElement
                        };

                        if (AlloyEditor.SelectionTest.image({ data: { selectionData: selectionData } })) {
                            var imageAlignment = getImageAlignment(selectionData.element);

                            this.setState(imageAlignment === value ? CKEDITOR.TRISTATE_ON : CKEDITOR.TRISTATE_OFF);

                            event.cancel();
                        }
                    });
                }
            });
        },

        /**
         * Forces a refresh of the modified justify commands. This is needed because the applied changes
         * do not modify the selection, so the refresh is never triggered and the UI does not update
         * properly until the next selectionChange event.
         *
         * @param {CKEDITOR.editor} editor The editor instance
         * @param {CKEDITOR.dom.elementPath} elementPath The path of the selected image
         */
        refreshCommands: function refreshCommands(editor, elementPath) {
            ALIGN_VALUES.forEach(function (value) {
                var command = editor.getCommand('justify' + value);

                if (command) {
                    command.refresh(editor, elementPath);
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_pasteimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows pasting images directly into the editable area. The image will be encoded
     * as Data URI. An event `beforeImageAdd` will be fired with the list of pasted images. If any of the listeners
     * returns `false` or cancels the event, the images won't be added to the content. Otherwise,
     * an event `imageAdd` will be fired with the inserted element into the editable area.
     *
     * @class CKEDITOR.plugins.ae_pasteimages
     */

    /**
     * Fired before adding images to the editor.
     * @event beforeImageAdd
     * @param {Array} imageFiles Array of image files
     */

    /**
     * Fired when an image is being added to the editor successfully.
     *
     * @event imageAdd
     * @param {CKEDITOR.dom.element} el The created image with src as Data URI
     * @param {File} file The image file
     */

    CKEDITOR.plugins.add('ae_pasteimages', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'paste' event on the editing area.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.once('contentDom', function () {
                var editable = editor.editable();

                editable.attachListener(editable, 'paste', this._onPaste, this, {
                    editor: editor
                });
            }.bind(this));
        },

        /**
         * The function creates an img element with src the image data as Data URI.
         * Then, it fires an 'imageAdd' event via CKEditor's event system. The passed
         * params will be:
         * - `el` - the created img element
         * - `file` - the original pasted data
         *
         * @method _onPaste
         * @protected
         * @param {CKEDITOR.dom.event} event A `paste` event, as received natively from CKEditor
         */
        _onPaste: function _onPaste(event) {
            if (event.data.$.clipboardData) {
                var pastedData = event.data.$.clipboardData.items[0];
                var editor = event.listenerData.editor;

                if (pastedData.type.indexOf('image') === 0) {
                    var reader = new FileReader();
                    var imageFile = pastedData.getAsFile();

                    reader.onload = function (event) {
                        var result = editor.fire('beforeImageAdd', {
                            imageFiles: imageFile
                        });

                        if (!!result) {
                            var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                            editor.insertElement(el);

                            var imageData = {
                                el: el,
                                file: imageFile
                            };

                            editor.fire('imageAdd', imageData);
                        }
                    }.bind(this);

                    reader.readAsDataURL(imageFile);
                }
            }
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_placeholder')) {
        return;
    }

    /**
     * CKEDITOR enterMode config set the behavior of paragraphs
     * When the content is empty CKEDITOR keeps the enterMode string
     * into the content
     * @property
     * @type {string}
     */
    var brFiller = CKEDITOR.env.needsBrFiller ? '<br>' : '';

    var enterModeEmptyValue = {
        1: ['<p>' + brFiller + '</p>'],
        2: ['', ' ', brFiller],
        3: ['<div>' + brFiller + '</div>']
    };

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.ae_placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focused.
     *
     * @attribute placeholderClass
     * @default ae_placeholder
     * @type String
     */

    CKEDITOR.plugins.add('ae_placeholder', {

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function registers a 'blur' and 'contentDom' event listeners.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            editor.on('blur', this._checkEmptyData, this);
            editor.on('change', this._checkEmptyData, this);
            editor.on('focus', this._removePlaceholderClass, this);
            editor.once('contentDom', this._checkEmptyData, this);
        },

        /**
         * Removes any data from the content and adds a class,
         * specified by the "placeholderClass" config attribute.
         *
         * @protected
         * @method _checkEmptyData
         * @param {CKEDITOR.dom.event} editor event, fired from CKEditor
         */
        _checkEmptyData: function _checkEmptyData(event) {
            var editor = event.editor;

            var editableNode = editor.editable();

            var innerHtml = editableNode.$.innerHTML.trim();

            var isEmpty = enterModeEmptyValue[editor.config.enterMode].some(function (element) {
                return innerHtml === element;
            });

            if (isEmpty) {
                editableNode.addClass(editor.config.placeholderClass);
            } else {
                editableNode.removeClass(editor.config.placeholderClass);
            }
        },

        /**
         * Remove placeholder class when input is focused
         *
         * @protected
         * @method _removePlaceholderClass
         + @param {CKEDITOR.dom.event} editor event, fired from CKEditor
         */
        _removePlaceholderClass: function _removePlaceholderClass(event) {
            var editor = event.editor;

            var editorNode = new CKEDITOR.dom.element(editor.element.$);

            editorNode.removeClass(editor.config.placeholderClass);
        }
    });
})();
'use strict';

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_selectionkeystrokes')) {
        return;
    }

    /**
     * CKEditor plugin that simulates editor interaction events based on manual keystrokes. This
     * can be used to trigger different reactions in the editor.
     *
     * @class CKEDITOR.plugins.ae_selectionkeystrokes
     */
    CKEDITOR.plugins.add('ae_selectionkeystrokes', {
        requires: 'ae_selectionregion',

        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         * The function adds a command to the editor for every defined selectionKeystroke
         * in the configuration and maps it to the specified keystroke.
         *
         * @method init
         * @param {Object} editor The current editor instance
         */
        init: function init(editor) {
            if (editor.config.selectionKeystrokes) {
                editor.config.selectionKeystrokes.forEach(function (selectionKeystroke) {
                    var command = new CKEDITOR.command(editor, {
                        exec: function exec(editor) {
                            editor.fire('editorInteraction', {
                                manualSelection: selectionKeystroke.selection,
                                nativeEvent: {},
                                selectionData: editor.getSelectionData()
                            });
                        }
                    });

                    var commandName = 'selectionKeystroke' + selectionKeystroke.selection;

                    editor.addCommand(commandName, command);
                    editor.setKeystroke(selectionKeystroke.keys, commandName);
                });
            }
        }
    });
})();
'use strict';

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function () {
    'use strict';

    if (CKEDITOR.plugins.get('ae_tableresize')) {
        return;
    }

    var pxUnit = CKEDITOR.tools.cssLength;

    function getWidth(el) {
        return CKEDITOR.env.ie ? el.$.clientWidth : parseInt(el.getComputedStyle('width'), 10);
    }

    function getBorderWidth(element, side) {
        var computed = element.getComputedStyle('border-' + side + '-width'),
            borderMap = {
            thin: '0px',
            medium: '1px',
            thick: '2px'
        };

        if (computed.indexOf('px') < 0) {
            // look up keywords
            if (computed in borderMap && element.getComputedStyle('border-style') != 'none') {
                computed = borderMap[computed];
            } else {
                computed = 0;
            }
        }

        return parseInt(computed, 10);
    }

    // Gets the table row that contains the most columns.
    function getMasterPillarRow(table) {
        var $rows = table.$.rows,
            maxCells = 0,
            cellsCount,
            $elected,
            $tr;

        for (var i = 0, len = $rows.length; i < len; i++) {
            $tr = $rows[i];
            cellsCount = $tr.cells.length;

            if (cellsCount > maxCells) {
                maxCells = cellsCount;
                $elected = $tr;
            }
        }

        return $elected;
    }

    function buildTableColumnPillars(table) {
        var pillars = [],
            pillarIndex = -1,
            rtl = table.getComputedStyle('direction') === 'rtl';

        // Get the raw row element that cointains the most columns.
        var $tr = getMasterPillarRow(table);

        // Get the tbody element and position, which will be used to set the
        // top and bottom boundaries.
        var tbody = new CKEDITOR.dom.element(table.$.tBodies[0]),
            tbodyPosition = tbody.getDocumentPosition();

        // Loop thorugh all cells, building pillars after each one of them.
        for (var i = 0, len = $tr.cells.length; i < len; i++) {
            // Both the current cell and the successive one will be used in the
            // pillar size calculation.
            var td = new CKEDITOR.dom.element($tr.cells[i]),
                nextTd = $tr.cells[i + 1] && new CKEDITOR.dom.element($tr.cells[i + 1]);

            pillarIndex += td.$.colSpan || 1;

            // Calculate the pillar boundary positions.
            var pillarLeft, pillarRight, pillarWidth;

            var x = td.getDocumentPosition().x;

            // Calculate positions based on the current cell.
            rtl ? pillarRight = x + getBorderWidth(td, 'left') : pillarLeft = x + td.$.offsetWidth - getBorderWidth(td, 'right');

            // Calculate positions based on the next cell, if available.
            if (nextTd) {
                x = nextTd.getDocumentPosition().x;

                rtl ? pillarLeft = x + nextTd.$.offsetWidth - getBorderWidth(nextTd, 'right') : pillarRight = x + getBorderWidth(nextTd, 'left');
            }
            // Otherwise calculate positions based on the table (for last cell).
            else {
                    x = table.getDocumentPosition().x;

                    rtl ? pillarLeft = x : pillarRight = x + table.$.offsetWidth;
                }

            pillarWidth = Math.max(pillarRight - pillarLeft, 4);

            // The pillar should reflects exactly the shape of the hovered
            // column border line.
            pillars.push({
                table: table,
                index: pillarIndex,
                x: pillarLeft,
                y: tbodyPosition.y,
                width: pillarWidth,
                height: tbody.$.offsetHeight,
                rtl: rtl
            });
        }

        return pillars;
    }

    function getPillarAtPosition(pillars, positionX) {
        for (var i = 0, len = pillars.length; i < len; i++) {
            var pillar = pillars[i];

            if (positionX >= pillar.x && positionX <= pillar.x + pillar.width) {
                return pillar;
            }
        }

        return null;
    }

    function cancel(evt) {
        (evt.data || evt).preventDefault();
    }

    function columnResizer(editor) {
        var pillar, document, resizer, isResizing, startOffset, currentShift;

        var leftSideCells, rightSideCells, leftShiftBoundary, rightShiftBoundary;

        function detach() {
            pillar = null;
            currentShift = 0;
            isResizing = 0;

            document.removeListener('mouseup', onMouseUp);
            resizer.removeListener('mousedown', onMouseDown);
            resizer.removeListener('mousemove', onMouseMove);

            document.getBody().setStyle('cursor', 'auto');
        }

        function resizeStart() {
            // Before starting to resize, figure out which cells to change
            // and the boundaries of this resizing shift.

            var columnIndex = pillar.index,
                map = CKEDITOR.tools.buildTableMap(pillar.table),
                leftColumnCells = [],
                rightColumnCells = [],
                leftMinSize = Number.MAX_VALUE,
                rightMinSize = leftMinSize,
                rtl = pillar.rtl;

            for (var i = 0, len = map.length; i < len; i++) {
                var row = map[i],
                    leftCell = row[columnIndex + (rtl ? 1 : 0)],
                    rightCell = row[columnIndex + (rtl ? 0 : 1)];

                leftCell = leftCell && new CKEDITOR.dom.element(leftCell);
                rightCell = rightCell && new CKEDITOR.dom.element(rightCell);

                if (!leftCell || !rightCell || !leftCell.equals(rightCell)) {
                    leftCell && (leftMinSize = Math.min(leftMinSize, getWidth(leftCell)));
                    rightCell && (rightMinSize = Math.min(rightMinSize, getWidth(rightCell)));

                    leftColumnCells.push(leftCell);
                    rightColumnCells.push(rightCell);
                }
            }

            // Cache the list of cells to be resized.
            leftSideCells = leftColumnCells;
            rightSideCells = rightColumnCells;

            // Cache the resize limit boundaries.
            leftShiftBoundary = pillar.x - leftMinSize;
            rightShiftBoundary = pillar.x + rightMinSize;

            resizer.setOpacity(0.5);
            startOffset = parseInt(resizer.getStyle('left'), 10);
            currentShift = 0;
            isResizing = 1;

            resizer.on('mousemove', onMouseMove);

            // Prevent the native drag behavior otherwise 'mousemove' won't fire.
            document.on('dragstart', cancel);
        }

        function resizeEnd() {
            isResizing = 0;

            resizer.setOpacity(0);

            currentShift && resizeColumn();

            var table = pillar.table;
            setTimeout(function () {
                table.removeCustomData('_cke_table_pillars');
            }, 0);

            document.removeListener('dragstart', cancel);
        }

        function resizeColumn() {
            var rtl = pillar.rtl,
                cellsCount = rtl ? rightSideCells.length : leftSideCells.length;

            // Perform the actual resize to table cells, only for those by side of the pillar.
            for (var i = 0; i < cellsCount; i++) {
                var leftCell = leftSideCells[i],
                    rightCell = rightSideCells[i],
                    table = pillar.table;

                // Defer the resizing to avoid any interference among cells.
                CKEDITOR.tools.setTimeout(function (leftCell, leftOldWidth, rightCell, rightOldWidth, tableWidth, sizeShift) {
                    // 1px is the minimum valid width (#11626).
                    leftCell && leftCell.setStyle('width', pxUnit(Math.max(leftOldWidth + sizeShift, 1)));
                    rightCell && rightCell.setStyle('width', pxUnit(Math.max(rightOldWidth - sizeShift, 1)));

                    // If we're in the last cell, we need to resize the table as well
                    if (tableWidth) {
                        table.setStyle('width', pxUnit(tableWidth + sizeShift * (rtl ? -1 : 1)));
                    }
                }, 0, this, [leftCell, leftCell && getWidth(leftCell), rightCell, rightCell && getWidth(rightCell), (!leftCell || !rightCell) && getWidth(table) + getBorderWidth(table, 'left') + getBorderWidth(table, 'right'), currentShift]);
            }
        }

        function onMouseDown(evt) {
            cancel(evt);

            resizeStart();

            document.on('mouseup', onMouseUp, this);
        }

        function onMouseUp(evt) {
            evt.removeListener();

            resizeEnd();
        }

        function onMouseMove(evt) {
            move(evt.data.getPageOffset().x);
        }

        document = editor.document;

        resizer = CKEDITOR.dom.element.createFromHtml('<div data-cke-temp=1 contenteditable=false unselectable=on ' + 'style="position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;' + 'padding:0;background-color:#004;background-image:none;border:0px none;z-index:10"></div>', document);

        // Clean DOM when editor is destroyed.
        editor.on('destroy', function () {
            resizer.remove();
        });

        // Place the resizer after body to prevent it
        // from being editable.
        document.getDocumentElement().append(resizer);

        this.attachTo = function (targetPillar) {
            // Accept only one pillar at a time.
            if (isResizing) {
                return;
            }

            pillar = targetPillar;

            resizer.setStyles({
                width: pxUnit(targetPillar.width),
                height: pxUnit(targetPillar.height),
                left: pxUnit(targetPillar.x),
                top: pxUnit(targetPillar.y)
            });

            resizer.on('mousedown', onMouseDown, this);

            document.getBody().setStyle('cursor', 'col-resize');

            // Display the resizer to receive events but don't show it,
            // only change the cursor to resizable shape.
            resizer.show();
        };

        var move = this.move = function (posX) {
            if (!pillar) {
                return 0;
            }

            if (!isResizing && (posX < pillar.x || posX > pillar.x + pillar.width)) {
                detach();
                return 0;
            }

            var resizerNewPosition = posX - Math.round(resizer.$.offsetWidth / 2);

            if (isResizing) {
                if (resizerNewPosition === leftShiftBoundary || resizerNewPosition === rightShiftBoundary) {
                    return 1;
                }

                resizerNewPosition = Math.max(resizerNewPosition, leftShiftBoundary);
                resizerNewPosition = Math.min(resizerNewPosition, rightShiftBoundary);

                currentShift = resizerNewPosition - startOffset;
            }

            resizer.setStyle('left', pxUnit(resizerNewPosition));

            return 1;
        };
    }

    function clearPillarsCache(evt) {
        var target = evt.data.getTarget();

        if (evt.name === 'mouseout') {
            // Bypass interal mouse move.
            if (!target.is('table')) {
                return;
            }

            var dest = new CKEDITOR.dom.element(evt.data.$.relatedTarget || evt.data.$.toElement);
            while (dest && dest.$ && !dest.equals(target) && !dest.is('body')) {
                dest = dest.getParent();
            }
            if (!dest || dest.equals(target)) {
                return;
            }
        }

        target.getAscendant('table', 1).removeCustomData('_cke_table_pillars');
        evt.removeListener();
    }

    CKEDITOR.plugins.add('ae_tableresize', {
        requires: 'ae_tabletools',

        init: function init(editor) {
            editor.on('contentDom', function () {
                var resizer,
                    editable = editor.editable();

                // In Classic editor it is better to use document
                // instead of editable so event will work below body.
                editable.attachListener(editable.isInline() ? editable : editor.document, 'mousemove', function (evt) {
                    evt = evt.data;

                    var target = evt.getTarget();

                    // FF may return document and IE8 some UFO (object with no nodeType property...)
                    // instead of an element (#11823).
                    if (target.type !== CKEDITOR.NODE_ELEMENT) {
                        return;
                    }

                    var pageX = evt.getPageOffset().x;

                    // If we're already attached to a pillar, simply move the
                    // resizer.
                    if (resizer && resizer.move(pageX)) {
                        cancel(evt);
                        return;
                    }

                    // Considering table, tr, td, tbody but nothing else.
                    var table, pillars;

                    if (!target.is('table') && !target.getAscendant('tbody', 1)) {
                        return;
                    }

                    table = target.getAscendant('table', 1);

                    // Make sure the table we found is inside the container
                    // (eg. we should not use tables the editor is embedded within)
                    if (!editor.editable().contains(table)) {
                        return;
                    }

                    if (!(pillars = table.getCustomData('_cke_table_pillars'))) {
                        // Cache table pillars calculation result.
                        table.setCustomData('_cke_table_pillars', pillars = buildTableColumnPillars(table));
                        table.on('mouseout', clearPillarsCache);
                        table.on('mousedown', clearPillarsCache);
                    }

                    var pillar = getPillarAtPosition(pillars, pageX);
                    if (pillar) {
                        !resizer && (resizer = new columnResizer(editor));
                        resizer.attachTo(pillar);
                    }
                });
            });
        }
    });
})();
'use strict';

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function () {
	'use strict';

	if (CKEDITOR.plugins.get('ae_tabletools')) {
		return;
	}

	var cellNodeRegex = /^(?:td|th)$/;

	function getSelectedCells(selection) {
		var ranges = selection.getRanges();
		var retval = [];
		var database = {};

		function moveOutOfCellGuard(node) {
			// Apply to the first cell only.
			if (retval.length > 0) return;

			// If we are exiting from the first </td>, then the td should definitely be
			// included.
			if (node.type == CKEDITOR.NODE_ELEMENT && cellNodeRegex.test(node.getName()) && !node.getCustomData('selected_cell')) {
				CKEDITOR.dom.element.setMarker(database, node, 'selected_cell', true);
				retval.push(node);
			}
		}

		for (var i = 0; i < ranges.length; i++) {
			var range = ranges[i];

			if (range.collapsed) {
				// Walker does not handle collapsed ranges yet - fall back to old API.
				var startNode = range.getCommonAncestor();
				var nearestCell = startNode.getAscendant('td', true) || startNode.getAscendant('th', true);
				if (nearestCell) retval.push(nearestCell);
			} else {
				var walker = new CKEDITOR.dom.walker(range);
				var node;
				walker.guard = moveOutOfCellGuard;

				while (node = walker.next()) {
					// If may be possible for us to have a range like this:
					// <td>^1</td><td>^2</td>
					// The 2nd td shouldn't be included.
					//
					// So we have to take care to include a td we've entered only when we've
					// walked into its children.

					if (node.type != CKEDITOR.NODE_ELEMENT || !node.is(CKEDITOR.dtd.table)) {
						var parent = node.getAscendant('td', true) || node.getAscendant('th', true);
						if (parent && !parent.getCustomData('selected_cell')) {
							CKEDITOR.dom.element.setMarker(database, parent, 'selected_cell', true);
							retval.push(parent);
						}
					}
				}
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		return retval;
	}

	function getFocusElementAfterDelCells(cellsToDelete) {
		var i = 0,
		    last = cellsToDelete.length - 1,
		    database = {},
		    cell,
		    focusedCell,
		    tr;

		while (cell = cellsToDelete[i++]) {
			CKEDITOR.dom.element.setMarker(database, cell, 'delete_cell', true);
		} // 1.first we check left or right side focusable cell row by row;
		i = 0;
		while (cell = cellsToDelete[i++]) {
			if ((focusedCell = cell.getPrevious()) && !focusedCell.getCustomData('delete_cell') || (focusedCell = cell.getNext()) && !focusedCell.getCustomData('delete_cell')) {
				CKEDITOR.dom.element.clearAllMarkers(database);
				return focusedCell;
			}
		}

		CKEDITOR.dom.element.clearAllMarkers(database);

		// 2. then we check the toppest row (outside the selection area square) focusable cell
		tr = cellsToDelete[0].getParent();
		if (tr = tr.getPrevious()) return tr.getLast();

		// 3. last we check the lowerest  row focusable cell
		tr = cellsToDelete[last].getParent();
		if (tr = tr.getNext()) return tr.getChild(0);

		return null;
	}

	function insertRow(selection, insertBefore) {
		var cells = getSelectedCells(selection),
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    doc = firstCell.getDocument(),
		    startRow = cells[0].getParent(),
		    startRowIndex = startRow.$.rowIndex,
		    lastCell = cells[cells.length - 1],
		    endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
		    endRow = new CKEDITOR.dom.element(table.$.rows[endRowIndex]),
		    rowIndex = insertBefore ? startRowIndex : endRowIndex,
		    row = insertBefore ? startRow : endRow;

		var map = CKEDITOR.tools.buildTableMap(table),
		    cloneRow = map[rowIndex],
		    nextRow = insertBefore ? map[rowIndex - 1] : map[rowIndex + 1],
		    width = map[0].length;

		var newRow = doc.createElement('tr');
		for (var i = 0; cloneRow[i] && i < width; i++) {
			var cell;
			// Check whether there's a spanning row here, do not break it.
			if (cloneRow[i].rowSpan > 1 && nextRow && cloneRow[i] == nextRow[i]) {
				cell = cloneRow[i];
				cell.rowSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneRow[i]).clone();
				cell.removeAttribute('rowSpan');
				cell.appendBogus();
				newRow.append(cell);
				cell = cell.$;
			}

			i += cell.colSpan - 1;
		}

		insertBefore ? newRow.insertBefore(row) : newRow.insertAfter(row);
	}

	function deleteRows(selectionOrRow) {
		if (selectionOrRow instanceof CKEDITOR.dom.selection) {
			var cells = getSelectedCells(selectionOrRow),
			    firstCell = cells[0],
			    table = firstCell.getAscendant('table'),
			    map = CKEDITOR.tools.buildTableMap(table),
			    startRow = cells[0].getParent(),
			    startRowIndex = startRow.$.rowIndex,
			    lastCell = cells[cells.length - 1],
			    endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
			    rowsToDelete = [];

			// Delete cell or reduce cell spans by checking through the table map.
			for (var i = startRowIndex; i <= endRowIndex; i++) {
				var mapRow = map[i],
				    row = new CKEDITOR.dom.element(table.$.rows[i]);

				for (var j = 0; j < mapRow.length; j++) {
					var cell = new CKEDITOR.dom.element(mapRow[j]),
					    cellRowIndex = cell.getParent().$.rowIndex;

					if (cell.$.rowSpan == 1) cell.remove();
					// Row spanned cell.
					else {
							// Span row of the cell, reduce spanning.
							cell.$.rowSpan -= 1;
							// Root row of the cell, root cell to next row.
							if (cellRowIndex == i) {
								var nextMapRow = map[i + 1];
								nextMapRow[j - 1] ? cell.insertAfter(new CKEDITOR.dom.element(nextMapRow[j - 1])) : new CKEDITOR.dom.element(table.$.rows[i + 1]).append(cell, 1);
							}
						}

					j += cell.$.colSpan - 1;
				}

				rowsToDelete.push(row);
			}

			var rows = table.$.rows;

			// Where to put the cursor after rows been deleted?
			// 1. Into next sibling row if any;
			// 2. Into previous sibling row if any;
			// 3. Into table's parent element if it's the very last row.
			var cursorPosition = new CKEDITOR.dom.element(rows[endRowIndex + 1] || (startRowIndex > 0 ? rows[startRowIndex - 1] : null) || table.$.parentNode);

			for (i = rowsToDelete.length; i >= 0; i--) {
				deleteRows(rowsToDelete[i]);
			}return cursorPosition;
		} else if (selectionOrRow instanceof CKEDITOR.dom.element) {
			table = selectionOrRow.getAscendant('table');

			if (table.$.rows.length == 1) table.remove();else selectionOrRow.remove();
		}

		return null;
	}

	function getCellColIndex(cell, isStart) {
		var row = cell.getParent(),
		    rowCells = row.$.cells;

		var colIndex = 0;
		for (var i = 0; i < rowCells.length; i++) {
			var mapCell = rowCells[i];
			colIndex += isStart ? 1 : mapCell.colSpan;
			if (mapCell == cell.$) break;
		}

		return colIndex - 1;
	}

	function getColumnsIndices(cells, isStart) {
		var retval = isStart ? Infinity : 0;
		for (var i = 0; i < cells.length; i++) {
			var colIndex = getCellColIndex(cells[i], isStart);
			if (isStart ? colIndex < retval : colIndex > retval) retval = colIndex;
		}
		return retval;
	}

	function insertColumn(selection, insertBefore) {
		var cells = getSelectedCells(selection),
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    startCol = getColumnsIndices(cells, 1),
		    lastCol = getColumnsIndices(cells),
		    colIndex = insertBefore ? startCol : lastCol;

		var map = CKEDITOR.tools.buildTableMap(table),
		    cloneCol = [],
		    nextCol = [],
		    height = map.length;

		for (var i = 0; i < height; i++) {
			cloneCol.push(map[i][colIndex]);
			var nextCell = insertBefore ? map[i][colIndex - 1] : map[i][colIndex + 1];
			nextCol.push(nextCell);
		}

		for (i = 0; i < height; i++) {
			var cell;

			if (!cloneCol[i]) continue;

			// Check whether there's a spanning column here, do not break it.
			if (cloneCol[i].colSpan > 1 && nextCol[i] == cloneCol[i]) {
				cell = cloneCol[i];
				cell.colSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element(cloneCol[i]).clone();
				cell.removeAttribute('colSpan');
				cell.appendBogus();
				cell[insertBefore ? 'insertBefore' : 'insertAfter'].call(cell, new CKEDITOR.dom.element(cloneCol[i]));
				cell = cell.$;
			}

			i += cell.rowSpan - 1;
		}
	}

	function deleteColumns(selectionOrCell) {
		var cells = getSelectedCells(selectionOrCell),
		    firstCell = cells[0],
		    lastCell = cells[cells.length - 1],
		    table = firstCell.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    startColIndex,
		    endColIndex,
		    rowsToDelete = [];

		// Figure out selected cells' column indices.
		for (var i = 0, rows = map.length; i < rows; i++) {
			for (var j = 0, cols = map[i].length; j < cols; j++) {
				if (map[i][j] == firstCell.$) startColIndex = j;
				if (map[i][j] == lastCell.$) endColIndex = j;
			}
		}

		// Delete cell or reduce cell spans by checking through the table map.
		for (i = startColIndex; i <= endColIndex; i++) {
			for (j = 0; j < map.length; j++) {
				var mapRow = map[j],
				    row = new CKEDITOR.dom.element(table.$.rows[j]),
				    cell = new CKEDITOR.dom.element(mapRow[i]);

				if (cell.$) {
					if (cell.$.colSpan == 1) cell.remove();
					// Reduce the col spans.
					else cell.$.colSpan -= 1;

					j += cell.$.rowSpan - 1;

					if (!row.$.cells.length) rowsToDelete.push(row);
				}
			}
		}

		var firstRowCells = table.$.rows[0] && table.$.rows[0].cells;

		// Where to put the cursor after columns been deleted?
		// 1. Into next cell of the first row if any;
		// 2. Into previous cell of the first row if any;
		// 3. Into table's parent element;
		var cursorPosition = new CKEDITOR.dom.element(firstRowCells[startColIndex] || (startColIndex ? firstRowCells[startColIndex - 1] : table.$.parentNode));

		// Delete table rows only if all columns are gone (do not remove empty row).
		if (rowsToDelete.length == rows) table.remove();

		return cursorPosition;
	}

	function insertCell(selection, insertBefore) {
		var startElement = selection.getStartElement();
		var cell = startElement.getAscendant('td', 1) || startElement.getAscendant('th', 1);

		if (!cell) return;

		// Create the new cell element to be added.
		var newCell = cell.clone();
		newCell.appendBogus();

		if (insertBefore) newCell.insertBefore(cell);else newCell.insertAfter(cell);
	}

	function deleteCells(selectionOrCell) {
		if (selectionOrCell instanceof CKEDITOR.dom.selection) {
			var cellsToDelete = getSelectedCells(selectionOrCell);
			var table = cellsToDelete[0] && cellsToDelete[0].getAscendant('table');
			var cellToFocus = getFocusElementAfterDelCells(cellsToDelete);

			for (var i = cellsToDelete.length - 1; i >= 0; i--) {
				deleteCells(cellsToDelete[i]);
			}if (cellToFocus) placeCursorInCell(cellToFocus, true);else if (table) table.remove();
		} else if (selectionOrCell instanceof CKEDITOR.dom.element) {
			var tr = selectionOrCell.getParent();
			if (tr.getChildCount() == 1) tr.remove();else selectionOrCell.remove();
		}
	}

	// Remove filler at end and empty spaces around the cell content.
	function trimCell(cell) {
		var bogus = cell.getBogus();
		bogus && bogus.remove();
		cell.trim();
	}

	function placeCursorInCell(cell, placeAtEnd) {
		var docInner = cell.getDocument(),
		    docOuter = CKEDITOR.document;

		// Fixing "Unspecified error" thrown in IE10 by resetting
		// selection the dirty and shameful way (#10308).
		// We can not apply this hack to IE8 because
		// it causes error (#11058).
		if (CKEDITOR.env.ie && CKEDITOR.env.version == 10) {
			docOuter.focus();
			docInner.focus();
		}

		var range = new CKEDITOR.dom.range(docInner);
		if (!range['moveToElementEdit' + (placeAtEnd ? 'End' : 'Start')](cell)) {
			range.selectNodeContents(cell);
			range.collapse(placeAtEnd ? false : true);
		}
		range.select(true);
	}

	function cellInRow(tableMap, rowIndex, cell) {
		var oRow = tableMap[rowIndex];
		if (typeof cell == 'undefined') return oRow;

		for (var c = 0; oRow && c < oRow.length; c++) {
			if (cell.is && oRow[c] == cell.$) return c;else if (c == cell) return new CKEDITOR.dom.element(oRow[c]);
		}
		return cell.is ? -1 : null;
	}

	function cellInCol(tableMap, colIndex) {
		var oCol = [];
		for (var r = 0; r < tableMap.length; r++) {
			var row = tableMap[r];
			oCol.push(row[colIndex]);

			// Avoid adding duplicate cells.
			if (row[colIndex].rowSpan > 1) r += row[colIndex].rowSpan - 1;
		}
		return oCol;
	}

	function mergeCells(selection, mergeDirection, isDetect) {
		var cells = getSelectedCells(selection);

		// Invalid merge request if:
		// 1. In batch mode despite that less than two selected.
		// 2. In solo mode while not exactly only one selected.
		// 3. Cells distributed in different table groups (e.g. from both thead and tbody).
		var commonAncestor;
		if ((mergeDirection ? cells.length != 1 : cells.length < 2) || (commonAncestor = selection.getCommonAncestor()) && commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is('table')) return false;

		var cell,
		    firstCell = cells[0],
		    table = firstCell.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    mapHeight = map.length,
		    mapWidth = map[0].length,
		    startRow = firstCell.getParent().$.rowIndex,
		    startColumn = cellInRow(map, startRow, firstCell);

		if (mergeDirection) {
			var targetCell;
			try {
				var rowspan = parseInt(firstCell.getAttribute('rowspan'), 10) || 1;
				var colspan = parseInt(firstCell.getAttribute('colspan'), 10) || 1;

				targetCell = map[mergeDirection == 'up' ? startRow - rowspan : mergeDirection == 'down' ? startRow + rowspan : startRow][mergeDirection == 'left' ? startColumn - colspan : mergeDirection == 'right' ? startColumn + colspan : startColumn];
			} catch (er) {
				return false;
			}

			// 1. No cell could be merged.
			// 2. Same cell actually.
			if (!targetCell || firstCell.$ == targetCell) return false;

			// Sort in map order regardless of the DOM sequence.
			cells[mergeDirection == 'up' || mergeDirection == 'left' ? 'unshift' : 'push'](new CKEDITOR.dom.element(targetCell));
		}

		// Start from here are merging way ignorance (merge up/right, batch merge).
		var doc = firstCell.getDocument(),
		    lastRowIndex = startRow,
		    totalRowSpan = 0,
		    totalColSpan = 0,

		// Use a documentFragment as buffer when appending cell contents.
		frag = !isDetect && new CKEDITOR.dom.documentFragment(doc),
		    dimension = 0;

		for (var i = 0; i < cells.length; i++) {
			cell = cells[i];

			var tr = cell.getParent(),
			    cellFirstChild = cell.getFirst(),
			    colSpan = cell.$.colSpan,
			    rowSpan = cell.$.rowSpan,
			    rowIndex = tr.$.rowIndex,
			    colIndex = cellInRow(map, rowIndex, cell);

			// Accumulated the actual places taken by all selected cells.
			dimension += colSpan * rowSpan;
			// Accumulated the maximum virtual spans from column and row.
			totalColSpan = Math.max(totalColSpan, colIndex - startColumn + colSpan);
			totalRowSpan = Math.max(totalRowSpan, rowIndex - startRow + rowSpan);

			if (!isDetect) {
				// Trim all cell fillers and check to remove empty cells.
				if (trimCell(cell), cell.getChildren().count()) {
					// Merge vertically cells as two separated paragraphs.
					if (rowIndex != lastRowIndex && cellFirstChild && !(cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary({ br: 1 }))) {
						var last = frag.getLast(CKEDITOR.dom.walker.whitespaces(true));
						if (last && !(last.is && last.is('br'))) frag.append('br');
					}

					cell.moveChildren(frag);
				}
				i ? cell.remove() : cell.setHtml('');
			}
			lastRowIndex = rowIndex;
		}

		if (!isDetect) {
			frag.moveChildren(firstCell);

			firstCell.appendBogus();

			if (totalColSpan >= mapWidth) firstCell.removeAttribute('rowSpan');else firstCell.$.rowSpan = totalRowSpan;

			if (totalRowSpan >= mapHeight) firstCell.removeAttribute('colSpan');else firstCell.$.colSpan = totalColSpan;

			// Swip empty <tr> left at the end of table due to the merging.
			var trs = new CKEDITOR.dom.nodeList(table.$.rows),
			    count = trs.count();

			for (i = count - 1; i >= 0; i--) {
				var tailTr = trs.getItem(i);
				if (!tailTr.$.cells.length) {
					tailTr.remove();
					count++;
					continue;
				}
			}

			return firstCell;
		}
		// Be able to merge cells only if actual dimension of selected
		// cells equals to the caculated rectangle.
		else {
				return totalRowSpan * totalColSpan == dimension;
			}
	}

	function verticalSplitCell(selection, isDetect) {
		var cells = getSelectedCells(selection);
		if (cells.length > 1) return false;else if (isDetect) return true;

		var cell = cells[0],
		    tr = cell.getParent(),
		    table = tr.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    rowIndex = tr.$.rowIndex,
		    colIndex = cellInRow(map, rowIndex, cell),
		    rowSpan = cell.$.rowSpan,
		    newCell,
		    newRowSpan,
		    newCellRowSpan,
		    newRowIndex;

		if (rowSpan > 1) {
			newRowSpan = Math.ceil(rowSpan / 2);
			newCellRowSpan = Math.floor(rowSpan / 2);
			newRowIndex = rowIndex + newRowSpan;
			var newCellTr = new CKEDITOR.dom.element(table.$.rows[newRowIndex]),
			    newCellRow = cellInRow(map, newRowIndex),
			    candidateCell;

			newCell = cell.clone();

			// Figure out where to insert the new cell by checking the vitual row.
			for (var c = 0; c < newCellRow.length; c++) {
				candidateCell = newCellRow[c];
				// Catch first cell actually following the column.
				if (candidateCell.parentNode == newCellTr.$ && c > colIndex) {
					newCell.insertBefore(new CKEDITOR.dom.element(candidateCell));
					break;
				} else {
					candidateCell = null;
				}
			}

			// The destination row is empty, append at will.
			if (!candidateCell) newCellTr.append(newCell);
		} else {
			newCellRowSpan = newRowSpan = 1;

			newCellTr = tr.clone();
			newCellTr.insertAfter(tr);
			newCellTr.append(newCell = cell.clone());

			var cellsInSameRow = cellInRow(map, rowIndex);
			for (var i = 0; i < cellsInSameRow.length; i++) {
				cellsInSameRow[i].rowSpan++;
			}
		}

		newCell.appendBogus();

		cell.$.rowSpan = newRowSpan;
		newCell.$.rowSpan = newCellRowSpan;
		if (newRowSpan == 1) cell.removeAttribute('rowSpan');
		if (newCellRowSpan == 1) newCell.removeAttribute('rowSpan');

		return newCell;
	}

	function horizontalSplitCell(selection, isDetect) {
		var cells = getSelectedCells(selection);
		if (cells.length > 1) return false;else if (isDetect) return true;

		var cell = cells[0],
		    tr = cell.getParent(),
		    table = tr.getAscendant('table'),
		    map = CKEDITOR.tools.buildTableMap(table),
		    rowIndex = tr.$.rowIndex,
		    colIndex = cellInRow(map, rowIndex, cell),
		    colSpan = cell.$.colSpan,
		    newCell,
		    newColSpan,
		    newCellColSpan;

		if (colSpan > 1) {
			newColSpan = Math.ceil(colSpan / 2);
			newCellColSpan = Math.floor(colSpan / 2);
		} else {
			newCellColSpan = newColSpan = 1;
			var cellsInSameCol = cellInCol(map, colIndex);
			for (var i = 0; i < cellsInSameCol.length; i++) {
				cellsInSameCol[i].colSpan++;
			}
		}
		newCell = cell.clone();
		newCell.insertAfter(cell);
		newCell.appendBogus();

		cell.$.colSpan = newColSpan;
		newCell.$.colSpan = newCellColSpan;
		if (newColSpan == 1) cell.removeAttribute('colSpan');
		if (newCellColSpan == 1) newCell.removeAttribute('colSpan');

		return newCell;
	}

	CKEDITOR.plugins.add('ae_tabletools', {
		init: function init(editor) {
			var lang = editor.lang.table;

			function createDef(def) {
				return CKEDITOR.tools.extend(def || {}, {
					contextSensitive: 1,
					refresh: function refresh(editor, path) {
						this.setState(path.contains({ td: 1, th: 1 }, 1) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED);
					}
				});
			}
			function addCmd(name, def) {
				var cmd = editor.getCommand(name);

				if (cmd) {
					return;
				}

				cmd = editor.addCommand(name, def);
				editor.addFeature(cmd);
			}

			addCmd('rowDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					placeCursorInCell(deleteRows(selection));
				}
			}));

			addCmd('rowInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertRow(selection, true);
				}
			}));

			addCmd('rowInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertRow(selection);
				}
			}));

			addCmd('columnDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					var element = deleteColumns(selection);
					element && placeCursorInCell(element, true);
				}
			}));

			addCmd('columnInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertColumn(selection, true);
				}
			}));

			addCmd('columnInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertColumn(selection);
				}
			}));

			addCmd('cellDelete', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					deleteCells(selection);
				}
			}));

			addCmd('cellMerge', createDef({
				allowedContent: 'td[colspan,rowspan]',
				requiredContent: 'td[colspan,rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection()), true);
				}
			}));

			addCmd('cellMergeRight', createDef({
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection(), 'right'), true);
				}
			}));

			addCmd('cellMergeDown', createDef({
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(mergeCells(editor.getSelection(), 'down'), true);
				}
			}));

			addCmd('cellVerticalSplit', createDef({
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function exec(editor) {
					placeCursorInCell(verticalSplitCell(editor.getSelection()));
				}
			}));

			addCmd('cellHorizontalSplit', createDef({
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function exec(editor) {
					placeCursorInCell(horizontalSplitCell(editor.getSelection()));
				}
			}));

			addCmd('cellInsertBefore', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertCell(selection, true);
				}
			}));

			addCmd('cellInsertAfter', createDef({
				requiredContent: 'table',
				exec: function exec(editor) {
					var selection = editor.getSelection();
					insertCell(selection);
				}
			}));
		},

		getSelectedCells: getSelectedCells

	});
})();

/**
 * Create a two-dimension array that reflects the actual layout of table cells,
 * with cell spans, with mappings to the original td elements.
 *
 * @param {CKEDITOR.dom.element} table
 * @member CKEDITOR.tools
 */
CKEDITOR.tools.buildTableMap = function (table) {
	var aRows = table.$.rows;

	// Row and Column counters.
	var r = -1;

	var aMap = [];

	for (var i = 0; i < aRows.length; i++) {
		r++;
		!aMap[r] && (aMap[r] = []);

		var c = -1;

		for (var j = 0; j < aRows[i].cells.length; j++) {
			var oCell = aRows[i].cells[j];

			c++;
			while (aMap[r][c]) {
				c++;
			}var iColSpan = isNaN(oCell.colSpan) ? 1 : oCell.colSpan;
			var iRowSpan = isNaN(oCell.rowSpan) ? 1 : oCell.rowSpan;

			for (var rs = 0; rs < iRowSpan; rs++) {
				if (!aMap[r + rs]) aMap[r + rs] = [];

				for (var cs = 0; cs < iColSpan; cs++) {
					aMap[r + rs][c + cs] = aRows[i].cells[j];
				}
			}

			c += iColSpan - 1;
		}
	}
	return aMap;
};
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_buttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the button bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `getState` and `setState` clash with React's own state methods. For them,
    // unsupported means that we don't account for the different meaning in the passed or returned
    // arguments.
    var UNSUPPORTED_BUTTON_API = {
        //getState: function() {},
        //setState: function(state) {},
        toFeature: noop
    };

    var BUTTON_DEFS = {};

    /**
     * Generates a ButtonBridge React class for a given button definition if it has not been
     * already created based on the button name and definition.
     *
     * @private
     * @method generateButtonBridge
     * @param {String} buttonName The button's name
     * @param {Object} buttonDefinition The button's definition
     * @return {Object} The generated or already existing React Button Class
     */

    function generateButtonBridge(buttonName, buttonDefinition, editor) {
        var ButtonBridge = AlloyEditor.Buttons[buttonName];

        BUTTON_DEFS[editor.name] = BUTTON_DEFS[editor.name] || {};
        BUTTON_DEFS[editor.name][buttonName] = BUTTON_DEFS[editor.name][buttonName] || buttonDefinition;

        if (!ButtonBridge) {
            ButtonBridge = createReactClass(CKEDITOR.tools.merge(UNSUPPORTED_BUTTON_API, {
                displayName: buttonName,

                propTypes: {
                    editor: PropTypes.object.isRequired,
                    tabIndex: PropTypes.number
                },

                statics: {
                    key: buttonName
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var buttonClassName = 'ae-button ae-button-bridge';

                    var buttonDisplayName = BUTTON_DEFS[editor.name][buttonName].name || BUTTON_DEFS[editor.name][buttonName].command || buttonName;

                    var buttonLabel = BUTTON_DEFS[editor.name][buttonName].label;

                    var buttonType = 'button-' + buttonDisplayName;

                    var iconClassName = 'ae-icon-' + buttonDisplayName;

                    var iconStyle = {};

                    var cssStyle = CKEDITOR.skin.getIconStyle(buttonDisplayName);

                    if (cssStyle) {
                        var cssStyleParts = cssStyle.split(';');

                        iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                        iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                        iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                    }

                    return React.createElement(
                        'button',
                        { 'aria-label': buttonLabel, className: buttonClassName, 'data-type': buttonType, onClick: this._handleClick, tabIndex: this.props.tabIndex, title: buttonLabel },
                        React.createElement('span', { className: iconClassName, style: iconStyle })
                    );
                },

                _handleClick: function _handleClick(event) {
                    var editor = this.props.editor.get('nativeEditor');

                    var buttonCommand = BUTTON_DEFS[editor.name][buttonName].command;

                    var buttonOnClick = BUTTON_DEFS[editor.name][buttonName].onClick;

                    if (buttonOnClick) {
                        buttonOnClick.call(this);
                    } else {
                        editor.execCommand(buttonCommand);
                    }

                    editor.fire('actionPerformed', this);
                }
            }));

            AlloyEditor.Buttons[buttonName] = ButtonBridge;
        }

        return ButtonBridge;
    }

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('button')) {
        CKEDITOR.UI_BUTTON = 'button';

        CKEDITOR.plugins.add('button', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor Button plugin. It takes over the
     * responsibility of registering and creating buttons via:
     * - editor.ui.addButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_BUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_buttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_buttonbridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_BUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function beforeInit(editor) {
            editor.ui.addButton = function (buttonName, buttonDefinition) {
                this.add(buttonName, CKEDITOR.UI_BUTTON, buttonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_BUTTON, {
                add: generateButtonBridge,
                create: function create(buttonDefinition) {
                    var buttonName = 'buttonBridge' + (Math.random() * 1e9 >>> 0);
                    var ButtonBridge = generateButtonBridge(buttonName, buttonDefinition);

                    return new ButtonBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_menubuttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the menubutton bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `getState` and `setState` clash with React's own state methods. For them,
    // unsupported means that we don't account for the different meaning in the passed or returned
    // arguments.
    var UNSUPPORTED_MENUBUTTON_API = {
        //getState: function() {},
        //setState: function(state) {},
        toFeature: noop
    };

    var MENUBUTTON_DEFS = {};

    /**
     * Generates a MenuButtonBridge React class for a given menuButton definition if it has not been
     * already created based on the button name and definition.
     *
     * @private
     * @method generateMenuButtonBridge
     * @param {String} menuButtonName The menuButton's name
     * @param {Object} menuButtonDefinition The menuButton's definition
     * @return {Object} The generated or already existing React MenuButton Class
     */
    function generateMenuButtonBridge(menuButtonName, menuButtonDefinition, editor) {
        var MenuButtonBridge = AlloyEditor.Buttons[menuButtonName];

        MENUBUTTON_DEFS[editor.name] = MENUBUTTON_DEFS[editor.name] || {};
        MENUBUTTON_DEFS[editor.name][menuButtonName] = MENUBUTTON_DEFS[editor.name][menuButtonName] || menuButtonDefinition;

        if (!MenuButtonBridge) {
            MenuButtonBridge = createReactClass(CKEDITOR.tools.merge(UNSUPPORTED_MENUBUTTON_API, {
                displayName: menuButtonName,

                propTypes: {
                    editor: PropTypes.object.isRequired,
                    tabIndex: PropTypes.number
                },

                statics: {
                    key: menuButtonName
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var panelMenuButtonDisplayName = MENUBUTTON_DEFS[editor.name][menuButtonName].name || MENUBUTTON_DEFS[editor.name][menuButtonName].command || menuButtonName;

                    var buttonClassName = 'ae-button ae-button-bridge';

                    var iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;

                    var iconStyle = {};

                    var cssStyle = CKEDITOR.skin.getIconStyle(panelMenuButtonDisplayName);

                    if (cssStyle) {
                        var cssStyleParts = cssStyle.split(';');

                        iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                        iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                        iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                    }

                    var menu;

                    if (this.props.expanded) {
                        menu = this._getMenu();
                    }

                    return React.createElement(
                        'div',
                        { className: 'ae-container ae-has-dropdown' },
                        React.createElement(
                            'button',
                            { 'aria-expanded': this.props.expanded, 'aria-label': MENUBUTTON_DEFS[editor.name][menuButtonName].label, className: buttonClassName, onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: MENUBUTTON_DEFS[editor.name][menuButtonName].label },
                            React.createElement('span', { className: iconClassName, style: iconStyle })
                        ),
                        menu
                    );
                },

                _getMenu: function _getMenu() {
                    return React.createElement(
                        AlloyEditor.ButtonDropdown,
                        { onDismiss: this.props.toggleDropdown },
                        this._getMenuItems()
                    );
                },

                _getMenuItems: function _getMenuItems() {
                    var editor = this.props.editor.get('nativeEditor');
                    var items = menuButtonDefinition.onMenu();
                    var menuItems = Object.keys(items).map(function (key) {
                        var menuItem = editor.getMenuItem(key);

                        if (!menuItem) {
                            return null;
                        }

                        var menuItemDefinition = menuItem.definition || menuItem;
                        var menuItemState = items[key];

                        var className = 'ae-toolbar-element ' + (menuItemState === CKEDITOR.TRISTATE_ON ? 'active' : '');
                        var disabled = menuItemState === CKEDITOR.TRISTATE_DISABLED;
                        var onClick = function onClick() {
                            if (menuItemDefinition.command) {
                                editor.execCommand(menuItemDefinition.command);
                            } else if (menuItemDefinition.onClick) {
                                menuItemDefinition.onClick.apply(menuItemDefinition);
                            }
                        };

                        return React.createElement(
                            'li',
                            { key: menuItem.name, role: 'option' },
                            React.createElement(
                                'button',
                                { className: className, disabled: disabled, onClick: onClick },
                                menuItemDefinition.label
                            )
                        );
                    }.bind(this));

                    return menuItems;
                }
            }));

            AlloyEditor.Buttons[menuButtonName] = MenuButtonBridge;
        }

        return MenuButtonBridge;
    }

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('menubutton')) {
        CKEDITOR.UI_MENU_BUTTON = 'menubutton';

        CKEDITOR.plugins.add('menubutton', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor MenuButton plugin. It takes over the
     * responsibility of registering and creating menuButtons via:
     * - editor.ui.addMenuButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_MENUBUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_menubuttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @requires CKEDITOR.plugins.ae_menubridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_menubuttonbridge', {
        requires: ['ae_uibridge', 'ae_menubridge'],

        /**
         * Set the add handler for UI_MENUBUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function beforeInit(editor) {
            editor.ui.addMenuButton = function (menuButtonName, menuButtonDefinition) {
                this.add(menuButtonName, CKEDITOR.UI_MENUBUTTON, menuButtonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_MENUBUTTON, {
                add: generateMenuButtonBridge,
                create: function create(menuButtonDefinition) {
                    var menuButtonName = 'buttonBridge' + (Math.random() * 1e9 >>> 0);
                    var MenuButtonBridge = generateMenuButtonBridge(menuButtonName, menuButtonDefinition);

                    return new MenuButtonBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_menubridge')) {
        return;
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor Menu plugin. It takes over the
     * responsibility of adding, removing and retrieving menu groups and items
     * - editor.addMenuGroup(name, order)
     * - editor.addMenuItem(name, definition)
     * - editor.addMenuItems(definitions)
     * - editor.getMenuItem(name)
     * - editor.removeMenuItem(name)
     *
     * @class CKEDITOR.plugins.ae_menubridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_menubridge', {
        /**
         * Set the add handler for UI_BUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present.
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function beforeInit(editor) {
            // Do nothing if the real menu plugin is present
            if (CKEDITOR.plugins.get('menu')) {
                return;
            }

            var groups = [];
            var groupsOrder = editor._.menuGroups = {};
            var menuItems = editor._.menuItems = {};

            for (var i = 0; i < groups.length; i++) {
                groupsOrder[groups[i]] = i + 1;
            }

            /**
             * Registers an item group to the editor context menu in order to make it
             * possible to associate it with menu items later.
             *
             * @method addMenuGroup
             * @param {String} name Specify a group name.
             * @param {Number} [order=100] Define the display sequence of this group
             * inside the menu. A smaller value gets displayed first.
             */
            editor.addMenuGroup = function (name, order) {
                groupsOrder[name] = order || 100;
            };

            /**
             * Adds an item from the specified definition to the editor context menu.
             *
             * @method addMenuItem
             * @param {String} name The menu item name.
             * @param {Object} definition The menu item definition.
             */
            editor.addMenuItem = function (name, definition) {
                if (groupsOrder[definition.group]) {
                    menuItems[name] = {
                        name: name,
                        definition: definition
                    };
                }
            };

            /**
             * Adds one or more items from the specified definition object to the editor context menu.
             *
             * @method addMenuItems
             * @param {Object} definitions Object where keys are used as itemName and corresponding values as definition for a {@link #addMenuItem} call.
             */
            editor.addMenuItems = function (definitions) {
                for (var itemName in definitions) {
                    this.addMenuItem(itemName, definitions[itemName]);
                }
            };

            /**
             * Retrieves a particular menu item definition from the editor context menu.
             *
             * @method getMenuItem
             * @param {String} name The name of the desired menu item.
             * @return {Object}
             */
            editor.getMenuItem = function (name) {
                return menuItems[name];
            };

            /**
             * Removes a particular menu item added before from the editor context menu.
             *
             * @method  removeMenuItem
             * @param {String} name The name of the desired menu item.
             */
            editor.removeMenuItem = function (name) {
                delete menuItems[name];
            };
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_panelmenubuttonbridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the panel menu button bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    var UNSUPPORTED_PANEL_MENU_BUTTON_API = {
        createPanel: noop
    };

    var PANEL_MENU_DEFS = {};

    /**
     * Generates a PanelMenuButtonBridge React class for a given panelmenubutton definition if it has not been
     * already created based on the panelmenubutton name and definition.
     *
     * @private
     * @method generatePanelMenuButtonBridge
     * @param {String} panelMenuButtonName The panel button name
     * @param {Object} panelMenuButtonDefinition The panel button definition
     * @return {Object} The generated or already existing React PanelMenuButton Class
     */
    var generatePanelMenuButtonBridge = function generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition, editor) {
        var PanelMenuButtonBridge = AlloyEditor.Buttons[panelMenuButtonName];

        PANEL_MENU_DEFS[editor.name] = PANEL_MENU_DEFS[editor.name] || {};
        PANEL_MENU_DEFS[editor.name][panelMenuButtonName] = PANEL_MENU_DEFS[editor.name][panelMenuButtonName] || panelMenuButtonDefinition;

        if (!PanelMenuButtonBridge) {
            PanelMenuButtonBridge = createReactClass(CKEDITOR.tools.merge(UNSUPPORTED_PANEL_MENU_BUTTON_API, {
                displayName: panelMenuButtonName,

                propTypes: {
                    editor: PropTypes.object.isRequired
                },

                statics: {
                    key: panelMenuButtonName
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var panelMenuButtonDisplayName = PANEL_MENU_DEFS[editor.name][panelMenuButtonName].name || PANEL_MENU_DEFS[editor.name][panelMenuButtonName].command || panelMenuButtonName;

                    var buttonClassName = 'ae-button ae-button-bridge';

                    var iconClassName = 'ae-icon-' + panelMenuButtonDisplayName;

                    var iconStyle = {};

                    var cssStyle = CKEDITOR.skin.getIconStyle(panelMenuButtonDisplayName);

                    if (cssStyle) {
                        var cssStyleParts = cssStyle.split(';');

                        iconStyle.backgroundImage = cssStyleParts[0].substring(cssStyleParts[0].indexOf(':') + 1);
                        iconStyle.backgroundPosition = cssStyleParts[1].substring(cssStyleParts[1].indexOf(':') + 1);
                        iconStyle.backgroundSize = cssStyleParts[2].substring(cssStyleParts[2].indexOf(':') + 1);
                    }

                    var panel;

                    if (this.props.expanded) {
                        panel = this._getPanel();
                    }

                    return React.createElement(
                        'div',
                        { className: 'ae-container ae-has-dropdown' },
                        React.createElement(
                            'button',
                            { 'aria-expanded': this.props.expanded, 'aria-label': PANEL_MENU_DEFS[editor.name][panelMenuButtonName].label, className: buttonClassName, onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: PANEL_MENU_DEFS[editor.name][panelMenuButtonName].label },
                            React.createElement('span', { className: iconClassName, style: iconStyle })
                        ),
                        panel
                    );
                },

                _getPanel: function _getPanel() {
                    var editor = this.props.editor.get('nativeEditor');

                    var panelMenuButtonOnBlock = PANEL_MENU_DEFS[editor.name][panelMenuButtonName].onBlock;

                    var panel = {
                        hide: this.props.toggleDropdown,
                        show: this.props.toggleDropdown
                    };

                    var blockElement = new CKEDITOR.dom.element('div');

                    var block = {
                        element: blockElement,
                        keys: {}
                    };

                    /* istanbul ignore else */
                    if (panelMenuButtonOnBlock) {
                        panelMenuButtonOnBlock.call(this, panel, block);
                    }

                    // TODO
                    // Use block.keys to configure the panel keyboard navigation

                    return React.createElement(
                        AlloyEditor.ButtonDropdown,
                        { onDismiss: this.props.toggleDropdown },
                        React.createElement('div', { className: blockElement.getAttribute('class'), dangerouslySetInnerHTML: { __html: blockElement.getHtml() } })
                    );
                }
            }));

            AlloyEditor.Buttons[panelMenuButtonName] = PanelMenuButtonBridge;
        }

        return PanelMenuButtonBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('panelmenubutton')) {
        CKEDITOR.UI_PANELBUTTON = 'panelmenubutton';

        CKEDITOR.plugins.add('panelmenubutton', {});
    }

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('panelbutton')) {
        CKEDITOR.UI_PANELBUTTON = 'panelbutton';

        CKEDITOR.plugins.add('panelbutton', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor PanelButton plugin. It takes over the
     * responsibility of registering and creating buttons via:
     * - editor.ui.addPanelMenuButton(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_PANELBUTTON, definition)
     *
     * @class CKEDITOR.plugins.ae_panelmenubuttonbridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_panelmenubuttonbridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_PANELBUTTON to our own. We do this in the init phase to override
         * the one in the native plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function beforeInit(editor) {
            editor.ui.addPanelMenuButton = function (panelMenuButtonName, panelMenuButtonDefinition) {
                this.add(panelMenuButtonName, CKEDITOR.UI_PANELBUTTON, panelMenuButtonDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON, {
                add: generatePanelMenuButtonBridge,
                create: function create(panelMenuButtonDefinition) {
                    var panelMenuButtonName = 'panelMenuButtonBridge' + (Math.random() * 1e9 >>> 0);
                    var PanelMenuButtonBridge = generatePanelMenuButtonBridge(panelMenuButtonName, panelMenuButtonDefinition);

                    return new PanelMenuButtonBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_richcombobridge')) {
        return;
    }

    /* istanbul ignore next */
    function noop() {}

    // API not yet implemented inside the richcombo bridge. By mocking the unsupported methods, we
    // prevent plugins from crashing if they make use of them.
    //
    // Some methods like `setState` clash with React's own state methods. For them, unsupported means
    // that we don't account for the different meaning in the passed or returned arguments.
    var UNSUPPORTED_RICHCOMBO_API = {
        commit: noop,
        createPanel: noop,
        disable: noop,
        enable: noop,
        getState: noop,
        hideGroup: noop,
        hideItem: noop,
        mark: noop,
        //setState: noop,
        showAll: noop,
        startGroup: noop,
        unmarkAll: noop
    };

    var RICH_COMBO_DEFS = {};

    /**
     * Generates a RichComboBridge React class for a given richcombo definition if it has not been
     * already created based on the richcombo name and definition.
     *
     * @method generateRichComboBridge
     * @private
     * @param {String} richComboName The rich combo name
     * @param {Object} richComboDefinition The rich combo definition
     * @return {Object} The generated or already existing React RichCombo Class
     */
    var generateRichComboBridge = function generateRichComboBridge(richComboName, richComboDefinition, editor) {
        var RichComboBridge = AlloyEditor.Buttons[richComboName];

        RICH_COMBO_DEFS[editor.name] = RICH_COMBO_DEFS[editor.name] || {};
        RICH_COMBO_DEFS[editor.name][richComboName] = RICH_COMBO_DEFS[editor.name][richComboName] || richComboDefinition;
        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = undefined;

        if (!RichComboBridge) {
            RichComboBridge = createReactClass(CKEDITOR.tools.merge(UNSUPPORTED_RICHCOMBO_API, {
                displayName: richComboName,

                propTypes: {
                    editor: PropTypes.object.isRequired
                },

                statics: {
                    key: richComboName
                },

                add: function add(value, preview, title) {
                    this._items.push({
                        preview: preview,
                        title: title,
                        value: value
                    });
                },

                componentWillMount: function componentWillMount() {
                    var editor = this.props.editor.get('nativeEditor');

                    var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                    this._items = [];

                    this.setValue = this._setValue;

                    if (editorCombo.init) {
                        editorCombo.init.call(this);
                    }

                    if (editorCombo.onRender) {
                        editorCombo.onRender.call(this);
                    }
                },

                componentWillUnmount: function componentWillUnmount() {
                    this._cacheValue(this.state.value);

                    this.setValue = this._cacheValue;
                },

                getInitialState: function getInitialState() {
                    return {
                        value: RICH_COMBO_DEFS[editor.name][richComboName].currentValue
                    };
                },

                getValue: function getValue() {
                    return this.state.value;
                },

                render: function render() {
                    var editor = this.props.editor.get('nativeEditor');

                    var richComboLabel = RICH_COMBO_DEFS[editor.name][richComboName].currentValue || richComboDefinition.label;

                    var itemsList;

                    if (this.props.expanded) {
                        itemsList = this._getItemsList();
                    }

                    return React.createElement(
                        'div',
                        { className: 'ae-container-dropdown ae-has-dropdown' },
                        React.createElement(
                            'button',
                            { 'aria-expanded': this.props.expanded, 'aria-label': richComboLabel, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: richComboLabel },
                            React.createElement(
                                'div',
                                { className: 'ae-container' },
                                React.createElement(
                                    'span',
                                    { className: 'ae-container-dropdown-selected-item' },
                                    richComboLabel
                                ),
                                React.createElement('span', { className: 'ae-icon-arrow' })
                            )
                        ),
                        itemsList
                    );
                },

                _cacheValue: function _cacheValue(value) {
                    var editor = this.props.editor.get('nativeEditor');

                    RICH_COMBO_DEFS[editor.name][richComboName].currentValue = value;
                },

                _getItems: function _getItems() {
                    var richCombo = this;

                    var items = this._items.map(function (item) {

                        var className = 'ae-toolbar-element ' + (item.value === this.state.value ? 'active' : '');

                        return React.createElement(
                            'li',
                            { key: item.title, role: 'option' },
                            React.createElement('button', { className: className, dangerouslySetInnerHTML: { __html: item.preview }, 'data-value': item.value, onClick: richCombo._onClick })
                        );
                    }.bind(this));

                    return items;
                },

                _getItemsList: function _getItemsList() {
                    return React.createElement(
                        AlloyEditor.ButtonDropdown,
                        { onDismiss: this.props.toggleDropdown },
                        this._getItems()
                    );
                },

                _onClick: function _onClick(event) {
                    var editor = this.props.editor.get('nativeEditor');

                    var editorCombo = RICH_COMBO_DEFS[editor.name][richComboName];

                    if (editorCombo.onClick) {
                        var newValue = event.currentTarget.getAttribute('data-value');

                        editorCombo.onClick.call(this, newValue);

                        RICH_COMBO_DEFS[editor.name][richComboName].currentValue = newValue;

                        editor.fire('actionPerformed', this);
                    }
                },

                _setValue: function _setValue(value) {
                    this._cacheValue(value);

                    this.setState({
                        value: value
                    });
                }
            }));

            AlloyEditor.Buttons[richComboName] = RichComboBridge;
        }

        return RichComboBridge;
    };

    /* istanbul ignore else */
    if (!CKEDITOR.plugins.get('richcombo')) {
        CKEDITOR.UI_RICHCOMBO = 'richcombo';

        CKEDITOR.plugins.add('richcombo', {});
    }

    /**
     * CKEditor plugin that bridges the support offered by CKEditor RichCombo plugin. It takes over the
     * responsibility of registering and creating rich combo elements via:
     * - editor.ui.addRichCombo(name, definition)
     * - editor.ui.add(name, CKEDITOR.UI_RICHCOMBO, definition)
     *
     * @class CKEDITOR.plugins.ae_richcombobridge
     * @requires CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_richcombobridge', {
        requires: ['ae_uibridge'],

        /**
         * Set the add handler for UI_RICHCOMBO to our own. We do this in the init phase to override
         * the one in the original plugin in case it's present
         *
         * @method init
         * @param {Object} editor The CKEditor instance being initialized
         */
        beforeInit: function beforeInit(editor) {
            editor.ui.addRichCombo = function (richComboName, richComboDefinition) {
                this.add(richComboName, CKEDITOR.UI_RICHCOMBO, richComboDefinition);
            };

            editor.ui.addHandler(CKEDITOR.UI_RICHCOMBO, {
                add: generateRichComboBridge,
                create: function create(richComboDefinition) {
                    var richComboName = 'richComboBridge' + (Math.random() * 1e9 >>> 0);
                    var RichComboBridge = generateRichComboBridge(richComboName, richComboDefinition);

                    return new RichComboBridge();
                }
            });
        }
    });
})();
'use strict';

(function () {
    'use strict';

    /* istanbul ignore if */

    if (CKEDITOR.plugins.get('ae_uibridge')) {
        return;
    }

    /**
     * CKEditor plugin that extends CKEDITOR.ui.add function so an add handler can be specified
     * on top of the original ones. It bridges the calls to add components via:
     * - editor.ui.add(name, type, definition)
     *
     * @class CKEDITOR.plugins.ae_uibridge
     * @constructor
     */
    CKEDITOR.plugins.add('ae_uibridge', {
        /**
         * Initialization of the plugin, part of CKEditor plugin lifecycle.
         *
         * @method beforeInit
         * @param {Object} editor The current editor instance
         */
        beforeInit: function beforeInit(editor) {
            var originalUIAddFn = editor.ui.add;

            editor.ui.add = function (name, type, definition) {
                originalUIAddFn.apply(this, arguments);

                var typeHandler = this._.handlers[type];

                if (typeHandler && typeHandler.add) {
                    typeHandler.add(name, definition, editor);
                    AlloyEditor.registerBridgeButton(name, editor.__processingPlugin__.plugin.name);
                }
            };
        }
    });
})();
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    'use strict';

    /**
     * Provides core language utilities.
     *
     * @class Lang
     */

    var Lang = {
        /**
         * Check if the passed value is an array.
         *
         * @memberof Lang
         * @method isArray
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an array, false otherwise.
         * @static
         */
        isArray: function isArray(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        /**
         * Check if the passed value is boolean.
         *
         * @memberof Lang
         * @method isBoolean
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is boolean, false otherwise.
         * @static
         */
        isBoolean: function isBoolean(value) {
            return typeof value === 'boolean';
        },

        /**
         * Check if the passed value is a function.
         *
         * @memberof Lang
         * @method isFunction
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a function, false otherwise.
         * @static
         */
        isFunction: function isFunction(value) {
            return typeof value === 'function';
        },

        /**
         * Check if the passed value is NULL.
         *
         * @memberof Lang
         * @method isNull
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is NULL, false otherwise.
         * @static
         */
        isNull: function isNull(value) {
            return value === null;
        },

        /**
         * Check if the passed value is number.
         *
         * @memberof Lang
         * @method isNumber
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is number, false otherwise.
         * @static
         */
        isNumber: function isNumber(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Check if the passed value is an object
         *
         * @memberof Lang
         * @method isObject
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an object, false otherwise.
         * @static
         */
        isObject: function isObject(value) {
            var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);

            return value && (valueType === 'object' || Lang.isFunction(value));
        },

        /**
         * Check if the passed value is a string.
         *
         * @memberof Lang
         * @method isString
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a string, false otherwise.
         * @static
         */
        isString: function isString(value) {
            return typeof value === 'string';
        },

        /**
         * Adds all properties from the supplier to the receiver.
         * The function will add all properties, not only these owned by the supplier.
         *
         * @memberof Lang
         * @method mix
         * @param {Object} receiver The object which will receive properties.
         * @param {Object} supplier The object which provides properties.
         * @return {Object} The modified receiver.
         * @static
         */
        mix: function mix(receiver, supplier) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;

            for (var key in supplier) {
                if (hasOwnProperty.call(supplier, key)) {
                    receiver[key] = supplier[key];
                }
            }
        },

        /**
         * Converts value to Integer.
         *
         * @memberof Lang
         * @method toInt
         * @param {Any} value The value which have to be converted to Integer.
         * @return {Integer} The converted value.
         * @static
         */
        toInt: function toInt(value) {
            return parseInt(value, 10);
        }
    };

    AlloyEditor.Lang = Lang;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides OOP utilities.
     *
     * @class OOP
     */

    var OOP = {
        /**
         * Sets the prototype, constructor and superclass properties to support an inheritance strategy
         * that can chain constructors and methods. Static members will not be inherited.
         *
         * @memberof OOP
         * @method extend
         * @param {Function} receiver The class which will extend another class.
         * @param {Function} supplier The class which will provide the properties the child class.
         * @param {Object} protoProps Prototype properties to add/override.
         * @param {Object} staticProps Static properties to add/overwrite.
         * @return {Function} The extended class.
         * @static
         */
        extend: function extend(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
                throw 'extend failed, verify dependencies';
            }

            var supplierProto = supplier.prototype,
                receiverProto = Object.create(supplierProto);
            receiver.prototype = receiverProto;

            receiverProto.constructor = receiver;
            receiver.superclass = supplierProto;

            // assign constructor property
            if (supplier !== Object && supplierProto.constructor === Object.prototype.constructor) {
                supplierProto.constructor = supplier;
            }

            // add prototype overrides
            if (protoProps) {
                AlloyEditor.Lang.mix(receiverProto, protoProps);
            }

            // add object overrides
            if (staticProps) {
                AlloyEditor.Lang.mix(receiver, staticProps);
            }

            return receiver;
        }
    };

    AlloyEditor.OOP = OOP;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Attribute implementation.
     *
     * @class Attribute
     * @constructor
    */

    function Attribute(config) {
        this.__config__ = config || {};
        this.__ATTRS__ = {};
    }

    Attribute.prototype = {
        constructor: Attribute,

        /**
         * Retrieves the value of an attribute.
         *
         * @instance
         * @memberof Attribute
         * @method get
         * @param {String} attr The attribute which value should be retrieved.
         * @return {Any} The value of the attribute.
         */
        get: function get(attr) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            var curValue = this.__ATTRS__[attr];

            if (currentAttr.getter) {
                curValue = this._callStringOrFunction(currentAttr.getter, curValue);
            }

            return curValue;
        },

        /**
         * Sets the value of an attribute.
         *
         * @instance
         * @memberof Attribute
         * @method set
         * @param {String} attr The attribute which value should be set.
         * @param {Any} value The value which should be set to the attribute.
         */
        set: function set(attr, value) {
            var currentAttr = this.constructor.ATTRS[attr];

            if (!currentAttr) {
                return;
            }

            if (!this._isInitialized(attr)) {
                this._init(attr);
            }

            if (currentAttr.readOnly) {
                return;
            }

            if (currentAttr.writeOnce && this._isInitialized(attr)) {
                return;
            }

            if (currentAttr.validator && !this._callStringOrFunction(currentAttr.validator, value)) {
                return;
            }

            if (currentAttr.setter) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            this.__ATTRS__[attr] = value;
        },

        /**
         * Calls the provided param as function with the supplied arguments.
         * If param provided as string, a corresponding function in this object will
         * be called. If provided param is a function, it will be directly called.
         *
         * @instance
         * @memberof Attribute
         * @method _callStringOrFunction
         * @param  {Any|Array} args The arguments which will be provided to the called function
         * @param  {String|Function} stringOrFunction The function which should be called
         * @protected
         * @return {Any} The returned value from the called function
         */
        _callStringOrFunction: function _callStringOrFunction(stringOrFunction, args) {
            var result = null;

            if (!AlloyEditor.Lang.isArray(args)) {
                args = [args];
            }

            if (AlloyEditor.Lang.isString(stringOrFunction) && AlloyEditor.Lang.isFunction(this[stringOrFunction])) {
                result = this[stringOrFunction].apply(this, args);
            } else if (AlloyEditor.Lang.isFunction(stringOrFunction)) {
                result = stringOrFunction.apply(this, args);
            }

            return result;
        },

        /**
         * Initializes an attribute. Sets its default value depending on the flags of the
         * attribute and the passed configuration object to the constructor.
         *
         * @instance
         * @memberof Attribute
         * @method _init
         * @param {String} attr The name of the attribute which have to be initialized.
         * @protected
         */
        _init: function _init(attr) {
            var value;

            var currentAttr = this.constructor.ATTRS[attr];

            // Check if there is default value or passed one via configuration object
            var hasDefaultValue = Object.prototype.hasOwnProperty.call(currentAttr, 'value');
            var hasPassedValueViaConfig = Object.prototype.hasOwnProperty.call(this.__config__, attr);

            // If there is valueFn, set the value to be the result of invocation of this function
            if (currentAttr.valueFn) {
                value = this._callStringOrFunction(currentAttr.valueFn, value);

                this.__ATTRS__[attr] = value;
            }
            // else if the attribute has readOnly flag, set the default value from the attribute,
            // regardless if there is value or not
            else if (currentAttr.readOnly) {
                    value = currentAttr.value;
                }
                // else if the attribute has writeOnce value, set it from the passed configuration or from the
                // default value, in this order. Otherwise, return miserable.
                else if (currentAttr.writeOnce) {
                        if (hasPassedValueViaConfig) {
                            value = this.__config__[attr];
                        } else if (hasDefaultValue) {
                            value = currentAttr.value;
                        } else {
                            return;
                        }
                    }
                    // These two cases below are easy - set the value to be from the passed config or
                    // from the default value, in this order.
                    else if (hasPassedValueViaConfig) {
                            value = this.__config__[attr];
                        } else if (hasDefaultValue) {
                            value = currentAttr.value;
                        }

            // If there is validator, and user passed config object - check the returned value.
            // If it is false, then set as initial value the default one.
            // However, if there is no default value, just return.
            if (currentAttr.validator && hasPassedValueViaConfig && !this._callStringOrFunction(currentAttr.validator, value)) {
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else {
                    return;
                }
            }

            // If there is setter and user passed config object - pass the value thought the setter.
            // The value might be one from defaultFn, default value or provided from the config.
            if (currentAttr.setter && hasPassedValueViaConfig) {
                value = this._callStringOrFunction(currentAttr.setter, value);
            }

            // Finally, set the value as initial value to the storage with values.
            this.__ATTRS__[attr] = value;
        },

        /**
         * Checks if an attribute is initialized. An attribute is considered as initialized
         * when there is an own property with this name in the local collection of attribute values
         * for the current instance.
         *
         * @instance
         * @memberof Attribute
         * @method _isInitialized
         * @param {String} attr The attribute which should be checked if it is initialized.
         * @protected
         * @return {Boolean} Returns true if the attribute has been initialized, false otherwise.
         */
        _isInitialized: function _isInitialized(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
        }
    };

    AlloyEditor.Attribute = Attribute;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Quick and dirty impl of Base class.
     *
     * @class Base
     * @constructor
     */

    function Base(config) {
        Base.superclass.constructor.call(this, config);

        this.init(config);
    }

    AlloyEditor.OOP.extend(Base, AlloyEditor.Attribute, {
        /**
         * Calls the `initializer` method of each class which extends Base starting from the parent to the child.
         * Will pass the configuration object to each initializer method.
         *
         * @instance
         * @memberof Base
         * @method init
         * @param {Object} config Configuration object
         */
        init: function init(config) {
            this._callChain('initializer', config);
        },

        /**
         * Calls the `destructor` method of each class which extends Base starting from the parent to the child.
         *
         * @instance
         * @memberof Base
         * @method destroy
         */
        destroy: function destroy() {
            this._callChain('destructor');
        },

        /**
         * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
         *
         * @instance
         * @memberof Base
         * @method _callChain
         * @param {Object|Array} args The arguments with which the method should be invoked
         * @param {String} wat  The method, which should be invoked
         * @protected
         */
        _callChain: function _callChain(wat, args) {
            var arr = [];

            var ctor = this.constructor;

            while (ctor) {
                if (AlloyEditor.Lang.isFunction(ctor.prototype[wat])) {
                    arr.push(ctor.prototype[wat]);
                }

                ctor = ctor.superclass ? ctor.superclass.constructor : null;
            }

            arr = arr.reverse();

            args = AlloyEditor.Lang.isArray(args) ? args : [args];

            for (var i = 0; i < arr.length; i++) {
                var item = arr[i];

                item.apply(this, args);
            }
        }
    });

    AlloyEditor.Base = Base;
})();
'use strict';

(function () {
    'use strict';

    var tableSelectionGetArrowBoxClasses = function tableSelectionGetArrowBoxClasses() {
        return 'ae-arrow-box ae-arrow-box-bottom';
    };

    AlloyEditor.SelectionGetArrowBoxClasses = {
        table: tableSelectionGetArrowBoxClasses
    };
})();
'use strict';

(function () {
    'use strict';

    // Default gutter value for toolbar positioning

    var DEFAULT_GUTTER = {
        left: 0,
        top: 0
    };

    /**
     * Centers a Toolbar according to given rectangle
     *
     * @method centerToolbar
     * @param {Object} toolbar The toolbar to be centered
     * @param {Object} rect The rectangle according to which the Toolbar will be centered
     */
    var centerToolbar = function centerToolbar(toolbar, rect) {
        var toolbarNode = ReactDOM.findDOMNode(toolbar);

        var halfNodeWidth = toolbarNode.offsetWidth / 2;
        var scrollPosition = new CKEDITOR.dom.window(window).getScrollPosition();

        var gutter = toolbar.props.gutter || DEFAULT_GUTTER;

        var widgetXY = toolbar.getWidgetXYPoint(rect.left + rect.width / 2 - scrollPosition.x, rect.top + scrollPosition.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

        toolbar.moveToPoint([widgetXY[0], widgetXY[1]], [rect.left + rect.width / 2 - halfNodeWidth - scrollPosition.x, rect.top - toolbarNode.offsetHeight + scrollPosition.y - gutter.top]);
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method imageSelectionSetPosition
     * @param {Object} payload Payload, should contain the selection data for retrieving the
     * client rectangle of the selected image
     * @return {Boolean} True, in all cases
     */
    var imageSelectionSetPosition = function imageSelectionSetPosition(payload) {
        centerToolbar(this, payload.selectionData.element.getClientRect());

        return true;
    };

    /**
     * Sets the position of a toolbar according to the position of the selected image
     *
     * @method tableSelectionSetPosition
     * @param {Object} payload Object, which contains the selection data for retrieving the
     * client rectangle of the selected table
     * @return {Boolean} True, in all cases
     */
    var tableSelectionSetPosition = function tableSelectionSetPosition(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor).getFromSelection();

        centerToolbar(this, table.getClientRect());

        return true;
    };

    AlloyEditor.SelectionSetPosition = {
        image: imageSelectionSetPosition,
        table: tableSelectionSetPosition
    };
})();
'use strict';

(function () {
    'use strict';

    var _isRangeAtElementEnd = function _isRangeAtElementEnd(range, element) {
        // Finding if a range is at the end of an element is somewhat tricky due to how CKEditor handles
        // ranges. It might depend on wether a source node inside the element is selected or not. For now,
        // we need to cover the following cases:
        //
        // - The text length of the element is the same as the endOffset of the range
        // - Both start and end containers match the element and the start and end offsets are 1

        return element.getText().length === range.endOffset || element.equals(range.startContainer) && element.equals(range.endContainer) && range.startOffset === range.endOffset && range.endOffset === 1;
    };

    var embedSelectionTest = function embedSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        return !!(selectionData.element && selectionData.element.getAttribute('data-widget') === 'ae_embed');
    };

    var linkSelectionTest = function linkSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');
        var range = nativeEditor.getSelection().getRanges()[0];

        var element;

        return !!(nativeEditor.isSelectionEmpty() && (element = new CKEDITOR.Link(nativeEditor).getFromSelection()) && element.getText().length !== range.endOffset && !element.isReadOnly() && !_isRangeAtElementEnd(range, element));
    };

    var imageSelectionTest = function imageSelectionTest(payload) {
        var selectionData = payload.data.selectionData;

        return !!(selectionData.element && selectionData.element.getName() === 'img' && !selectionData.element.isReadOnly());
    };

    var textSelectionTest = function textSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var selectionEmpty = nativeEditor.isSelectionEmpty();

        var selectionData = payload.data.selectionData;

        return !!(!selectionData.element && selectionData.region && !selectionEmpty && !nativeEditor.getSelection().getCommonAncestor().isReadOnly());
    };

    var tableSelectionTest = function tableSelectionTest(payload) {
        var nativeEditor = payload.editor.get('nativeEditor');

        var table = new CKEDITOR.Table(nativeEditor);
        var element = table.getFromSelection();

        return !!(element && table.isEditable(element));
    };

    AlloyEditor.SelectionTest = {
        embed: embedSelectionTest,
        image: imageSelectionTest,
        link: linkSelectionTest,
        table: tableSelectionTest,
        text: textSelectionTest
    };
})();
'use strict';

(function () {
    'use strict';

    var Selections = [{
        name: 'embed',
        buttons: ['embedRemove', 'embedEdit'],
        test: AlloyEditor.SelectionTest.embed
    }, {
        name: 'link',
        buttons: ['linkEdit'],
        test: AlloyEditor.SelectionTest.link
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageCenter', 'imageRight'],
        setPosition: AlloyEditor.SelectionSetPosition.image,
        test: AlloyEditor.SelectionTest.image
    }, {
        name: 'text',
        buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
        test: AlloyEditor.SelectionTest.text
    }, {
        name: 'table',
        buttons: ['tableHeading', 'tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: AlloyEditor.SelectionGetArrowBoxClasses.table,
        setPosition: AlloyEditor.SelectionSetPosition.table,
        test: AlloyEditor.SelectionTest.table
    }];

    AlloyEditor.Selections = Selections;
})();
'use strict';

(function () {
    'use strict';

    /**
     * AlloyEditor main class. Creates instance of the editor and provides the user configuration
     * to the UI.
     *
     * @class Core
     * @constructor
     */

    function Core(config) {
        Core.superclass.constructor.call(this, config);
    }

    AlloyEditor.OOP.extend(Core, AlloyEditor.Base, {
        /**
         * Initializer lifecycle implementation for the AlloyEditor class. Creates a CKEditor
         * instance, passing it the provided configuration attributes.
         *
         * @memberof Core
         * @instance
         * @protected
         * @method initializer
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function initializer(config) {
            var node = this.get('srcNode');

            if (this.get('enableContentEditable')) {
                node.setAttribute('contenteditable', 'true');
            }

            var editor = CKEDITOR.inline(node);

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            editor.config.selectionKeystrokes = this.get('selectionKeystrokes');

            AlloyEditor.Lang.mix(editor.config, config);

            if (CKEDITOR.env.ie && !CKEDITOR.env.edge) {
                editor.config.extraPlugins = editor.config.extraPlugins.replace('ae_dragresize', 'ae_dragresize_ie');
                editor.config.removePlugins = editor.config.removePlugins.replace('ae_dragresize', 'ae_dragresize_ie');
            }

            editor.once('contentDom', function () {

                this._addReadOnlyLinkClickListener(editor);

                var editable = editor.editable();

                editable.addClass('ae-editable');
            }.bind(this));

            this._editor = editor;

            AlloyEditor.loadLanguageResources(this._renderUI.bind(this));
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @memberof Core
         * @instance
         * @protected
         * @method destructor
         */
        destructor: function destructor() {
            this._destroyed = true;

            if (this._editorUIElement) {
                ReactDOM.unmountComponentAtNode(this._editorUIElement);
                this._editorUIElement.parentNode.removeChild(this._editorUIElement);
            }

            var nativeEditor = this.get('nativeEditor');

            if (nativeEditor) {
                var editable = nativeEditor.editable();

                if (editable) {
                    editable.removeClass('ae-editable');

                    if (this.get('enableContentEditable')) {
                        this.get('srcNode').setAttribute('contenteditable', 'false');
                    }
                }

                this._clearSelections();

                nativeEditor.destroy();
            }
        },

        /**
         * Clear selections from window object
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _clearSelections
         */
        _clearSelections: function _clearSelections() {
            var nativeEditor = this.get('nativeEditor');
            var isMSSelection = typeof window.getSelection != 'function';

            if (isMSSelection) {
                nativeEditor.document.$.selection.empty();
            } else {
                nativeEditor.document.getWindow().$.getSelection().removeAllRanges();
            }
        },

        /**
         * Method to set default link behavior
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _addReadOnlyLinkClickListener
         * @param {Object} editor
         */
        _addReadOnlyLinkClickListener: function _addReadOnlyLinkClickListener(editor) {
            editor.editable().on('click', this._defaultReadOnlyClickFn, this, {
                editor: editor
            });
        },

        /**
         * Called on `click` event when the editor is in read only mode. Navigates to link's URL or opens
         * the link in a new window.
         *
         * @memberof Core
         * @instance
         * @event readOnlyClick
         * @protected
         * @method _defaultReadOnlyClickFn
         * @param {Object} event The fired `click` event payload
         */
        _defaultReadOnlyClickFn: function _defaultReadOnlyClickFn(event) {
            var mouseEvent = event.data.$;
            var hasCtrlKey = mouseEvent.ctrlKey || mouseEvent.metaKey;
            var shouldOpen = this._editor.config.readOnly || hasCtrlKey;

            mouseEvent.preventDefault();

            if (!shouldOpen) {
                return;
            }

            if (event.listenerData.editor.editable().editor.fire('readOnlyClick', event.data) !== false) {
                var ckElement = new CKEDITOR.dom.elementPath(event.data.getTarget(), this);
                var link = ckElement.lastElement;

                if (link) {
                    var href = link.$.attributes.href ? link.$.attributes.href.value : null;
                    var target = hasCtrlKey ? '_blank' : link.$.attributes.target ? link.$.attributes.target.value : null;
                    this._redirectLink(href, target);
                }
            }
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _getNativeEditor
         * @return {Object} The current instance of CKEditor.
         */
        _getNativeEditor: function _getNativeEditor() {
            return this._editor;
        },

        /**
         * Redirects the browser to a given link
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _redirectLink
         * @param {string} href The href to take the browser to
         * @param {string=} target Specifies where to display the link
         */
        _redirectLink: function _redirectLink(href, target) {
            if (target && href) {
                window.open(href, target);
            } else if (href) {
                window.location.href = href;
            }
        },

        /**
         * Renders the specified from the user toolbars.
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _renderUI
         */
        _renderUI: function _renderUI() {
            if (!this._destroyed) {
                var editorUIElement = document.createElement('div');
                editorUIElement.className = 'ae-ui';

                var uiNode = this.get('uiNode') || document.body;

                uiNode.appendChild(editorUIElement);

                this._mainUI = ReactDOM.render(React.createElement(AlloyEditor.UI, {
                    editor: this,
                    eventsDelay: this.get('eventsDelay'),
                    toolbars: this.get('toolbars')
                }), editorUIElement);

                this._editorUIElement = editorUIElement;

                this.get('nativeEditor').fire('uiReady');
            }
        },

        /**
         * The function returns an HTML element from the passed value. If the passed value is a string, it should be
         * the Id of the element which have to be retrieved from the DOM.
         * If an HTML Element is passed, the element itself will be returned.
         *
         * @memberof Core
         * @instance
         * @method _toElement
         * @protected
         * @param {!(String|HTMLElement)} value String, which have to correspond to an HTML element from the DOM,
         * or the HTML element itself. If Id is passed, the HTML element will be retrieved from the DOM.
         * @return {HTMLElement} An HTML element.
         */
        _toElement: function _toElement(value) {
            if (AlloyEditor.Lang.isString(value)) {
                value = document.getElementById(value);
            }

            return value;
        },

        /**
         * Validates the allowed content attribute. Look
         * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
         * supported values.
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _validateAllowedContent
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid configuration, false otherwise
         */
        _validateAllowedContent: function _validateAllowedContent(value) {
            return AlloyEditor.Lang.isString(value) || AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isBoolean(value);
        },

        /**
         * Validates the value of toolbars attribute
         *
         * @memberof Core
         * @instance
         * @protected
         * @method _validateToolbars
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid toolbars configuration, false otherwise
         */
        _validateToolbars: function _validateToolbars(value) {
            return AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isNull(value);
        }
    }, {
        ATTRS: {
            /**
             * Configures the allowed content for the current instance of AlloyEditor.
             * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
             * for more information about the valid values.
             *
             * @memberof Core
             * @instance
             * @property allowedContent
             * @default true
             * @writeOnce
             * @type {Boolean, String, Object}
             */
            allowedContent: {
                validator: '_validateAllowedContent',
                value: true,
                writeOnce: true
            },

            /**
             * Specifies whether AlloyEditor set the contenteditable attribute
             * to "true" on its srcNode.
             *
             * @memberof Core
             * @instance
             * @property enableContentEditable
             * @type Boolean
             * @default true
             * @writeOnce
             */
            enableContentEditable: {
                validator: AlloyEditor.Lang.isBoolean,
                value: true,
                writeOnce: true
            },

            /**
             * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
             *
             * @memberof Core
             * @instance
             * @property eventsDelay
             * @type {Number}
             */
            eventsDelay: {
                validator: AlloyEditor.Lang.isNumber,
                value: 100
            },

            /**
             * Specifies the extra plugins which have to be loaded to the current CKEditor instance in order to
             * make AlloyEditor to work properly.
             *
             * @memberof Core
             * @instance
             * @property extraPlugins
             * @default 'uicore,selectionregion,dragresize,addimages,placeholder,tabletools,tableresize,autolink'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae_uicore,ae_selectionregion,ae_selectionkeystrokes,ae_imagealignment,ae_addimages,ae_placeholder,' + 'ae_tabletools,ae_tableresize,ae_autolink,ae_embed,ae_autolist,ae_dragresize,' + 'ae_uibridge,ae_richcombobridge,ae_panelmenubuttonbridge,ae_menubridge,ae_menubuttonbridge,ae_buttonbridge',
                writeOnce: true
            },

            /**
             * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
             *
             * @memberof Core
             * @instance
             * @property nativeEditor
             * @readOnly
             * @type {Object}
             */
            nativeEditor: {
                getter: '_getNativeEditor',
                readOnly: true
            },

            /**
             * Specifies the class, which should be added by Placeholder plugin
             * {{#crossLink "CKEDITOR.plugins.ae_placeholder}}{{/crossLink}}
             * when editor is not focused.
             *
             * @memberof Core
             * @instance
             * @property placeholderClass
             * @default 'ae-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: AlloyEditor.Lang.isString,
                value: 'ae-placeholder',
                writeOnce: true
            },

            /**
             * Specifies the plugins, which come by default with CKEditor, but which are not needed by AlloyEditor.
             * These plugins add the default UI for CKeditor, which is no more needed. Please note that AlloyEdtor
             * comes with its own highly optimized copy of CKEditor (just customized via their official download page).
             * This version does not come with the unneeded plugins, so the value of this property won't be needed.
             * However, if you decide to go with the OOTB version of CKEditor, you will have to remove some of the
             * plugins if you decide to use AlloyEditor. Keep in mind that removing these plugins doesn't remove them
             * entirely from CKEditor. It just removes them from its current instance, in which you will use different
             * UI - those of AlloyEditor. You will be fully able to use both OOTB CKEditor and AlloyEditor on the same
             * page!
             *
             * @memberof Core
             * @instance
             * @property removePlugins
             * @default 'contextmenu,toolbar,elementspath,resize,liststyle,link'
             * @writeOnce
             * @type {String}
             */
            removePlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'contextmenu,toolbar,elementspath,resize,liststyle,link',
                writeOnce: true
            },

            /**
             * Array of manual selection triggers. They can be configured to manually show a specific selection toolbar
             * by forcing the selection type. A selectionKeystroke item consists of a keys property with a [CKEditor keystroke
             * definition](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-keystrokes) and a selection property with
             * the selection name to trigger.
             *
             * @memberof Core
             * @instance
             * @property selectionKeystrokes
             * @type {Array}
             */
            selectionKeystrokes: {
                validator: AlloyEditor.Lang.isArray,
                value: [{
                    keys: CKEDITOR.CTRL + 76 /*L*/
                    , selection: 'link'
                }, {
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
                    , selection: 'embed'
                }]
            },

            /**
             * The Node ID or HTMl node, which AlloyEditor should use as an editable area.
             *
             * @memberof Core
             * @instance
             * @property srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                setter: '_toElement',
                writeOnce: true
            },

            /**
             * The toolbars configuration for this editor instance
             *
             * @memberof Core
             * @instance
             * @property {Object} toolbars
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: {
                        buttons: ['image', 'embed', 'camera', 'hline', 'table'],
                        tabIndex: 2
                    },
                    styles: {
                        selections: AlloyEditor.Selections,
                        tabIndex: 1
                    }
                }
            },

            /**
             * The Node ID or HTMl node, where AlloyEditor's UI should be rendered.
             *
             * @memberof Core
             * @instance
             * @property uiNode
             * @type String | Node
             * @writeOnce
             */
            uiNode: {
                setter: '_toElement',
                writeOnce: true
            }
        }
    });

    CKEDITOR.event.implementOn(Core);

    AlloyEditor.Core = Core;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonActionStyle is a mixin that provides applying style implementation for a
     * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
     *
     * To execute properly, the component has to expose the following methods which can be obtained
     * out of the box using the {{#crossLink "ButtonStyle"}}{{/crossLink}} mixin:
     * - `Function` {{#crossLink "ButtonStyle/isActive"}}{{/crossLink}} to check the active state
     * - `Function` {{#crossLink "ButtonStyle/getStyle"}}{{/crossLink}} to return the style that should be applied
     *
     * @class ButtonActionStyle
     */

    var ButtonActionStyle = {
        /**
         * Removes or applies the component style to the current selection.
         *
         * @instance
         * @memberof ButtonActionStyle
         * @method applyStyle
         */
        applyStyle: function applyStyle() {
            if (AlloyEditor.Lang.isFunction(this.isActive) && AlloyEditor.Lang.isFunction(this.getStyle)) {
                var editor = this.props.editor.get('nativeEditor');

                editor.getSelection().lock();

                if (this.isActive()) {
                    editor.removeStyle(this.getStyle());
                } else {
                    editor.applyStyle(this.getStyle());
                }

                editor.getSelection().unlock();

                editor.fire('actionPerformed', this);
            }
        }
    };

    AlloyEditor.ButtonActionStyle = ButtonActionStyle;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonCommandActive is a mixin that provides an `isActive` method to determine if
     * a context-aware command is currently in an active state.
     *
     * @class ButtonCommandActive
     */

    var ButtonCommandActive = {
        /**
         * Checks if the command is active in the current selection.
         *
         * @instance
         * @memberof ButtonCommandActive
         * @method isActive
         * @return {Boolean} True if the command is active, false otherwise.
         */
        isActive: function isActive() {
            var editor = this.props.editor.get('nativeEditor');

            var command = editor.getCommand(this.props.command);

            return command ? command.state === CKEDITOR.TRISTATE_ON : false;
        }
    };

    AlloyEditor.ButtonCommandActive = ButtonCommandActive;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * @class ButtonCommand
     */

    var ButtonCommand = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The command that should be executed.
             *
             * @instance
             * @memberof ButtonCommand
             * @property {String} command
             */
            command: PropTypes.string.isRequired,

            /**
             * Indicates that the command may cause the editor to have a different.
             *
             * @instance
             * @memberof ButtonCommand
             * @property {boolean} modifiesSelection
             */
            modifiesSelection: PropTypes.bool
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         *
         * @instance
         * @memberof ButtonCommand
         * @param {Object=} data Optional data to be passed to CKEDITOR's `execCommand` method.
         * @method execCommand
         */
        execCommand: function execCommand(data) {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command, data);

            if (this.props.modifiesSelection) {
                editor.selectionChange(true);
            }

            editor.fire('actionPerformed', this);
        }
    };

    AlloyEditor.ButtonCommand = ButtonCommand;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonKeystroke is a mixin that provides a `keystroke` prop that allows configuring
     * a function of the instance to be invoked upon the keystroke activation.
     *
     * @class ButtonKeystroke
     */

    var ButtonKeystroke = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The keystroke definition. An object with the following properties:
             * - fn: The function to be executed
             * - keys: The keystroke definition, as expected by http://docs.ckeditor.com/#!/api/CKEDITOR.editor-method-setKeystroke
             * - name: The name for the CKEditor command that will be created. If empty,
             * a random name will be created on the fly
             *
             * @instance
             * @memberof ButtonKeystroke
             * @property {Object} keystroke
             */
            keystroke: PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonKeystroke
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var keystroke = this.props.keystroke;

            var commandName = keystroke.name || (Math.random() * 1e9 >>> 0).toString();

            var command = nativeEditor.getCommand(commandName);

            if (!command) {
                command = new CKEDITOR.command(nativeEditor, {
                    exec: function (editor) {
                        var keystrokeFn = keystroke.fn;

                        if (AlloyEditor.Lang.isString(keystrokeFn)) {
                            this[keystrokeFn].call(this, editor);
                        } else if (AlloyEditor.Lang.isFunction(keystrokeFn)) {
                            keystrokeFn.call(this, editor);
                        }
                    }.bind(this)
                });

                nativeEditor.addCommand(commandName, command);
            }

            this._defaultKeystrokeCommand = nativeEditor.keystrokeHandler.keystrokes[keystroke.keys];

            nativeEditor.setKeystroke(keystroke.keys, commandName);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonKeystroke
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            this.props.editor.get('nativeEditor').setKeystroke(this.props.keystroke.keys, this._defaultKeystrokeCommand);
        }
    };

    AlloyEditor.ButtonKeystroke = ButtonKeystroke;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonCfgProps is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * @class ButtonCfgProps
     */

    var ButtonCfgProps = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonCfgProps
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        /**
         * Merges the properties, passed to the current component with user's configuration
         * via `buttonCfg` property.
         *
         * @instance
         * @memberof ButtonCfgProps
         * @method mergeButtonCfgProps
         * @param {Object} props The properties to be merged with the provided configuration for this
         * button. If not passed, the user configuration will be merged with `this.props`
         * @return {Object} The merged properties
         */
        mergeButtonCfgProps: function mergeButtonCfgProps(props) {
            props = props || this.props;

            var nativeEditor = this.props.editor.get('nativeEditor');
            var buttonCfg = nativeEditor.config.buttonCfg || {};
            var result = CKEDITOR.tools.merge(props, buttonCfg[AlloyEditor.ButtonLinkEdit.key]);

            return result;
        }
    };

    AlloyEditor.ButtonCfgProps = ButtonCfgProps;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different CSS classes based on the current state of the element.
     *
     * To check for state, the component can expose the following methods:
     * - `Function` **isActive** to check the active state
     * - `Function` **isDisabled** to check the disabled state
     *
     * @class ButtonStateClasses
     */

    var ButtonStateClasses = {
        /**
         * Returns the list of state classes associated to the current element's state, according
         * to the results of the isActive and isDisabled methods.
         *
         * @instance
         * @memberof ButtonStateClasses
         * @method getStateClasses
         * @return {String} A string with the state CSS classes.
         */
        getStateClasses: function getStateClasses() {
            var stateClasses = '';

            // Check for active state
            if (AlloyEditor.Lang.isFunction(this.isActive) && this.isActive()) {
                stateClasses += 'ae-button-pressed';
            }

            // Check for disabled state
            if (AlloyEditor.Lang.isFunction(this.isDisabled) && this.isDisabled()) {
                stateClasses += ' ae-button-disabled';
            }

            return stateClasses;
        }
    };

    AlloyEditor.ButtonStateClasses = ButtonStateClasses;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * @class ButtonStyle
     */

    var ButtonStyle = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The style the button should handle. Allowed values are:
             * - Object as described by http://docs.ckeditor.com/#!/api/CKEDITOR.style.
             * - String pointing to an object inside the editor instance configuration. For example, `style = 'coreStyles_bold'` will try to
             * retrieve the style object from `editor.config.coreStyles_bold`. Nested properties such as `style = 'myplugin.myConfig.myStyle'`
             * are also supported and will try to retrieve the style object from the editor configuration as well.
             *
             * @instance
             * @memberof ButtonStyle
             * @property {Object|String} style
             */
            style: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonStyle
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var Lang = AlloyEditor.Lang;
            var style = this.props.style;

            if (Lang.isString(style)) {
                var parts = style.split('.');
                var currentMember = this.props.editor.get('nativeEditor').config;
                var property = parts.shift();

                while (property && Lang.isObject(currentMember) && Lang.isObject(currentMember[property])) {
                    currentMember = currentMember[property];
                    property = parts.shift();
                }

                if (Lang.isObject(currentMember)) {
                    style = currentMember;
                }
            }

            this._style = new CKEDITOR.style(style);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonStyle
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            this._style = null;
        },

        /**
         * Returns instance of CKEDITOR.style which represents the current button style.
         *
         * @instance
         * @memberof ButtonStyle
         * @method getStyle
         * @return {CKEDITOR.style} The current style representation.
         */
        getStyle: function getStyle() {
            return this._style;
        },

        /**
         * Checks if style is active in the current selection.
         *
         * @instance
         * @memberof ButtonStyle
         * @method isActive
         * @return {Boolean} True if style is active, false otherwise.
         */
        isActive: function isActive() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            result = this.getStyle().checkActive(elementPath, editor);

            return result;
        }
    };

    AlloyEditor.ButtonStyle = ButtonStyle;
})();
'use strict';

(function () {
    'use strict';

    /**
     * ToolbarButtons is a mixin which provides a list of buttons which have to be
     * displayed on the current toolbar depending on user preferences and given state.
     *
     * @class ToolbarButtons
     */

    var ToolbarButtons = {
        /**
         * Analyzes the current selection and the buttons exclusive mode value to figure out which
         * buttons should be present in a given state.
         *
         * @instance
         * @memberof ToolbarButtons
         * @method getToolbarButtons
         * @param {Array} buttons The buttons could be shown, prior to the state filtering.
         * @param {Object} additionalProps Additional props that should be passed down to the buttons.
         * @return {Array} An Array which contains the buttons that should be rendered.
         */
        getToolbarButtons: function getToolbarButtons(buttons, additionalProps) {
            var buttonProps = {};

            var nativeEditor = this.props.editor.get('nativeEditor');
            var buttonCfg = nativeEditor.config.buttonCfg || {};

            if (AlloyEditor.Lang.isFunction(buttons)) {
                buttons = buttons.call(this) || [];
            }

            var toolbarButtons = this.filterExclusive(buttons.filter(function (button) {
                return button && (AlloyEditor.Buttons[button] || AlloyEditor.Buttons[button.name]);
            }).map(function (button) {
                if (AlloyEditor.Lang.isString(button)) {
                    buttonProps[button] = buttonCfg[button];
                    button = AlloyEditor.Buttons[button];
                } else if (AlloyEditor.Lang.isString(button.name)) {
                    buttonProps[AlloyEditor.Buttons[button.name].key] = CKEDITOR.tools.merge(buttonCfg[button], button.cfg);
                    button = AlloyEditor.Buttons[button.name];
                }

                return button;
            })).map(function (button) {
                var props = this.mergeExclusiveProps({
                    editor: this.props.editor,
                    key: button.key,
                    tabKey: button.key,
                    tabIndex: this.props.trigger && this.props.trigger.props.tabKey === button.key ? 0 : -1,
                    trigger: this.props.trigger
                }, button.key);

                props = this.mergeDropdownProps(props, button.key);

                if (additionalProps) {
                    props = CKEDITOR.tools.merge(props, additionalProps);
                }

                props = CKEDITOR.tools.merge(props, buttonProps[button.key]);

                return React.createElement(button, props);
            }, this);

            return toolbarButtons;
        }
    };

    AlloyEditor.ToolbarButtons = ToolbarButtons;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for displaying Widget Arrow box on top or on bottom of the widget
     * depending on the point of user interaction with the editor.
     *
     * @class WidgetArrowBox
     */

    var WidgetArrowBox = {
        /**
         * Returns the list of arrow box classes associated to the current element's state. It relies
         * on the getInteractionPoint method to calculate the selection direction.
         *
         * @instance
         * @memberof WidgetArrowBox
         * @method getArrowBoxClasses
         * @return {String} A string with the arrow box CSS classes.
         */
        getArrowBoxClasses: function getArrowBoxClasses() {
            var arrowBoxClasses = 'ae-arrow-box';

            if (AlloyEditor.Lang.isFunction(this.getInteractionPoint) && this.getInteractionPoint()) {
                if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    arrowBoxClasses += ' ae-arrow-box-top';
                } else {
                    arrowBoxClasses += ' ae-arrow-box-bottom';
                }
            }

            return arrowBoxClasses;
        }
    };

    AlloyEditor.WidgetArrowBox = WidgetArrowBox;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for managing different dropdowns inside a widget.
     *
     * @class WidgetDropdown
     */

    var WidgetDropdown = {
        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof WidgetDropdown
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.setState({
                dropdownTrigger: null,
                itemDropdown: null
            });
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @instance
         * @memberof WidgetDropdown
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                dropdownTrigger: null,
                itemDropdown: null
            };
        },

        /**
         * Merges the provided object with two more properties:
         * - expanded - boolean flag which indicates if an widget should be rendered exclusively.
         * - toggleDropdown - function, which can be used by an widget in order to obtain exclusive state.
         *
         * @instance
         * @memberof WidgetDropdown
         * @method mergeDropdownProps
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to dropdown state.
         * @param {Object} itemKey They key of an React Widget which contains the dropdown.
         * @return {Object} The merged object.
         */
        mergeDropdownProps: function mergeDropdownProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                expanded: this.state.itemDropdown === itemKey ? true : false,
                tabIndex: this.state.dropdownTrigger === itemKey ? 0 : -1,
                toggleDropdown: this.toggleDropdown.bind(this, itemKey)
            });
        },

        /**
         * Sets the active dropdown of the widget or discards the toggled item from the state.
         *
         * @instance
         * @memberof WidgetDropdown
         * @method toggleDropdown
         * @param {Object} itemDropdown The widget which requests to toggle its dropdown.
         * @param {Number} toggleDirection User movement direction when toggled via keyboard.
         */
        toggleDropdown: function toggleDropdown(itemDropdown, toggleDirection) {
            this.setState({
                dropdownTrigger: itemDropdown,
                itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
            }, function () {
                if (!this.state.itemDropdown) {
                    if (this.moveFocus) {
                        this.moveFocus(toggleDirection);
                    } else {
                        ReactDOM.findDOMNode(this).focus();
                    }
                }
            });
        }
    };

    AlloyEditor.WidgetDropdown = WidgetDropdown;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for managing exclusive state of an widget.
     * The exclusive state means that a button may request to be the only rendered
     * widget in its parent container. WidgetExclusive will manage this state by
     * filtering and suppressing the other sibling widgets from displaying.
     *
     * @class WidgetExclusive
     */

    var WidgetExclusive = {
        /**
         * Cancels the exclusive state of an widget.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method cancelExclusive
         * @param {Object} itemExclusive The widget which exclusive state should be canceled.
         */
        cancelExclusive: function cancelExclusive(itemExclusive) {
            if (this.state.itemExclusive === itemExclusive) {
                this.setState({
                    itemExclusive: null
                });
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         * Calling this.setState() within this function will not trigger an additional render.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method componentWillReceiveProps
         * @param {Object} nextProps Object containing the current set of properties.
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            // Receiving properties means that the component is being re-rendered.
            // Re-rendering is triggered by editorInteraction, so we have to
            // reset the exclusive state and render the UI according to the new selection.
            this.setState({
                itemExclusive: null
            });
        },

        /**
         * Filters the items and returns only those with exclusive state.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method filterExclusive
         * @param {Array} items The widgets to be filtered.
         * @return {Array|Object} The item with executive state.
         */
        filterExclusive: function filterExclusive(items) {
            return items.filter(function (item) {
                if (this.state.itemExclusive) {
                    if (this.state.itemExclusive === item.key) {
                        return item;
                    }
                } else {
                    return item;
                }
            }.bind(this));
        },

        /**
         * Merges the provided object with three more properties:
         * - cancelExclusive - function, which can be used by a widget in order to cancel executive state.
         * - renderExclusive - boolean flag which indicates if an widget should be rendered exclusively.
         * - requestExclusive - function, which can be used by a widget in order to obtain exclusive state.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method mergeExclusiveProps
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to exclusive state.
         * @param {Object} itemKey They key of an React Widget which should be rendered exclusively.
         * @return {Object} The merged object.
         */
        mergeExclusiveProps: function mergeExclusiveProps(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                cancelExclusive: this.cancelExclusive.bind(this, itemKey),
                renderExclusive: this.state.itemExclusive === itemKey,
                requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
        },

        /**
         * Requests and sets exclusive state of an widget.
         *
         * @instance
         * @memberof WidgetExclusive
         * @method requestExclusive
         * @param {Object} itemExclusive The widget which requests exclusive state.
         */
        requestExclusive: function requestExclusive(itemExclusive) {
            this.setState({
                itemExclusive: itemExclusive
            });
        }
    };

    AlloyEditor.WidgetExclusive = WidgetExclusive;
})();
'use strict';

(function () {
    'use strict';

    var DIRECTION_NONE = 0;
    var DIRECTION_NEXT = 1;
    var DIRECTION_PREV = -1;

    var ACTION_NONE = 0;
    var ACTION_MOVE_FOCUS = 1;
    var ACTION_DISMISS_FOCUS = 2;

    /**
     * WidgetFocusManager is a mixin that provides keyboard navigation inside a widget. To do this,
     * it exposes the following props and methods:
     *
     * @class WidgetFocusManager
     */
    var WidgetFocusManager = {
        // Allows validating props being passed to the component.
        propTypes: {

            /**
             * Callback method to be invoked when the focus manager is to be dismissed. This happens
             * in the following scenarios if a dismiss callback has been specified:
             * - A dismiss key has been pressed
             * - In a non-circular focus manager, when:
             *     - The active descendant is the first one and a prev key has been pressed.
             *     - The active descendant is the last one and a next key has been pressed.
             *
             * @instance
             * @memberof WidgetFocusManager
             * @property {Function} onDismiss
             */
            onDismiss: PropTypes.func,

            /**
             * Indicates if focus should be set to the first/last descendant when the limits are reached.
             *
             * @instance
             * @memberof WidgetFocusManager
             * @property {boolean} circular
             */
            circular: PropTypes.bool.isRequired,

            /**
             * Indicate if should focus the first child of a container
             * @instance
             * @memberof WidgetFocusManager
             * @property {Boolean} focusFirstChild
             */
            focusFirstChild: PropTypes.bool,

            /**
             * String representing the CSS selector used to define the elements that should be handled.
             *
             * @instance
             * @memberof WidgetFocusManager
             * @property {String} descendants
             */
            descendants: PropTypes.string.isRequired,

            /**
             * Object representing the keys used to navigate between descendants. The format for the prop is:
             * `{dismiss: value, dismissNext: value, dismissPrev: value, next: value, prev: value}` where
             * value can be both a number or an array of numbers with the allowed keyCodes.
             *
             * @instance
             * @memberof WidgetFocusManager
             * @property {Object} keys
             */
            keys: PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._refresh();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * Refreshes the descendants list.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method componentDidUpdate
         */
        componentDidUpdate: function componentDidUpdate() {
            this._refresh();
        },

        /**
         * Focuses the current active descendant.
         *
         * Several Widgets can be nested in a component hierarchy by attaching this focus method to
         * the widget DOM node, transferring the DOM focus control to the inner FocusManager.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method focus
         */
        focus: function focus(event) {
            if (!event || this._isValidTarget(event.target)) {
                if (this._descendants && this._descendants.length) {
                    var activeDescendantEl = this._descendants[this._activeDescendant];
                    // When user clicks with the mouse, the activeElement is already set and there
                    // is no need to focus it. Focusing of the active descendant (usually some button) is required
                    // in case of keyboard navigation, because the focused element might be not the first button,
                    // but the div element, which contains the button.
                    if (document.activeElement !== activeDescendantEl && !this.props.focusFirstChild) {
                        if (this._descendants.indexOf(document.activeElement) === -1) {
                            activeDescendantEl.focus();
                        }
                    }

                    if (event) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
            }
        },

        /**
         * Handles the key events on a DOM node to execute the appropriate navigation when needed.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @param {Object} event The Keyboard event that was detected on the widget DOM node.
         * @method handleKey
         */
        handleKey: function handleKey(event) {
            if (this._isValidTarget(event.target) && this._descendants) {
                var action = this._getFocusAction(event);

                if (action.type) {
                    event.stopPropagation();
                    event.preventDefault();

                    if (action.type === ACTION_MOVE_FOCUS) {
                        this._moveFocus(action.direction);
                    }

                    if (action.type === ACTION_DISMISS_FOCUS) {
                        this.props.onDismiss(action.direction);
                    }
                }
            }
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method moveFocus
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         */
        moveFocus: function moveFocus(direction) {
            direction = AlloyEditor.Lang.isNumber(direction) ? direction : 0;

            this._moveFocus(direction);
        },

        /**
         * Returns the action, if any, that a keyboard event in the current focus manager state
         * should produce.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _getFocusAction
         * @param {object} event The Keyboard event.
         * @protected
         * @return {Object} An action object with type and direction properties.
         */
        _getFocusAction: function _getFocusAction(event) {
            var action = {
                type: ACTION_NONE
            };

            if (this.props.keys) {
                var direction = this._getFocusMoveDirection(event);

                if (direction) {
                    action.direction = direction;
                    action.type = ACTION_MOVE_FOCUS;
                }

                var dismissAction = this._getFocusDismissAction(event, direction);

                if (dismissAction.dismiss) {
                    action.direction = dismissAction.direction;
                    action.type = ACTION_DISMISS_FOCUS;
                }
            }

            return action;
        },

        /**
         * Returns the dismiss action, if any, the focus manager should execute to yield the focus. This
         * will happen in any of these scenarios if a dismiss callback has been specified:
         * - A dismiss key has been pressed
         * - In a non-circular focus manager, when:
         *     - The active descendant is the first one and a prev key has been pressed.
         *     - The active descendant is the last one and a next key has been pressed.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _getFocusDismissAction
         * @param {Number} focusMoveDirection The focus movement direction (if any).
         * @param {Object} event The Keyboard event.
         * @protected
         * @return {Object} A dismiss action with dismiss and direction properties.
         */
        _getFocusDismissAction: function _getFocusDismissAction(event, focusMoveDirection) {
            var dismissAction = {
                direction: focusMoveDirection,
                dismiss: false
            };

            if (this.props.onDismiss) {
                if (this._isValidKey(event.keyCode, this.props.keys.dismiss)) {
                    dismissAction.dismiss = true;
                }
                if (this._isValidKey(event.keyCode, this.props.keys.dismissNext)) {
                    dismissAction.dismiss = true;
                    dismissAction.direction = DIRECTION_NEXT;
                }
                if (this._isValidKey(event.keyCode, this.props.keys.dismissPrev)) {
                    dismissAction.dismiss = true;
                    dismissAction.direction = DIRECTION_PREV;
                }

                if (!dismissAction.dismiss && !this.props.circular && focusMoveDirection) {
                    dismissAction.dismiss = focusMoveDirection === DIRECTION_PREV && this._activeDescendant === 0 || focusMoveDirection === DIRECTION_NEXT && this._activeDescendant === this._descendants.length - 1;
                }
            }

            return dismissAction;
        },

        /**
         * Returns the direction, if any, in which the focus should be moved. In presence of the
         * shift key modifier, the direction of the movement is inverted.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _getFocusMoveDirection
         * @param {Object} event The Keyboard event.
         * @protected
         * @return {Number} The computed direction of the expected focus movement.
         */
        _getFocusMoveDirection: function _getFocusMoveDirection(event) {
            var direction = DIRECTION_NONE;

            if (this._isValidKey(event.keyCode, this.props.keys.next)) {
                direction = DIRECTION_NEXT;
            }
            if (this._isValidKey(event.keyCode, this.props.keys.prev)) {
                direction = DIRECTION_PREV;
            }

            if (event.shifKey) {
                direction *= -1;
            }

            return direction;
        },

        /**
         * Indicates if a given keyCode is valid for the given set of keys.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _isValidKey
         * @param {Array|Number} keys A key set. Can be a number an array of numbers representing the allowed keyCodes.
         * @param {Number} keyCode An event keyCode.
         * @protected
         * @return {Boolean} A boolean value indicating if the key is valid.
         */
        _isValidKey: function _isValidKey(keyCode, keys) {
            return AlloyEditor.Lang.isArray(keys) ? keys.indexOf(keyCode) !== -1 : keyCode === keys;
        },

        /**
         * Indicates if a given element is valid for focus management. User input elements such as
         * input, select or textarea are excluded.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _isValidKey
         * @param {DOMNode} element A DOM element.
         * @protected
         * @return {Boolean} A boolean value indicating if the element is valid.
         */
        _isValidTarget: function _isValidTarget(element) {
            var tagName = element.tagName.toLowerCase();

            return tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea';
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _moveFocus
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         * @protected
         */
        _moveFocus: function _moveFocus(direction) {
            var numDescendants = this._descendants.length;

            var descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', -1);

            this._activeDescendant += direction;

            if (this.props.circular) {
                // Calculate proper modulo result since remainder operator doesn't behave in the
                // same way for negative numbers
                this._activeDescendant = (this._activeDescendant % numDescendants + numDescendants) % numDescendants;
            } else {
                this._activeDescendant = Math.max(Math.min(this._activeDescendant, numDescendants - 1), 0);
            }

            descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', 0);
            descendant.focus();
        },

        /**
         * Refreshes the descendants list by executing the CSS selector again and resets the descendants tabIndex.
         *
         * @instance
         * @memberof WidgetFocusManager
         * @method _refresh
         * @protected
         */
        _refresh: function _refresh() {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var descendants = domNode.querySelectorAll(this.props.descendants);

                var priorityDescendants = [];

                this._descendants = [];

                Array.prototype.slice.call(descendants).forEach(function (item) {
                    var dataTabIndex = item.getAttribute('data-tabindex');

                    if (dataTabIndex) {
                        priorityDescendants.push(item);
                    } else {
                        this._descendants.push(item);
                    }
                }.bind(this));

                priorityDescendants = priorityDescendants.sort(function (a, b) {
                    return AlloyEditor.Lang.toInt(a.getAttribute('data-tabindex')) > AlloyEditor.Lang.toInt(b.getAttribute('data-tabindex'));
                });

                this._descendants = priorityDescendants.concat(this._descendants);

                this._activeDescendant = 0;

                this._descendants.some(function (item, index) {
                    if (item.getAttribute('tabindex') === '0') {
                        this._activeDescendant = index;
                        this.focus();

                        return true;
                    }
                }.bind(this));
            }
        }
    };

    AlloyEditor.WidgetFocusManager = WidgetFocusManager;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Provides functionality for calculating the point of interaction of the user with the Editor.
     *
     * @class WidgetInteractionPoint
     */

    var WidgetInteractionPoint = {
        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The provided editor event.
             *
             * @instance
             * @memberof WidgetInteractionPoint
             * @property {SyntheticEvent} editorEvent
             */
            editorEvent: PropTypes.object
        },

        /**
         * Returns the position, in page coordinates, according to which a widget should appear.
         * Depending on the direction of the selection, the wdiget may appear above of or on bottom of the selection.
         *
         * It depends on the props editorEvent to analyze the following user-interaction parameters:
         * - {Object} selectionData The data about the selection in the editor as returned from
         * {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
         * - {Number} pos Contains the coordinates of the position, considered as most appropriate.
         * This may be the point where the user released the mouse, or just the beginning or the end of
         * the selection.
         *
         * @instance
         * @memberof WidgetInteractionPoint
         * @method getInteractionPoint
         * @return {Object} An Object which contains the following properties:
         * direction, x, y, where x and y are in page coordinates and direction can be one of these:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         */
        getInteractionPoint: function getInteractionPoint() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;

            if (!eventPayload) {
                return;
            }

            var selectionData = eventPayload.selectionData;

            var nativeEvent = eventPayload.nativeEvent;

            var pos = {
                x: eventPayload.nativeEvent.pageX,
                y: selectionData.region.top
            };

            var direction = selectionData.region.direction;

            var endRect = selectionData.region.endRect;

            var startRect = selectionData.region.startRect;

            if (endRect && startRect && startRect.top === endRect.top) {
                direction = CKEDITOR.SELECTION_BOTTOM_TO_TOP;
            }

            var x;
            var y;

            // If we have the point where user released the mouse, show Toolbar at this point
            // otherwise show it on the middle of the selection.

            if (pos.x && pos.y) {
                x = this._getXPoint(selectionData, pos.x);

                if (direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                    y = Math.min(pos.y, selectionData.region.top);
                } else {
                    y = Math.max(pos.y, this._getYPoint(selectionData, nativeEvent));
                }
            } else {
                x = selectionData.region.left + selectionData.region.width / 2;

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {

                    y = this._getYPoint(selectionData, nativeEvent);
                } else {
                    y = selectionData.region.top;
                }
            }

            return {
                direction: direction,
                x: x,
                y: y
            };
        },

        /**
         * Returns the position of the Widget.
         *
         * @instance
         * @memberof WidgetInteractionPoint
         * @method _getXPoint
         * @param {Object} eventX The X coordinate received from the native event (mouseup).
         * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
         * @protected
         * @return {Number} The calculated X point in page coordinates.
         */
        _getXPoint: function _getXPoint(selectionData, eventX) {
            var region = selectionData.region;

            var left = region.startRect ? region.startRect.left : region.left;
            var right = region.endRect ? region.endRect.right : region.right;

            var x;

            if (left < eventX && right > eventX) {
                x = eventX;
            } else {
                var leftDist = Math.abs(left - eventX);
                var rightDist = Math.abs(right - eventX);

                if (leftDist < rightDist) {
                    // user raised the mouse on left on the selection
                    x = left;
                } else {
                    x = right;
                }
            }

            return x;
        },

        /**
         * Returns the position of the Widget.
         *
         * @instance
         * @memberof WidgetInteractionPoint
         * @method _getYPoint
         * @param {Object} nativeEvent The data about event is fired
         * @param {Object} selectionData The data about the selection in the editor as returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
         * @protected
         * @return {Number} The calculated Y point in page coordinates.
         */
        _getYPoint: function _getYPoint(selectionData, nativeEvent) {
            var y = 0;

            if (selectionData && nativeEvent) {
                var elementTarget = new CKEDITOR.dom.element(nativeEvent.target);

                if (elementTarget.$ && elementTarget.getStyle('overflow') === 'auto') {
                    y = nativeEvent.target.offsetTop + nativeEvent.target.offsetHeight;
                } else {
                    y = selectionData.region.bottom;
                }
            }

            return y;
        }
    };

    AlloyEditor.WidgetInteractionPoint = WidgetInteractionPoint;
})();
'use strict';

(function () {
    'use strict';

    /**
     * Calculates the position where an Widget should be displayed based on the point
     * where user interacted with the editor.
     *
     * @class WidgetPosition
     * @uses WidgetInteractionPoint
     */

    var WidgetPosition = {
        mixins: [AlloyEditor.WidgetInteractionPoint],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Should the widget to be restricted to the viewport, or not.
             *
             * @instance
             * @memberof WidgetPosition
             * @property {Boolean} constrainToViewport
             * @default true
             */
            constrainToViewport: PropTypes.bool,

            /**
             * The gutter (vertical and horizontal) between the interaction point and where the widget
             * should be rendered.
             *
             * @instance
             * @memberof WidgetPosition
             * @property {Object} gutter
             * @default {
             *     left: 0,
             *     top: 10
             * }
             */
            gutter: PropTypes.object
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof WidgetPosition
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                gutter: {
                    left: 0,
                    top: 10
                },
                constrainToViewport: true
            };
        },

        /**
         * Cancels an scheduled animation frame.
         *
         * @instance
         * @memberof WidgetPosition
         * @method cancelAnimation
         */
        cancelAnimation: function cancelAnimation() {
            if (window.cancelAnimationFrame) {
                window.cancelAnimationFrame(this._animationFrameId);
            }
        },

        /**
         * Returns an object which contains the position of the element in page coordinates,
         * restricted to fit to given viewport.
         *
         * @instance
         * @memberof WidgetPosition
         * @method getConstrainedPosition
         * @param {Object} attrs The following properties, provided as numbers:
         * - height
         * - left
         * - top
         * - width
         * @param {Object} viewPaneSize Optional. If not provided, the current viewport will be used. Should contain at least these properties:
         * - width
         * @return {Object} An object with `x` and `y` properties, which represent the constrained position of the
         * element.
         */
        getConstrainedPosition: function getConstrainedPosition(attrs, viewPaneSize) {
            viewPaneSize = viewPaneSize || new CKEDITOR.dom.window(window).getViewPaneSize();

            var x = attrs.left;
            var y = attrs.top;

            if (attrs.left + attrs.width > viewPaneSize.width) {
                x -= attrs.left + attrs.width - viewPaneSize.width;
            }

            if (y < 0) {
                y = 0;
            }

            return {
                x: x,
                y: y
            };
        },

        /**
         * Returns the position of the Widget taking in consideration the
         * {{#crossLink "WidgetPosition/gutter:attribute"}}{{/crossLink}} attribute.
         *
         * @instance
         * @memberof WidgetPosition
         * @protected
         * @method  getWidgetXYPoint
         * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
         * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
         * @param {Number} direction The direction of the selection. May be one of the following:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         * @return {Array} An Array with left and top offsets in page coordinates.
         */
        getWidgetXYPoint: function getWidgetXYPoint(left, top, direction) {
            var domNode = ReactDOM.findDOMNode(this);

            var gutter = this.props.gutter;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                left = left - gutter.left - domNode.offsetWidth / 2;

                top = direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM ? top + gutter.top : top - domNode.offsetHeight - gutter.top;
            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT || direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                left = direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ? left + gutter.left + domNode.offsetHeight / 2 : left - 3 * domNode.offsetHeight / 2 - gutter.left;

                top = top - gutter.top - domNode.offsetHeight / 2;
            }

            if (left < 0) {
                left = 0;
            }

            if (top < 0) {
                top = 0;
            }

            return [left, top];
        },

        /**
         * Returns true if the widget is visible, false otherwise
         *
         * @instance
         * @memberof WidgetPosition
         * @method isVisible
         * @return {Boolean} True if the widget is visible, false otherwise
         */
        isVisible: function isVisible() {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                return domElement.hasClass('alloy-editor-visible');
            }

            return false;
        },

        /**
         * Moves a widget from a starting point to a destination point.
         *
         * @instance
         * @memberof WidgetPosition
         * @method moveToPoint
         * @param  {Object} startPoint The starting point for the movement.
         * @param  {Object} endPoint The destination point for the movement.
         */
        moveToPoint: function moveToPoint(startPoint, endPoint) {
            var domElement = new CKEDITOR.dom.element(ReactDOM.findDOMNode(this));

            domElement.setStyles({
                left: startPoint[0] + 'px',
                top: startPoint[1] + 'px',
                opacity: 0
            });

            domElement.removeClass('alloy-editor-invisible');

            this._animate(function () {
                domElement.addClass('ae-toolbar-transition');
                domElement.addClass('alloy-editor-visible');
                domElement.setStyles({
                    left: endPoint[0] + 'px',
                    top: endPoint[1] + 'px',
                    opacity: 1
                });
            });
        },

        /**
         * Shows the widget with the default animation transition.
         *
         * @instance
         * @memberof WidgetPosition
         * @method show
         */
        show: function show() {
            var domNode = ReactDOM.findDOMNode(this);

            if (!this.isVisible() && domNode) {
                var interactionPoint = this.getInteractionPoint();

                if (interactionPoint) {
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var finalX, finalY, initialX, initialY;

                    finalX = initialX = parseFloat(domElement.getStyle('left'));
                    finalY = initialY = parseFloat(domElement.getStyle('top'));

                    if (this.props.constrainToViewport) {
                        var res = this.getConstrainedPosition({
                            height: parseFloat(domNode.offsetHeight),
                            left: finalX,
                            top: finalY,
                            width: parseFloat(domNode.offsetWidth)
                        });

                        finalX = res.x;
                        finalY = res.y;
                    }

                    if (interactionPoint.direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                        initialY = this.props.selectionData.region.bottom;
                    } else {
                        initialY = this.props.selectionData.region.top;
                    }

                    this.moveToPoint([initialX, initialY], [finalX, finalY]);
                }
            }
        },

        /**
         * Updates the widget position based on the current interaction point.
         *
         * @instance
         * @memberof WidgetPosition
         * @method updatePosition
         */
        updatePosition: function updatePosition() {
            var interactionPoint = this.getInteractionPoint();

            var domNode = ReactDOM.findDOMNode(this);

            if (interactionPoint && domNode) {
                var xy = this.getWidgetXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);

                new CKEDITOR.dom.element(domNode).setStyles({
                    left: xy[0] + 'px',
                    top: xy[1] + 'px'
                });
            }
        },

        /**
         * Requests an animation frame, if possible, to simulate an animation.
         *
         * @instance
         * @memberof WidgetPosition
         * @method _animate
         * @param {Function} callback The function to be executed on the scheduled frame.
         * @protected
         */
        _animate: function _animate(callback) {
            if (window.requestAnimationFrame) {
                this._animationFrameId = window.requestAnimationFrame(callback);
            } else {
                callback();
            }
        }
    };

    AlloyEditor.WidgetPosition = WidgetPosition;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonBold class provides functionality for styling an selection with strong (bold) style.
     *
     * @class ButtonBold
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonBold = createReactClass({
        displayName: 'ButtonBold',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonBold
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonBold
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonBold
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default bold
             * @memberof ButtonBold
             * @property {String} key
             * @static
             */
            key: 'bold'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonBold
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'bold',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 66 /*B*/
                },
                style: 'coreStyles_bold'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonBold
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.bold, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-bold', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.bold },
                React.createElement('span', { className: 'ae-icon-bold' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonBold.key] = AlloyEditor.ButtonBold = ButtonBold;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCameraImage class takes photo from camera and inserts it to the content.
     *
     * @class ButtonCameraImage
     */

    var ButtonCameraImage = createReactClass({
        displayName: 'ButtonCameraImage',

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default cameraImage
             * @memberof ButtonCameraImage
             * @property {String} key
             * @static
             */
            key: 'cameraImage'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                videoWidth: 320
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses the take photo button.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).focus();
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            if (this._stream) {
                if (this._stream.stop) {
                    this._stream.stop();
                } else if (this._stream.getVideoTracks) {
                    this._stream.getVideoTracks().forEach(function (track) {
                        track.stop();
                    });
                }
                this._stream = null;
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

            getUserMedia.call(navigator, {
                video: true,
                audio: false
            }, this._handleStreamSuccess, this._handleStreamError);

            return React.createElement(
                'div',
                { className: 'ae-camera' },
                React.createElement(
                    'video',
                    { ref: 'videoContainer' },
                    'Video stream not available.'
                ),
                React.createElement(
                    'button',
                    { className: 'ae-camera-shoot', onClick: this.takePhoto, ref: 'buttonTakePhoto' },
                    'Take photo'
                ),
                React.createElement('canvas', { className: 'ae-camera-canvas', ref: 'canvasContainer' })
            );
        },

        /**
         * Takes photo from the video stream and inserts in into editor's content.
         *
         * @fires ButtonCameraImage#imageCameraAdd
         * @instance
         * @memberof ButtonCameraImage
         * @method takePhoto
         */
        takePhoto: function takePhoto() {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            var context = canvasEl.getContext('2d');

            var height = this._videoHeight;
            var width = this.props.videoWidth;

            if (width && height) {
                canvasEl.width = width;
                canvasEl.height = height;

                context.drawImage(videoEl, 0, 0, width, height);

                var imgURL = canvasEl.toDataURL('image/png');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + imgURL + '">');

                var editor = this.props.editor.get('nativeEditor');

                editor.insertElement(el);

                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);

                editor.fire('imageCameraAdd', el);
            }
        },

        /**
         * Displays error message in case of video stream capturing failure.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method _handleStreamError
         * @param {Event} error The fired event in case of error.
         * @protected
         */
        _handleStreamError: function _handleStreamError(error) {
            window.alert('An error occurred! ' + error);
        },

        /**
         * Starts streaming video in the video element and sets width/height to the video
         * and canvas elements.
         *
         * @instance
         * @memberof ButtonCameraImage
         * @method _handleStreamSuccess
         * @param {Object} stream The video stream
         * @protected
         */
        _handleStreamSuccess: function _handleStreamSuccess(stream) {
            var videoEl = ReactDOM.findDOMNode(this.refs.videoContainer);
            var canvasEl = ReactDOM.findDOMNode(this.refs.canvasContainer);

            videoEl.addEventListener('canplay', function (event) {
                var height = videoEl.videoHeight / (videoEl.videoWidth / this.props.videoWidth);

                if (isNaN(height)) {
                    height = this.props.videoWidth / (4 / 3);
                }

                videoEl.setAttribute('width', this.props.videoWidth);
                videoEl.setAttribute('height', height);
                canvasEl.setAttribute('width', this.props.videoWidth);
                canvasEl.setAttribute('height', height);

                this._videoHeight = height;
            }.bind(this), false);

            this._stream = stream;

            if (navigator.mozGetUserMedia) {
                videoEl.mozSrcObject = stream;
            } else {
                videoEl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }

            videoEl.play();

            ReactDOM.findDOMNode(this.refs.buttonTakePhoto).disabled = false;
        }

        /**
         * Fired when an image is being taken from the camera and added as an element to the editor.
         *
         * @event ButtonCameraImage#imageCameraAdd
         * @memberof ButtonCameraImage
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.ButtonCameraImage = ButtonCameraImage;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCamera class renders in two different ways:
     *
     * - Normal: Just a button that allows to switch to the edition mode.
     * - Exclusive: Renders ButtonCameraImage in order to take photo from the camera.
     *
     * @class ButtonCamera
     */

    var ButtonCamera = createReactClass({
        displayName: 'ButtonCamera',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @property {Object} editor
             * @instance
             * @memberof ButtonCamera
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @property {String} label
             * @instance
             * @memberof ButtonCamera
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @property {Number} tabIndex
             * @instance
             * @memberof ButtonCamera
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default camera
             * @memberof ButtonCamera
             * @property {String} key
             * @static
             */
            key: 'camera'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCamera
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonCameraImage, this.props);
            } else {
                var disabled = !(navigator.getUserMedia || navigator.webkitGetUserMedia && location.protocol === 'https' || navigator.mozGetUserMedia || navigator.msGetUserMedia);

                var label = disabled ? AlloyEditor.Strings.cameraDisabled : AlloyEditor.Strings.camera;

                return React.createElement(
                    'button',
                    { 'aria-label': label, className: 'ae-button', 'data-type': 'button-image-camera', disabled: disabled, onClick: this.props.requestExclusive.bind(ButtonCamera.key), tabIndex: this.props.tabIndex, title: label },
                    React.createElement('span', { className: 'ae-icon-camera' })
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @class ButtonCode
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonCode = createReactClass({
        displayName: 'ButtonCode',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonCode
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonCode
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonCode
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default code
             * @memberof ButtonCode
             * @property {String} key
             * @static
             */
            key: 'code'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCode
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'pre'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCode
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.code, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-code', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.code },
                React.createElement('span', { className: 'ae-icon-code' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonCode.key] = AlloyEditor.ButtonCode = ButtonCode;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @class ButtonCommandListItem
     * @uses ButtonCommand
     */

    var ButtonCommandListItem = createReactClass({
        displayName: 'ButtonCommandListItem',

        mixins: [AlloyEditor.ButtonCommand],

        propTypes: {
            /**
             * The command label or description to render in the list entry.
             *
             * @instance
             * @memberof ButtonCommandListItem
             * @property {String} description
             */
            description: PropTypes.string.isRequired,

            /**
             * The command icon to render in the list entry.
             *
             * @instance
             * @memberof ButtonCommandListItem
             * @property {String} icon
             */
            icon: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonCommandListItem
             * @memberof ButtonCommandListItem
             * @property {String} key
             * @static
             */
            key: 'buttonCommandListItem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonCommandListItem
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': this.props.description, className: this._getClassName(), onClick: this.execCommand, tabIndex: this.props.tabIndex },
                this.props.description
            );
        },

        /**
         * Returns the class name of Widget.
         *
         * @instance
         * @memberof ButtonCommandListItem
         * @method _getClassName
         * @protected
         * @return {String} The class name of the Widget.
         */
        _getClassName: function _getClassName() {
            var className = 'ae-toolbar-element';

            if (this.props.icon) {
                className += ' ae-icon-' + this.props.icon;
            }

            return className;
        }
    });

    AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonCommandsList class provides functionality for showing a list of commands that can be
     * executed to the current selection..
     *
     * @class ButtonCommandsList
     * @uses WidgetFocusManager
     */

    var ButtonCommandsList = createReactClass({
        displayName: 'ButtonCommandsList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * List id to be used for accessibility purposes such as aria-owns.
             *
             * @instance
             * @memberof ButtonCommandsList
             * @property {String} listId
             */
            listId: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonCommandsList
             * @memberof ButtonCommandsList
             * @property {String} key
             * @static
             */
            key: 'buttonCommandsList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'div',
                { className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left', onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: '0' },
                React.createElement(
                    'ul',
                    { className: 'ae-listbox', id: this.props.listId, role: 'listbox' },
                    this._renderActions(this.props.commands)
                )
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @instance
         * @memberof ButtonCommandsList
         * @method _renderActions
         * @protected
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function _renderActions(commands) {
            var editor = this.props.editor;
            var items;

            if (commands && commands.length) {
                items = commands.map(function (item) {
                    return React.createElement(
                        'li',
                        { key: item.command, role: 'option' },
                        React.createElement(AlloyEditor.ButtonCommandListItem, { command: item.command, description: typeof item.label === 'string' ? item.label : item.label(), editor: editor })
                    );
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonCommandsList = ButtonCommandsList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonDropdown class provides markup and keyboard navigation behaviour to a dropdown
     * opened from a button.
     *
     * @class ButtonDropdown
     */

    var ButtonDropdown = createReactClass({
        displayName: 'ButtonDropdown',

        mixins: [AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonDropdown
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the dropdown in the configuration.
             *
             * @default dropdown
             * @memberof ButtonDropdown
             * @property {String} key
             * @static
             */
            key: 'dropdown'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonDropdown
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'div',
                { className: 'ae-dropdown ae-arrow-box ae-arrow-box-top-left', onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: '0' },
                React.createElement(
                    'ul',
                    { className: 'ae-listbox', role: 'listbox' },
                    this.props.children
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonDropdown.key] = AlloyEditor.ButtonDropdown = ButtonDropdown;
})();
'use strict';

(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonEmbedEdit class provides functionality for creating and editing an embed link in a document.
     * Provides UI for creating and editing an embed link.
     *
     * @class ButtonEmbedEdit
     */
    var ButtonEmbedEdit = createReactClass({
        displayName: 'ButtonEmbedEdit',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonEmbedEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default embedEdit
             * @memberof ButtonEmbedEdit
             * @property {String} key
             * @static
             */
            key: 'embedEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                if (window.requestAnimationFrame) {
                    window.requestAnimationFrame(this._focusLinkInput);
                } else {
                    setTimeout(this._focusLinkInput, 0);
                }
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            var editor = this.props.editor.get('nativeEditor');
            var embed;

            var selection = editor.getSelection();

            if (selection) {
                var selectedElement = selection.getSelectedElement();

                if (selectedElement) {
                    embed = selectedElement.findOne('[data-widget="ae_embed"]');
                }
            }

            var href = embed ? embed.getAttribute('data-ae-embed-url') : '';

            return {
                element: embed,
                initialLink: {
                    href: href
                },
                linkHref: href
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link' },
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.deleteEmbed, className: 'ae-button', 'data-type': 'button-embed-remove', disabled: !this.state.element, onClick: this._removeEmbed, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.deleteEmbed },
                    React.createElement('span', { className: 'ae-icon-bin' })
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input xxl' },
                    React.createElement('input', { className: 'ae-input', onChange: this._handleLinkHrefChange, onKeyDown: this._handleKeyDown, placeholder: AlloyEditor.Strings.editLink, ref: 'linkInput', type: 'text', value: this.state.linkHref }),
                    React.createElement('button', { 'aria-label': AlloyEditor.Strings.clearInput, className: 'ae-button ae-icon-remove', onClick: this._clearLink, style: clearLinkStyle, title: AlloyEditor.Strings.clear })
                ),
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.confirm, className: 'ae-button', disabled: !this._isValidState(), onClick: this._embedLink, title: AlloyEditor.Strings.confirm },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _clearLink
         * @protected
         */
        _clearLink: function _clearLink() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Triggers the embedUrl command to transform the link into an embed media object
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _embedLink
         * @protected
         */
        _embedLink: function _embedLink() {
            var nativeEditor = this.props.editor.get('nativeEditor');

            nativeEditor.execCommand('embedUrl', {
                url: this.state.linkHref
            });

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _focusLinkInput
         * @protected
         */
        _focusLinkInput: function _focusLinkInput() {
            ReactDOM.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._embedLink();
            } else if (event.keyCode === KEY_ESC) {
                var editor = this.props.editor.get('nativeEditor');

                // We need to cancelExclusive with the bound parameters in case the button is used
                // inside another in exclusive mode (such is the case of the link button)
                this.props.cancelExclusive();

                editor.fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         * @protected
         */
        _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href that's different from the original one.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _isValidState
         * @protected
         * @return {Boolean} True if the state is valid, false otherwise
         */
        _isValidState: function _isValidState() {
            var validState = this.state.linkHref && this.state.linkHref !== this.state.initialLink.href;

            return validState;
        },

        /**
         * Removes the embed in the editor element.
         *
         * @instance
         * @memberof ButtonEmbedEdit
         * @method _removeEmbed
         * @protected
         */
        _removeEmbed: function _removeEmbed() {
            var editor = this.props.editor.get('nativeEditor');

            var embedWrapper = this.state.element.getAscendant(function (element) {
                return element.hasClass('cke_widget_wrapper');
            });

            embedWrapper.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonEmbedEdit.key] = AlloyEditor.ButtonEmbedEdit = ButtonEmbedEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonEmbed class provides functionality for creating and editing an embed link in a document.
     * ButtonEmbed renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonEmbedEdit UI with all the link edition controls.
     *
     * @class ButtonEmbed
     * @uses ButtonKeystroke
     */

    var ButtonEmbed = createReactClass({
        displayName: 'ButtonEmbed',

        mixins: [AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonEmbed
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default embed
             * @memberof ButtonEmbed
             * @property {String} key
             * @static
             */
            key: 'embed'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + CKEDITOR.SHIFT + 76 /*L*/
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonEmbedEdit, this.props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.link, className: 'ae-button', 'data-type': 'button-embed', onClick: this._requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.link },
                    React.createElement('span', { className: 'ae-icon-add' })
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the embedding of a link.
         *
         * @instance
         * @memberof ButtonEmbed
         * @method _requestExclusive
         * @protected
         */
        _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonEmbed.key);
        }
    });

    AlloyEditor.Buttons[ButtonEmbed.key] = AlloyEditor.ButtonEmbed = ButtonEmbed;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonH1 class provides wraps a selection in `h1` element.
     *
     * @class ButtonH1
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonH1 = createReactClass({
        displayName: 'ButtonH1',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonH1
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonH1
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonH1
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default h1
             * @memberof ButtonH1
             * @property {String} key
             * @static
             */
            key: 'h1'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonH1
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'h1'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonH1
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.h1, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-h1', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.h1 },
                React.createElement('span', { className: 'ae-icon-h1' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonH1.key] = AlloyEditor.ButtonH1 = ButtonH1;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonH2 class provides wraps a selection in `h2` element.
     *
     * @class ButtonH2
     * @uses ButtonActionStyle
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonH2 = createReactClass({
        displayName: 'ButtonH2',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonH2
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonH2
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonH2
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default h2
             * @memberof ButtonH2
             * @property {String} key
             * @static
             */
            key: 'h2'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonH2
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                style: {
                    element: 'h2'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonH2
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.h2, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-h2', onClick: this.applyStyle, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.h2 },
                React.createElement('span', { className: 'ae-icon-h2' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonH2.key] = AlloyEditor.ButtonH2 = ButtonH2;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonHline class provides inserts horizontal line.
     *
     * @class ButtonHline
     * @uses ButtonCommand
     * @uses ButtonStyle
     */

    var ButtonHline = createReactClass({
        displayName: 'ButtonHline',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonHline
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonHline
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonHline
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default hline
             * @memberof ButtonHline
             * @property {String} key
             * @static
             */
            key: 'hline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonHline
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'horizontalrule',
                style: {
                    element: 'hr'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonHline
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.horizontalrule, className: 'ae-button', 'data-type': 'button-hline', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.horizontalrule },
                React.createElement('span', { className: 'ae-icon-separator' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonHline.key] = AlloyEditor.ButtonHline = ButtonHline;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignCenter class provides functionality for aligning an image in the center.
     *
     * @class ButtonImageAlignCenter
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonImageAlignCenter = createReactClass({
        displayName: 'ButtonImageAlignCenter',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImageAlignCenter
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImageAlignCenter
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImageAlignCenter
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default imageCenter
             * @memberof ButtonImageAlignCenter
             * @property {String} key
             * @static
             */
            key: 'imageCenter'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonImageAlignCenter
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifycenter'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImageAlignCenter
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignCenter, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-center', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignCenter },
                React.createElement('span', { className: 'ae-icon-align-center' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignCenter.key] = AlloyEditor.ButtonImageAlignCenter = ButtonImageAlignCenter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
     *
     * @class ButtonImageAlignLeft
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonImageAlignLeft = createReactClass({
        displayName: 'ButtonImageAlignLeft',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImageAlignLeft
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImageAlignLeft
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImageAlignLeft
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default imageLeft
             * @memberof ButtonImageAlignLeft
             * @property {String} key
             * @static
             */
            key: 'imageLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonImageAlignLeft
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyleft'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImageAlignLeft
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignLeft, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-left', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignLeft },
                React.createElement('span', { className: 'ae-icon-align-left' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignLeft.key] = AlloyEditor.ButtonImageAlignLeft = ButtonImageAlignLeft;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImageAlignRight class provides functionality for aligning an image on right.
     *
     * @class ButtonImageAlignRight
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonImageAlignRight = createReactClass({
        displayName: 'ButtonImageAlignRight',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImageAlignRight
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default imageRight
             * @memberof ButtonImageAlignRight
             * @property {String} key
             * @static
             */
            key: 'imageRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonImageAlignRight
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyright'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImageAlignRight
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignRight, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-image-align-right', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignRight },
                React.createElement('span', { className: 'ae-icon-align-right' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */

    var ButtonImage = createReactClass({
        displayName: 'ButtonImage',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonImage
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonImage
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonImage
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default image
             * @memberof ButtonImage
             * @property {String} key
             * @static
             */
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonImage
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var inputSyle = { display: 'none' };

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.image, className: 'ae-button', 'data-type': 'button-image', onClick: this.handleClick, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.image },
                    React.createElement('span', { className: 'ae-icon-image' })
                ),
                React.createElement('input', { accept: 'image/*', onChange: this._onInputChange, ref: 'fileInput', style: inputSyle, type: 'file' })
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @instance
         * @memberof ButtonImage
         * @method handleClick
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function handleClick(event) {
            ReactDOM.findDOMNode(this.refs.fileInput).click();
        },

        /**
         * On input change, reads the chosen file and fires an event `beforeImageAdd` with the image which will be added
         * to the content. The image file will be passed in the `imageFiles` property.
         * If any of the listeners returns `false` or cancels the event, the image won't be added to the content.
         * Otherwise, an event `imageAdd` will be fired with the inserted element into the editable area.
         * The passed params will be:
         * - `el` - the created img element
         * - `file` - the original image file from the input element
         *
         * @fires ButtonImage#beforeImageAdd
         * @fires ButtonImage#imageAdd
         * @instance
         * @memberof ButtonImage
         * @method _onInputChange
         * @protected
         */
        _onInputChange: function _onInputChange() {
            var inputEl = ReactDOM.findDOMNode(this.refs.fileInput);

            // On IE11 the function might be called with an empty array of
            // files. In such a case, no actions will be taken.
            if (!inputEl.files.length) {
                return;
            }

            var reader = new FileReader();
            var file = inputEl.files[0];

            reader.onload = function (event) {
                var editor = this.props.editor.get('nativeEditor');

                var result = editor.fire('beforeImageAdd', {
                    imageFiles: file
                });

                if (!!result) {
                    var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                    editor.insertElement(el);

                    editor.fire('actionPerformed', this);

                    var imageData = {
                        el: el,
                        file: file
                    };

                    editor.fire('imageAdd', imageData);
                }
            }.bind(this);

            reader.readAsDataURL(file);

            inputEl.value = '';
        }

        /**
         * Fired before adding images to the editor.
         *
         * @event ButtonImage#beforeImageAdd
         * @instance
         * @memberof ButtonImage
         * @param {Array} imageFiles Array of image files
         */

        /**
         * Fired when an image is being added to the editor successfully.
         *
         * @event ButtonImage#imageAdd
         * @instance
         * @memberof ButtonImage
         * @param {CKEDITOR.dom.element} el The created image with src as Data URI
         * @param {File} file The image file
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
})();
'use strict';

(function () {
    'use strict';

    /**
        * The ButtonIndentBlock class provides functionality for indenting the selected blocks.
        *
        * @class ButtonIndentBlock
        * @uses ButtonCommand
        * @uses ButtonCommandActive
        * @uses ButtonStateClasses
        */

    var ButtonIndentBlock = createReactClass({
        displayName: 'ButtonIndentBlock',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        //Allows validating props being passed to the component
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonIndentBlock
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default indentBlock
             * @memberof ButtonIndentBlock
             * @property {String} key
             * @static
             */
            key: 'indentBlock'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonIndentBlock
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'indent'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonIndentBlock
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.indent, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-indent-block', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.indent },
                React.createElement('span', { className: 'ae-icon-indent-block' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonIndentBlock.key] = AlloyEditor.ButtonIndentBlock = ButtonIndentBlock;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
     *
     * @class ButtonItalic
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonItalic = createReactClass({
        displayName: 'ButtonItalic',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonItalic
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonItalic
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonItalic
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default italic
             * @memberof ButtonItalic
             * @property {String} key
             * @static
             */
            key: 'italic'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonItalic
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'italic',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 73 /*I*/
                },
                style: 'coreStyles_italic'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonItalic
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.italic, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-italic', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.italic },
                React.createElement('span', { className: 'ae-icon-italic' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonItalic.key] = AlloyEditor.ButtonItalic = ButtonItalic;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLinkAutocompleteList class provides functionality for showing a list of
     * items that can be selected for the link.
     *
     * @class ButtonLinkAutocompleteList
     * @uses WidgetFocusManager
     */

    var ButtonLinkAutocompleteList = createReactClass({
        displayName: 'ButtonLinkAutocompleteList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Autocomplete function
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {Function} data
             */
            data: PropTypes.func,

            /**
             * Indicates if this is focused when this component is updated
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {Boolean} autocompleteSelected
             */
            autocompleteSelected: PropTypes.bool,

            /**
             * The current term to autocomplete for
             *
             * @instance
             * @memberof ButtonLinkAutocompleteList
             * @property {String} term
             */
            term: PropTypes.string,

            /**
            * Method to update parent selectautocomplete state
            *
             * @instance
             * @memberof ButtonLinkAutocompleteList
            * @property {Function} setAutocompleteState
            */
            setAutocompleteState: PropTypes.func

        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonLinkAutocompleteList
             * @memberof ButtonLinkAutocompleteList
             * @property {String} key
             * @static
             */
            key: 'buttonLinkAutocompleteList'
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            if (!nextProps.term || nextProps.term !== this.props.term) {
                clearTimeout(this._timeout);

                if (nextProps.term) {
                    this._timeout = setTimeout(this._updateItems, this.props.delay);
                } else {
                    this.setState({
                        items: []
                    });
                }
            }

            if (nextProps.autocompleteSelected) {
                setTimeout(this.focus, 0);
                this.props.setAutocompleteState({
                    selected: false
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            clearTimeout(this._timeout);
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                data: [],
                delay: 100,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                items: []
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (!this.props.expanded || !this.state.items.length) {
                return null;
            }

            return React.createElement(
                AlloyEditor.ButtonDropdown,
                null,
                this._renderAutocompleteItems(this.state.items)
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.term !== this.props.term || nextState.items !== this.state.items;
        },

        /**
         * Renders a set of list items for the provided items
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method _renderAutocompleteItems
         * @param {Array} items List of autocomplete items to render
         * @protected
         * @return {Array} Rendered list item instances
         */
        _renderAutocompleteItems: function _renderAutocompleteItems(items) {
            items = items || [];

            var handleLinkAutocompleteClick = this.props.handleLinkAutocompleteClick;

            return items.map(function (item) {
                var className = this.props.term === item.url ? 'ae-toolbar-element active' : 'ae-toolbar-element';

                return React.createElement(
                    'li',
                    { key: item.url, role: 'option' },
                    React.createElement(
                        'button',
                        { className: className, onClick: handleLinkAutocompleteClick, 'data-value': item.url },
                        item.title
                    )
                );
            }.bind(this));
        },

        /**
         * Retrieves the data according to {this.props.term} and calls setState() with the returned data
         *
         * @instance
         * @memberof ButtonLinkAutocompleteList
         * @method _updateItems
         * @protected
         */
        _updateItems: function _updateItems() {
            var instance = this;

            if (!this.props.term) {
                return;
            }

            var promise = Promise.resolve(this.props.data(this.props.term));

            promise.then(function (items) {
                if (items.length) {
                    !instance.props.expanded && instance.props.toggleDropdown();
                }

                instance.setState({
                    items: items
                });
            });
        }
    });

    AlloyEditor.ButtonLinkAutocompleteList = ButtonLinkAutocompleteList;
})();
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

(function () {
    'use strict';

    /**
     * The ButtonLinkEdit class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @class ButtonLinkEdit
     * @uses ButtonCfgProps
     * @uses WidgetDropdown
     * @uses WidgetFocusManager
     */

    var ButtonLinkEdit = createReactClass({
        displayName: 'ButtonLinkEdit',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetFocusManager, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed values for the target attribute.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Array} allowedTargets
             */
            allowedTargets: PropTypes.arrayOf(PropTypes.object),

            /**
             * Indicate if we add http:// protocol to link or not
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Boolean} appendProtocol
             */
            appendProtocol: PropTypes.bool,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Default value of the link target attribute.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {String} defaultLinkTarget
             */
            defaultLinkTarget: PropTypes.string,

            /**
             * Indicates whether the link target selector should appear.
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Boolean} showTargetSelector
             */
            showTargetSelector: PropTypes.bool,

            /**
             * List of items to be rendered as possible values for the link or a function, which is
             * supposed to retrieve the data. The function should return a Promise.
             * The returned items must be objects with at least two properties:
             * - title
             * - url
             *
             * @instance
             * @memberof ButtonLinkEdit
             * @property {Function|Array} data
             */
            data: PropTypes.oneOfType([PropTypes.func, PropTypes.arrayOf(PropTypes.object)])
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkEdit
             * @memberof ButtonLinkEdit
             * @property {String} key
             * @static
             */
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing. This should only happen if the component
         * is rendered in exclusive mode to prevent aggressive focus stealing.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            if (this.props.renderExclusive || this.props.manualSelection) {
                // We need to wait for the next rendering cycle before focusing to avoid undesired
                // scrolls on the page
                this._focusLinkInput();
            }
        },

        /**
         * Lifecycle. Invoked when a component is receiving new props.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method componentWillReceiveProps
         */
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.replaceState(this.getInitialState());
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                appendProtocol: true,
                autocompleteUrl: '',
                circular: true,
                customIndexStart: true,
                defaultLinkTarget: '',
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                },
                showTargetSelector: true
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';
            var target = link ? link.getAttribute('target') : this.props.defaultLinkTarget;

            return {
                autocompleteSelected: false,
                element: link,
                initialLink: {
                    href: href,
                    target: target
                },
                linkHref: href,
                linkTarget: target
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var targetSelector = {
                allowedTargets: this.props.allowedTargets,
                editor: this.props.editor,
                handleLinkTargetChange: this._handleLinkTargetChange,
                selectedTarget: this.state.linkTarget || AlloyEditor.Strings.linkTargetDefault
            };

            targetSelector = this.mergeDropdownProps(targetSelector, AlloyEditor.ButtonLinkTargetEdit.key);

            var autocompleteDropdown;

            if (this.props.data) {
                var dataFn = this.props.data;

                if (!AlloyEditor.Lang.isFunction(dataFn)) {
                    var items = this.props.data;

                    dataFn = function dataFn(term) {
                        return items;
                    };
                }

                var autocompleteDropdownProps = {
                    autocompleteSelected: this.state.autocompleteSelected,
                    data: dataFn,
                    editor: this.props.editor,
                    handleLinkAutocompleteClick: this._handleLinkAutocompleteClick,
                    onDismiss: this.props.toggleDropdown,
                    setAutocompleteState: this._setAutocompleteState,
                    term: this.state.linkHref
                };

                autocompleteDropdownProps = this.mergeDropdownProps(autocompleteDropdownProps, AlloyEditor.ButtonLinkAutocompleteList.key);

                autocompleteDropdown = React.createElement(AlloyEditor.ButtonLinkAutocompleteList, autocompleteDropdownProps);
            }

            var targetButtonEdit;

            if (this.props.showTargetSelector) {
                targetButtonEdit = React.createElement(AlloyEditor.ButtonLinkTargetEdit, targetSelector);
            }

            var buttonClearLink;

            if (this.state.linkHref) {
                buttonClearLink = React.createElement('button', { 'aria-label': AlloyEditor.Strings.clearInput, className: 'ae-button ae-icon-remove', onClick: this._clearLink, title: AlloyEditor.Strings.clear });
            }

            var placeholderProp = {};

            if (!CKEDITOR.env.ie && AlloyEditor.Strings) {
                placeholderProp.placeholder = AlloyEditor.Strings.editLink;
            }

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link' },
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.removeLink, className: 'ae-button', disabled: !this.state.element, onClick: this._removeLink, title: AlloyEditor.Strings.remove },
                    React.createElement('span', { className: 'ae-icon-unlink' })
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input xxl' },
                    targetButtonEdit,
                    React.createElement(
                        'div',
                        { className: 'ae-container-input' },
                        React.createElement('input', _extends({ className: 'ae-input', onChange: this._handleLinkHrefChange, onKeyDown: this._handleKeyDown }, placeholderProp, { ref: 'linkInput', type: 'text', value: this.state.linkHref })),
                        autocompleteDropdown
                    ),
                    buttonClearLink
                ),
                React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.confirm, className: 'ae-button', disabled: !this._isValidState(), onClick: this._updateLink, title: AlloyEditor.Strings.confirm },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _clearLink
         * @protected
         */
        _clearLink: function _clearLink() {
            this.setState({
                linkHref: ''
            });

            this._focusLinkInput();
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _focusLinkInput
         * @protected
         */
        _focusLinkInput: function _focusLinkInput() {
            var instance = this;

            var focusLinkEl = function focusLinkEl() {
                ReactDOM.findDOMNode(instance.refs.linkInput).focus();
            };

            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(focusLinkEl);
            } else {
                setTimeout(focusLinkEl, 0);
            }
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === 13 || event.keyCode === 27) {
                event.preventDefault();
            }

            if (event.keyCode === 13) {
                this._updateLink();
            } else if (event.keyCode === 40) {
                this.setState({
                    autocompleteSelected: true
                });
            } else if (event.keyCode === 27) {
                var editor = this.props.editor.get('nativeEditor');

                new CKEDITOR.Link(editor).advanceSelection();

                this.props.editor.get('nativeEditor').fire('actionPerformed', this);
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkHrefChange
         * @param {SyntheticEvent} event The change event.
         * @protected
         */
        _handleLinkHrefChange: function _handleLinkHrefChange(event) {
            this.setState({
                linkHref: event.target.value
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when the link target changes on user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkTargetChange
         * @param {SyntheticEvent} event The click event.
         * @protected
         */
        _handleLinkTargetChange: function _handleLinkTargetChange(event) {
            this.setState({
                itemDropdown: null,
                linkTarget: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Updates the component state when an autocomplete link result is selected by user interaction.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _handleLinkAutocompleteClick
         * @param {SyntheticEvent} event The click event.
         * @protected
         */
        _handleLinkAutocompleteClick: function _handleLinkAutocompleteClick(event) {
            this.setState({
                itemDropdown: null,
                linkHref: event.target.getAttribute('data-value')
            });

            this._focusLinkInput();
        },

        /**
         * Verifies that the current link state is valid so the user can save the link. A valid state
         * means that we have a non-empty href and that either that or the link target are different
         * from the original link.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _isValidState
         * @protected
         * @return {Boolean} [description]
         */
        _isValidState: function _isValidState() {
            var validState = this.state.linkHref && (this.state.linkHref !== this.state.initialLink.href || this.state.linkTarget !== this.state.initialLink.target);

            return validState;
        },

        /**
         * Removes the link in the editor element.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _removeLink
         * @protected
         */
        _removeLink: function _removeLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            var selection = editor.getSelection();
            var bookmarks = selection.createBookmarks();

            linkUtils.remove(this.state.element, { advance: true });

            selection.selectBookmarks(bookmarks);

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Update autocompleteSelected state to focus and select autocomplete´s dropdown
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _setAutocompleteState
         * @protected
         */
        _setAutocompleteState: function _setAutocompleteState(state) {
            this.setState({
                autocompleteSelected: state.selected
            });
        },

        /**
         * Updates the link in the editor element. If the element didn't exist previously, it will
         * create a new <a> element with the href specified in the link input.
         *
         * @instance
         * @memberof ButtonLinkEdit
         * @method _updateLink
         * @protected
         */
        _updateLink: function _updateLink() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor, { appendProtocol: this.props.appendProtocol });
            var linkAttrs = {
                target: this.state.linkTarget
            };
            var modifySelection = { advance: true };

            if (this.state.linkHref) {
                if (this.state.element) {
                    linkAttrs.href = this.state.linkHref;

                    linkUtils.update(linkAttrs, this.state.element, modifySelection);
                } else {
                    linkUtils.create(this.state.linkHref, linkAttrs, modifySelection);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLinkTargetEdit class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonLinkTargetEdit
     */

    var ButtonLinkTargetEdit = createReactClass({
        displayName: 'ButtonLinkTargetEdit',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the allowed items for the target attribute. Every allowed target is an object
             * with a `label` attribute that will be shown in the dropdown and a `value` attribute
             * that will get set as the link target attribute.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {Array<object>} allowedTargets
             */
            allowedTargets: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Label of the current target value.
             *
             * @instance
             * @memberof ButtonLinkTargetEdit
             * @property {String} selectedTarget
             */
            selectedTarget: PropTypes.string
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkTargetEdit
             * @memberof ButtonLinkTargetEdit
             * @property {String} key
             * @static
             */
            key: 'linkTargetEdit'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonLinkTargetEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonTargetsList;

            var handleLinkTargetChange = this.props.handleLinkTargetChange;
            var allowedLinkTargets = this.props.allowedTargets;

            if (this.props.expanded) {
                buttonTargetsList = React.createElement(AlloyEditor.ButtonTargetList, { editor: this.props.editor, onDismiss: this.props.toggleDropdown, allowedLinkTargets: allowedLinkTargets, handleLinkTargetChange: handleLinkTargetChange, selectedTarget: this.props.selectedTarget });
            }

            return React.createElement(
                'div',
                { className: 'ae-container-edit-link-target ae-container-dropdown ae-container-dropdown-medium ae-has-dropdown', tabIndex: '0' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': this.props.selectedTarget, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: this.props.selectedTarget },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            this.props.selectedTarget
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonTargetsList
            );
        },

        /**
         * Lifecycle. Invoked before rendering when new props or state are being received.
         * This method is not called for the initial render or when forceUpdate is used.
         *
         * @instance
         * @memberof ButtonLinkTargetEdit
         * @method  shouldComponentUpdate
         * @return {Boolean} Returns false when the transition to the new props and state will not
         * require a component update.
         */
        shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
            return nextProps.expanded !== this.props.expanded || nextProps.selectedTarget !== this.props.selectedTarget;
        }
    });

    AlloyEditor.Buttons[ButtonLinkTargetEdit.key] = AlloyEditor.ButtonLinkTargetEdit = ButtonLinkTargetEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonLink class provides functionality for creating and editing a link in a document. ButtonLink
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonLinkEdit UI with all the link edition controls.
     *
     * @class ButtonLink
     * @uses ButtonCfgProps
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     */

    var ButtonLink = createReactClass({
        displayName: 'ButtonLink',

        mixins: [AlloyEditor.ButtonKeystroke, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCfgProps],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonLink
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonLink
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonLink
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default link
             * @memberof ButtonLink
             * @property {String} key
             * @static
             */
            key: 'link'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonLink
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                keystroke: {
                    fn: '_requestExclusive',
                    keys: CKEDITOR.CTRL + 76 /*L*/
                }
            };
        },

        /**
         * Checks if the current selection is contained within a link.
         *
         * @instance
         * @memberof ButtonLink
         * @method isActive
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function isActive() {
            return new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonLink
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                var props = this.mergeButtonCfgProps();

                return React.createElement(AlloyEditor.ButtonLinkEdit, props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.link, className: cssClass, 'data-type': 'button-link', onClick: this._requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.link },
                    React.createElement('span', { className: 'ae-icon-link' })
                );
            }
        },

        /**
         * Requests the link button to be rendered in exclusive mode to allow the creation of a link.
         *
         * @instance
         * @memberof ButtonLink
         * @method _requestExclusive
         * @protected
         */
        _requestExclusive: function _requestExclusive() {
            this.props.requestExclusive(ButtonLink.key);
        }
    });

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @class ButtonOrderedList
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonOrderedList = createReactClass({
        displayName: 'ButtonOrderedList',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonOrderedList
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default ol
             * @memberof ButtonOrderedList
             * @property {String} key
             * @static
             */
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonOrderedList
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'numberedlist',
                style: {
                    element: 'ol'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonOrderedList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.numberedlist, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-ol', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.numberedlist },
                React.createElement('span', { className: 'ae-icon-numbered-list' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
})();
'use strict';

(function () {
    'use strict';

    /**
        * The ButtonOutdentBlock class provides functionality for outdenting blocks.
        *
        * @class ButtonOutdentBlock
        * @uses ButtonCommand
        * @uses ButtonCommandActive
        * @uses ButtonStateClasses
        */

    var ButtonOutdentBlock = createReactClass({
        displayName: 'ButtonOutdentBlock',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        //Allows validating props being passed to the component
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonOutdentBlock
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonOutdentBlock
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonOutdentBlock
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default indentBlock
             * @memberof ButtonOutdentBlock
             * @property {String} key
             * @static
             */
            key: 'outdentBlock'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonOutdentBlock
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'outdent'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonOutdentBlock
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.outdent, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-outdent-block', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.outdent },
                React.createElement('span', { className: 'ae-icon-outdent-block' })
            );
        }

    });

    AlloyEditor.Buttons[ButtonOutdentBlock.key] = AlloyEditor.ButtonOutdentBlock = ButtonOutdentBlock;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
     *
     * @class ButtonParagraphAlignLeft
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonParagraphAlignLeft = createReactClass({
        displayName: 'ButtonParagraphAlignLeft',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonParagraphAlignLeft
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default paragraphLeft
             * @memberof ButtonParagraphAlignLeft
             * @property {String} key
             * @static
             */
            key: 'paragraphLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonParagraphAlignLeft
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyleft'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonParagraphAlignLeft
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignLeft, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-align-left', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignLeft },
                React.createElement('span', { className: 'ae-icon-align-left' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignRight class provides functionality for aligning a paragraph on right.
     *
     * @class ButtonParagraphAlignRight
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonParagraphAlignRight = createReactClass({
        displayName: 'ButtonParagraphAlignRight',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonParagraphAlignRight
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonParagraphAlignRight
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonParagraphAlignRight
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default paragraphRight
             * @memberof ButtonParagraphAlignRight
             * @property {String} key
             * @static
             */
            key: 'paragraphRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonParagraphAlignRight
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyright'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonParagraphAlignRight
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignRight, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-align-right', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignRight },
                React.createElement('span', { className: 'ae-icon-align-right' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignRight.key] = AlloyEditor.ButtonParagraphAlignRight = ButtonParagraphAlignRight;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphCenter class provides functionality for centering a paragraph.
     *
     * @class ButtonParagraphCenter
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonParagraphCenter = createReactClass({
        displayName: 'ButtonParagraphCenter',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonParagraphCenter
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonParagraphCenter
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonParagraphCenter
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default paragraphCenter
             * @memberof ButtonParagraphCenter
             * @property {String} key
             * @static
             */
            key: 'paragraphCenter'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonParagraphCenter
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifycenter'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonParagraphCenter
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignCenter, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-center', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignCenter },
                React.createElement('span', { className: 'ae-icon-align-center' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphCenter.key] = AlloyEditor.ButtonParagraphCenter = ButtonParagraphCenter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonParagraphJustify class provides functionality for justfying a paragraph.
     *
     * @class ButtonParagraphJustify
     * @uses ButtonCommand
     * @uses ButtonCommandActive
     * @uses ButtonStateClasses
     */

    var ButtonParagraphJustify = createReactClass({
        displayName: 'ButtonParagraphJustify',

        mixins: [AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonCommandActive],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonParagraphJustify
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonParagraphJustify
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonParagraphJustify
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default paragraphJustify
             * @memberof ButtonParagraphJustify
             * @property {String} key
             * @static
             */
            key: 'paragraphJustify'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonParagraphJustify
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'justifyblock'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonParagraphJustify
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.alignJustify, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-paragraph-justify', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.alignJustify },
                React.createElement('span', { className: 'ae-icon-align-justified' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphJustify.key] = AlloyEditor.ButtonParagraphJustify = ButtonParagraphJustify;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonQuote class wraps a selection in `blockquote` element.
     *
     * @class ButtonQuote
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonQuote = createReactClass({
        displayName: 'ButtonQuote',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonQuote
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonQuote
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonQuote
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default quote
             * @memberof ButtonQuote
             * @property {String} key
             * @static
             */
            key: 'quote'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonQuote
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'blockquote',
                style: {
                    element: 'blockquote'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonQuote
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.quote, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-quote', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.quote },
                React.createElement('span', { className: 'ae-icon-quote' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonQuote.key] = AlloyEditor.ButtonQuote = ButtonQuote;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonRemoveFormat class removes style formatting.
     *
     * @class ButtonRemoveFormat
     * @uses ButtonCommand
     */

    var ButtonRemoveFormat = createReactClass({
        displayName: 'ButtonRemoveFormat',

        mixins: [AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonRemoveFormat
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default removeFormat
             * @memberof ButtonRemoveFormat
             * @property {String} key
             * @static
             */
            key: 'removeFormat'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonRemoveFormat
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'removeFormat'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonRemoveFormat
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.removeformat, className: 'ae-button', 'data-type': 'button-removeformat', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.removeformat },
                React.createElement('span', { className: 'ae-icon-removeformat' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonRemoveFormat.key] = AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStrike class styles a selection with strike style.
     *
     * @class ButtonStrike
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonStrike = createReactClass({
        displayName: 'ButtonStrike',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonStrike
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonStrike
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonStrike
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default strike
             * @memberof ButtonStrike
             * @property {String} key
             * @static
             */
            key: 'strike'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonStrike
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'strike',
                style: 'coreStyles_strike'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         * @instance
         * @memberof ButtonStrike
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.strike, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-strike', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.strike },
                React.createElement('span', { className: 'ae-icon-strike' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonStrike.key] = AlloyEditor.ButtonStrike = ButtonStrike;
})();
"use strict";

(function () {
    'use strict';

    /**
     * The ButtonsStylesListHeader class provides the header of an list of style items.
     *
     * @class ButtonsStylesListHeader
     */

    var ButtonsStylesListHeader = createReactClass({
        displayName: "ButtonsStylesListHeader",

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonsStylesListHeader
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.styles && this.props.styles.length) {
                return React.createElement(
                    "span",
                    { className: "ae-list-header" },
                    this.props.name
                );
            } else {
                return null;
            }
        }
    });

    AlloyEditor.ButtonsStylesListHeader = ButtonsStylesListHeader;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */

    var ButtonStylesListItemRemove = createReactClass({
        displayName: 'ButtonStylesListItemRemove',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Block styles that should be removed in addition to all other inline styles
             *
             * @default ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Array} removeBlocks
             */
            removeBlocks: PropTypes.array,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonStylesListItemRemove
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        //Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonStylesListItemRemove
             * @memberof ButtonStylesListItemRemove
             * @property {String} key
             * @static
             */
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre']
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'li',
                { role: 'option' },
                React.createElement(
                    'button',
                    { className: 'ae-toolbar-element', onClick: this._removeStyles, tabIndex: this.props.tabIndex },
                    AlloyEditor.Strings.normal
                )
            );
        },

        /**
         * Removes all inline styles and configured block elements applied to the current selection.
         *
         * @instance
         * @memberof ButtonStylesListItemRemove
         * @method _removeStyles
         * @protected
         */
        _removeStyles: function _removeStyles() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand('removeFormat');

            this.props.removeBlocks.forEach(function (blockItem) {
                var blockStyle = new CKEDITOR.style({ element: blockItem });

                editor.removeStyle(blockStyle);
            });

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesListItem class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItem
     * @uses ButtonActionStyle
     * @uses ButtonStyle
     */

    var ButtonStylesListItem = createReactClass({
        displayName: 'ButtonStylesListItem',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle],

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default buttonStylesListItem
             * @memberof ButtonStylesListItem
             * @property {String} key
             * @static
             */
            key: 'buttonStylesListItem'
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonStylesListItem
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            // Styles with wildcard element (*) generate an empty tag in their preview < class="custom-class" />.
            // We default to element span and remove the margins to obtain a more consistent set of previews.
            var styleCfg = {
                element: 'span',
                styles: {
                    margin: 0
                }
            };

            styleCfg = CKEDITOR.tools.merge(styleCfg, this.props.style);

            this._preview = new CKEDITOR.style(styleCfg).buildPreview(this.props.name);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonStylesListItem
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            // We need to use dangerouselySetInnterHTML since we're not in control of the style
            // preview that is generated by CKEditor.
            var className = this.props.name === this.props.activeStyle ? 'ae-toolbar-element active' : 'ae-toolbar-element';

            return React.createElement('button', { className: className, dangerouslySetInnerHTML: { __html: this._preview }, onClick: this._onClick, tabIndex: this.props.tabIndex });
        },

        /**
         * Applies the item style to the editor selection.
         *
         * @instance
         * @memberof ButtonStylesListItem
         * @method _onClick
         * @protected
         */
        _onClick: function _onClick() {
            // Typically, we want the style to be the only one applied to the current selection, so
            // we execute the 'removeFormat' command first. Note that block styles won't be cleaned.
            // However, this is consistent with other editors implementations of this feature.
            this.props.editor.get('nativeEditor').execCommand('removeFormat');

            this.applyStyle();
        }
    });

    AlloyEditor.ButtonStylesListItem = ButtonStylesListItem;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStylesList class provides functionality for showing a list of styles that can be
     * applied to the current selection..
     *
     * @class ButtonStylesList
     * @uses WidgetFocusManager
     */

    var ButtonStylesList = createReactClass({
        displayName: 'ButtonStylesList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @memberof ButtonStylesList
             * @static
             * @property {String} key
             * @default buttonStylesList
             */
            key: 'buttonStylesList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         *
         * @instance
         * @memberof ButtonStylesList
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonStylesList
         * @method componentWillMount
         */
        componentWillMount: function componentWillMount() {
            var blockStyles = [];
            var inlineStyles = [];
            var objectStyles = [];

            this.props.styles.forEach(function (item) {
                var style = new CKEDITOR.style(item.style);

                if (style.type === CKEDITOR.STYLE_BLOCK) {
                    blockStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_INLINE) {
                    inlineStyles.push(item);
                } else if (style.type === CKEDITOR.STYLE_OBJECT) {
                    objectStyles.push(item);
                }
            });

            this._blockStyles = blockStyles;
            this._inlineStyles = inlineStyles;
            this._objectStyles = objectStyles;
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonStylesList
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: false,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                },
                showRemoveStylesItem: true
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @instance
         * @memberof ButtonStylesList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var removeStylesItem;

            if (this.props.showRemoveStylesItem) {
                removeStylesItem = React.createElement(AlloyEditor.ButtonStylesListItemRemove, { editor: this.props.editor, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                AlloyEditor.ButtonDropdown,
                this.props,
                removeStylesItem,
                React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.blockStyles, styles: this._blockStyles }),
                this._renderStylesItems(this._blockStyles),
                React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.inlineStyles, styles: this._inlineStyles }),
                this._renderStylesItems(this._inlineStyles),
                React.createElement(AlloyEditor.ButtonsStylesListHeader, { name: AlloyEditor.Strings.objectStyles, styles: this._objectStyles }),
                this._renderStylesItems(this._objectStyles)
            );
        },

        /**
         * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
         *
         * @instance
         * @memberof ButtonStylesList
         * @method _renderStylesItems
         * @param {Array} styles List of styles for which preview should be rendered.
         * @protected
         * @return {Array} Rendered instances of ButtonStylesListItem class
         */
        _renderStylesItems: function _renderStylesItems(styles) {
            var editor = this.props.editor;
            var items;

            if (styles && styles.length) {
                items = styles.map(function (item) {
                    return React.createElement(
                        'li',
                        { key: item.name, role: 'option' },
                        React.createElement(AlloyEditor.ButtonStylesListItem, { activeStyle: this.props.activeStyle, editor: editor, name: item.name, style: item.style })
                    );
                }.bind(this));
            }

            return items;
        }
    });

    AlloyEditor.ButtonStylesList = ButtonStylesList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonStyles class provides functionality for styling a selection with a list of
     * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
     * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
     *
     * @class ButtonStyles
     */

    var ButtonStyles = createReactClass({
        displayName: 'ButtonStyles',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Indicates whether the remove styles item should appear in the styles list.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Boolean} showRemoveStylesItem
             */
            showRemoveStylesItem: PropTypes.bool,

            /**
             * List of the styles the button is able to handle.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Array} styles
             */
            styles: PropTypes.arrayOf(PropTypes.object),

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonStyles
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default styles
             * @memberof ButtonStyles
             * @property {String} key
             * @static
             */
            key: 'styles'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonStyles
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var activeStyle = AlloyEditor.Strings.normal;

            var styles = this._getStyles();

            styles.forEach(function (item) {
                if (this._checkActive(item.style)) {
                    activeStyle = item.name;
                }
            }.bind(this));

            var buttonStylesList;

            if (this.props.expanded) {
                buttonStylesList = React.createElement(AlloyEditor.ButtonStylesList, { activeStyle: activeStyle, editor: this.props.editor, onDismiss: this.props.toggleDropdown, showRemoveStylesItem: this.props.showRemoveStylesItem, styles: styles });
            }

            return React.createElement(
                'div',
                { className: 'ae-container-dropdown ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.styles + ' ' + activeStyle, className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.styles + ' ' + activeStyle },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            activeStyle
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonStylesList
            );
        },

        /**
         * Checks if the given style definition is applied to the current selection in the editor.
         *
         * @instance
         * @memberof ButtonStyles
         * @method _checkActive
         * @param {Object} styleConfig Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
         * @protected
         * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
         */
        _checkActive: function _checkActive(styleConfig) {
            var nativeEditor = this.props.editor.get('nativeEditor');

            // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
            // to a 'span' element works for most of those cases with no defined element.
            styleConfig = CKEDITOR.tools.merge({ element: 'span' }, styleConfig);

            var style = new CKEDITOR.style(styleConfig);

            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
        },

        /**
         * Returns an array of styles. Each style consists from two properties:
         * - name - the style name, for example "h1"
         * - style - an object with one property, called `element` which value
         * represents the style which have to be applied to the element.
         *
         * @instance
         * @memberof ButtonStyles
         * @method _getStyles
         * @protected
         * @return {Array<object>} An array of objects containing the styles.
         */
        _getStyles: function _getStyles() {
            return this.props.styles || [{
                name: AlloyEditor.Strings.h1,
                style: {
                    element: 'h1'
                }
            }, {
                name: AlloyEditor.Strings.h2,
                style: {
                    element: 'h2'
                }
            }, {
                name: AlloyEditor.Strings.formatted,
                style: {
                    element: 'pre'
                }
            }, {
                name: AlloyEditor.Strings.cite,
                style: {
                    element: 'cite'
                }
            }, {
                name: AlloyEditor.Strings.code,
                style: {
                    element: 'code'
                }
            }];
        }
    });

    AlloyEditor.Buttons[ButtonStyles.key] = AlloyEditor.ButtonStyles = ButtonStyles;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonSubscript
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonSubscript = createReactClass({
        displayName: 'ButtonSubscript',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonSubscript
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default subscript
             * @memberof ButtonSubscript
             * @property {String} key
             * @static
             */
            key: 'subscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonSubscript
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'subscript',
                style: 'coreStyles_subscript'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonSubscript
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.subscript, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-subscript', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.subscript },
                React.createElement('span', { className: 'ae-icon-subscript' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonSuperscript class provides functionality for applying superscript style to a text selection.
     *
     * @class ButtonSuperscript
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonSuperscript = createReactClass({
        displayName: 'ButtonSuperscript',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonSuperscript
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonSuperscript
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonSuperscript
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default superscript
             * @memberof ButtonSuperscript
             * @property {String} key
             * @static
             */
            key: 'superscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonSuperscript
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'superscript',
                style: 'coreStyles_superscript'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonSuperscript
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.superscript, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-superscript', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.superscript },
                React.createElement('span', { className: 'ae-icon-superscript' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonSuperscript.key] = AlloyEditor.ButtonSuperscript = ButtonSuperscript;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */

    var ButtonTableCell = createReactClass({
        displayName: 'ButtonTableCell',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonTableCell
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableCell
             * @memberof ButtonTableCell
             * @property {String} key
             * @static
             */
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableCell
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableCell.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.cell, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.cell },
                    React.createElement('span', { className: 'ae-icon-cell' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @instance
         * @memberof ButtonTableCell
         * @method _getCommands
         * @protected
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'cellInsertBefore',
                label: AlloyEditor.Strings.cellInsertBefore
            }, {
                command: 'cellInsertAfter',
                label: AlloyEditor.Strings.cellInsertAfter
            }, {
                command: 'cellDelete',
                label: AlloyEditor.Strings.cellDelete
            }, {
                command: 'cellMerge',
                label: AlloyEditor.Strings.cellMerge
            }, {
                command: 'cellMergeDown',
                label: AlloyEditor.Strings.cellMergeDown
            }, {
                command: 'cellMergeRight',
                label: AlloyEditor.Strings.cellMergeRight
            }, {
                command: 'cellHorizontalSplit',
                label: AlloyEditor.Strings.cellSplitHorizontal
            }, {
                command: 'cellVerticalSplit',
                label: AlloyEditor.Strings.cellSplitVertical
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality to work with table columns.
     *
     * @class ButtonTableColumn
     */

    var ButtonTableColumn = createReactClass({
        displayName: 'ButtonTableColumn',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonTableColumn
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableColumn
             * @memberof ButtonTableColumn
             * @property {String} key
             * @static
             */
            key: 'tableColumn'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableColumn
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList, buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableColumn.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.column, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, role: 'listbox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.column },
                    React.createElement('span', { className: 'ae-icon-column' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @instance
         * @memberof ButtonTableColumn
         * @method _getCommands
         * @protected
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'columnInsertBefore',
                label: AlloyEditor.Strings.columnInsertBefore
            }, {
                command: 'columnInsertAfter',
                label: AlloyEditor.Strings.columnInsertAfter
            }, {
                command: 'columnDelete',
                label: AlloyEditor.Strings.columnDelete
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableColumn.key] = AlloyEditor.ButtonTableColumn = ButtonTableColumn;
})();
'use strict';

(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonTableEdit class provides functionality for creating and editing a table in a document.
     * Provides UI for creating a table.
     *
     * @class ButtonTableEdit
     */
    var ButtonTableEdit = createReactClass({
        displayName: 'ButtonTableEdit',

        // Allows validating props being passed to the component.
        propTypes: {

            /**
             * Method to notify the button abandons the exclusive rendering mode.
             *
             * @instance
             * @memberof ButtonTableEdit
             * @property {Function} cancelExclusive
             */
            cancelExclusive: PropTypes.func.isRequired,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableEdit
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableEdit
             * @memberof ButtonTableEdit
             * @property {String} key
             * @static
             */
            key: 'tableEdit'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                tableAttributes: {
                    border: 1,
                    cellPadding: 0,
                    cellSpacing: 0,
                    style: 'width: 100%'
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this.refs.rows).focus();
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                cols: 3,
                rows: 3
            };
        },

        /**
         * Creates a table.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method _createTable
         * @protected
         */
        _createTable: function _createTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.create({
                attrs: this.props.tableAttributes,
                cols: this.state.cols,
                rows: this.state.rows
            });

            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Handles a change in input value. Sets the provided value from the user back to the input.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method _handleChange
         * @param {String} inputName The name of the input which value should be updated.
         * @param {SyntheticEvent} event The provided event.
         * @protected
         */
        _handleChange: function _handleChange(inputName, event) {
            var state = {};
            state[inputName] = event.target.value;

            this.setState(state);
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates the table.
         * - Escape: Discards the changes.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method _handleKeyDown
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         */
        _handleKeyDown: function _handleKeyDown(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._createTable();
            } else if (event.keyCode === KEY_ESC) {
                this.props.cancelExclusive();
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableEdit
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var time = Date.now();
            var rowsId = time + 'rows';
            var colsId = time + 'cols';

            return React.createElement(
                'div',
                { className: 'ae-container-edit-table' },
                React.createElement(
                    'label',
                    { htmlFor: rowsId },
                    AlloyEditor.Strings.rows
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input small' },
                    React.createElement('input', { className: 'ae-input', id: rowsId, onChange: this._handleChange.bind(this, 'rows'), min: '1', onKeyDown: this._handleKeyDown, placeholder: 'Rows', ref: 'rows', type: 'number', value: this.state.rows })
                ),
                React.createElement(
                    'label',
                    { htmlFor: colsId },
                    AlloyEditor.Strings.columns
                ),
                React.createElement(
                    'div',
                    { className: 'ae-container-input small' },
                    React.createElement('input', { className: 'ae-input', id: colsId, onChange: this._handleChange.bind(this, 'cols'), min: '1', onKeyDown: this._handleKeyDown, placeholder: 'Colums', ref: 'cols', type: 'number', value: this.state.cols })
                ),
                React.createElement(
                    'button',
                    { 'aria-label': 'Confirm', className: 'ae-button', onClick: this._createTable },
                    React.createElement('span', { className: 'ae-icon-ok' })
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonTableEdit.key] = AlloyEditor.ButtonTableEdit = ButtonTableEdit;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableHeading class provides functionality to work with table heading.
     *
     * @class ButtonTableHeading
     */

    var ButtonTableHeading = createReactClass({
        displayName: 'ButtonTableHeading',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonTableHeading
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableRow
             * @memberof ButtonTableHeading
             * @property {String} key
             * @static
             */
            key: 'tableHeading'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableHeading
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableHeading.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            var activeHeading = new CKEDITOR.Table(this.props.editor.get('nativeEditor')).getHeading();
            var activeHeadingIntro = AlloyEditor.Strings.headers + ':';
            var activeHeadingLabel = AlloyEditor.Strings['headers' + activeHeading];

            return React.createElement(
                'div',
                { className: 'ae-container-dropdown-xl ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': '', className: 'ae-toolbar-element', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: '' },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        React.createElement(
                            'span',
                            { className: 'ae-container-dropdown-selected-item' },
                            activeHeadingIntro,
                            ' ',
                            React.createElement(
                                'strong',
                                null,
                                activeHeadingLabel
                            )
                        ),
                        React.createElement('span', { className: 'ae-icon-arrow' })
                    )
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @instance
         * @memberof ButtonTableHeading
         * @method _getCommands
         * @protected
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'tableHeadingNone',
                label: AlloyEditor.Strings.headersNone
            }, {
                command: 'tableHeadingRow',
                label: AlloyEditor.Strings.headersRow
            }, {
                command: 'tableHeadingColumn',
                label: AlloyEditor.Strings.headersColumn
            }, {
                command: 'tableHeadingBoth',
                label: AlloyEditor.Strings.headersBoth
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableHeading.key] = AlloyEditor.ButtonTableHeading = ButtonTableHeading;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */

    var ButtonTableRemove = createReactClass({
        displayName: 'ButtonTableRemove',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableRemove
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableRemove
             * @memberof ButtonTableRemove
             * @property {String} key
             * @static
             */
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableRemove
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.deleteTable, className: 'ae-button', 'data-type': 'button-table-remove', onClick: this._removeTable, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.deleteTable },
                React.createElement('span', { className: 'ae-icon-bin' })
            );
        },

        /**
         * Removes the table in the editor element.
         *
         * @instance
         * @memberof ButtonTableRemove
         * @method _removeTable
         * @protected
         */
        _removeTable: function _removeTable() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonTableRemove.key] = AlloyEditor.ButtonTableRemove = ButtonTableRemove;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality to work with table rows.
     *
     * @class ButtonTableRow
     */

    var ButtonTableRow = createReactClass({
        displayName: 'ButtonTableRow',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * List of the commands the button is able to handle.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {Array} commands
             */
            commands: PropTypes.arrayOf(PropTypes.object),

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * Indicates whether the styles list is expanded or not.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {Boolean} expanded
             */
            expanded: PropTypes.bool,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number,

            /**
             * Callback provided by the button host to notify when the styles list has been expanded.
             *
             * @instance
             * @memberof ButtonTableRow
             * @property {Function} toggleDropdown
             */
            toggleDropdown: PropTypes.func
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default tableRow
             * @memberof ButtonTableRow
             * @property {String} key
             * @static
             */
            key: 'tableRow'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTableRow
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var buttonCommandsList;
            var buttonCommandsListId;

            if (this.props.expanded) {
                buttonCommandsListId = ButtonTableRow.key + 'List';
                buttonCommandsList = React.createElement(AlloyEditor.ButtonCommandsList, { commands: this._getCommands(), editor: this.props.editor, listId: buttonCommandsListId, onDismiss: this.props.toggleDropdown });
            }

            return React.createElement(
                'div',
                { className: 'ae-container ae-has-dropdown' },
                React.createElement(
                    'button',
                    { 'aria-expanded': this.props.expanded, 'aria-label': AlloyEditor.Strings.row, 'aria-owns': buttonCommandsListId, className: 'ae-button', onClick: this.props.toggleDropdown, role: 'combobox', tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.row },
                    React.createElement('span', { className: 'ae-icon-row' })
                ),
                buttonCommandsList
            );
        },

        /**
         * Returns a list of commands. If a list of commands was passed
         * as property `commands`, it will take a precedence over the default ones.
         *
         * @instance
         * @memberof ButtonTableRow
         * @method _getCommands
         * @protected
         * @return {Array} The list of available commands.
         */
        _getCommands: function _getCommands() {
            return this.props.commands || [{
                command: 'rowInsertBefore',
                label: AlloyEditor.Strings.rowInsertBefore
            }, {
                command: 'rowInsertAfter',
                label: AlloyEditor.Strings.rowInsertAfter
            }, {
                command: 'rowDelete',
                label: AlloyEditor.Strings.rowDelete
            }];
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTable class provides functionality for creating and editing a table in a document. ButtonTable
     * renders in two different modes:
     *
     * - Normal: Just a button that allows to switch to the edition mode
     * - Exclusive: The ButtonTableEdit UI with all the table edition controls.
     *
     * @class ButtonTable
     */

    var ButtonTable = createReactClass({
        displayName: 'ButtonTable',

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTable
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTable
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTable
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default table
             * @memberof ButtonTable
             * @property {String} key
             * @static
             */
            key: 'table'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTable
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.props.renderExclusive) {
                return React.createElement(AlloyEditor.ButtonTableEdit, this.props);
            } else {
                return React.createElement(
                    'button',
                    { 'aria-label': AlloyEditor.Strings.table, className: 'ae-button', 'data-type': 'button-table', onClick: this.props.requestExclusive, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.table },
                    React.createElement('span', { className: 'ae-icon-table' })
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonTable.key] = AlloyEditor.ButtonTable = ButtonTable;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTargetList class provides functionality for changing the target of a link
     * in the document.
     *
     * @class ButtonTargetList
     * @uses WidgetFocusManager
     */

    var ButtonTargetList = createReactClass({
        displayName: 'ButtonTargetList',

        mixins: [AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTargetList
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default linkTargetEdit
             * @memberof ButtonTargetList
             * @property {String} key
             * @static
             */
            key: 'targetList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            ReactDOM.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method getDefaultProps
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    dismissNext: [39],
                    dismissPrev: [37],
                    next: [40],
                    prev: [38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var listTargets = this._renderListTargets();

            return React.createElement(
                AlloyEditor.ButtonDropdown,
                this.props,
                listTargets
            );
        },

        /**
         * Returns the the allowed link target items.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method _getAllowedTargetItems
         * @protected
         * @return {Array} The allowed target items.
         */
        _getAllowedTargetItems: function _getAllowedTargetItems() {
            return this.props.allowedLinkTargets || [{
                label: AlloyEditor.Strings.linkTargetDefault,
                value: ''
            }, {
                label: AlloyEditor.Strings.linkTargetSelf,
                value: '_self'
            }, {
                label: AlloyEditor.Strings.linkTargetBlank,
                value: '_blank'
            }, {
                label: AlloyEditor.Strings.linkTargetParent,
                value: '_parent'
            }, {
                label: AlloyEditor.Strings.linkTargetTop,
                value: '_top'
            }];
        },

        /**
         * Renders the allowed link target items.
         *
         * @instance
         * @memberof ButtonTargetList
         * @method _renderListTargets
         * @protected
         * @return {Object} Returns the rendered link items
         */
        _renderListTargets: function _renderListTargets() {
            var targets = this._getAllowedTargetItems();

            var handleLinkTargetChange = this.props.handleLinkTargetChange;

            targets = targets.map(function (target) {
                var className = this.props.selectedTarget === target.value ? 'ae-toolbar-element active' : 'ae-toolbar-element';

                return React.createElement(
                    'li',
                    { key: target.value, role: 'option' },
                    React.createElement(
                        'button',
                        { className: className, 'data-value': target.value, onClick: handleLinkTargetChange },
                        target.label
                    )
                );
            }.bind(this));

            return targets;
        }
    });

    AlloyEditor.Buttons[ButtonTargetList.key] = AlloyEditor.ButtonTargetList = ButtonTargetList;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonTwitter class provides functionality for creating a link which
     * allows people to tweet part of the content in the editor.
     *
     * @class ButtonTwitter
     * @uses ButtonStateClasses
     */

    var ButtonTwitter = createReactClass({
        displayName: 'ButtonTwitter',

        mixins: [AlloyEditor.ButtonStateClasses],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonTwitter
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default twitter
             * @memberof ButtonTwitter
             * @property {String} key
             * @static
             */
            key: 'twitter'
        },

        /**
         * Creates or removes the twitter link on the selection.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method handleClick
         */
        handleClick: function handleClick() {
            var editor = this.props.editor.get('nativeEditor');

            var linkUtils = new CKEDITOR.Link(editor);

            if (this.isActive()) {
                linkUtils.remove(linkUtils.getFromSelection());
            } else {
                linkUtils.create(this._getHref(), {
                    'class': 'ae-twitter-link',
                    'target': '_blank'
                });
            }

            editor.fire('actionPerformed', this);
        },

        /**
         * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method isActive
         * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
         */
        isActive: function isActive() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

            return link && link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1;
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.twitter, className: cssClass, 'data-type': 'button-twitter', onClick: this.handleClick, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.twitter },
                React.createElement('span', { className: 'ae-icon-twitter' })
            );
        },

        /**
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @instance
         * @memberof ButtonTwitter
         * @method _getHref
         * @protected
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function _getHref() {
            var nativeEditor = this.props.editor.get('nativeEditor');
            var selectedText = nativeEditor.getSelection().getSelectedText();
            var url = this.props.url;
            var via = this.props.via;
            var twitterHref = 'https://twitter.com/intent/tweet?text=' + selectedText;

            if (url) {
                twitterHref += '&url=' + url;
            }

            if (via) {
                twitterHref += '&via=' + via;
            }

            return twitterHref;
        }
    });

    AlloyEditor.Buttons[ButtonTwitter.key] = AlloyEditor.ButtonTwitter = ButtonTwitter;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonUnorderedlist class provides functionality for creating unordered lists in an editor.
     *
     * @class ButtonUnorderedlist
     * @uses ButtonCommand
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonUnorderedlist = createReactClass({
        displayName: 'ButtonUnorderedlist',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonUnorderedlist
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonUnorderedlist
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonUnorderedlist
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default ul
             * @memberof ButtonUnorderedlist
             * @property {String} key
             * @static
             */
            key: 'ul'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonUnorderedlist
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'bulletedlist',
                style: {
                    element: 'ul'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonUnorderedlist
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.bulletedlist, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-ul', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.bulletedlist },
                React.createElement('span', { className: 'ae-icon-bulleted-list' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnorderedlist.key] = AlloyEditor.ButtonUnorderedlist = ButtonUnorderedlist;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ButtonUnderline class provides functionality for underlying a text selection.
     *
     * @class ButtonUnderline
     * @uses ButtonCommand
     * @uses ButtonKeystroke
     * @uses ButtonStateClasses
     * @uses ButtonStyle
     */

    var ButtonUnderline = createReactClass({
        displayName: 'ButtonUnderline',

        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand, AlloyEditor.ButtonKeystroke],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ButtonUnderline
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ButtonUnderline
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * The tabIndex of the button in its toolbar current state. A value other than -1
             * means that the button has focus and is the active element.
             *
             * @instance
             * @memberof ButtonUnderline
             * @property {Number} tabIndex
             */
            tabIndex: PropTypes.number
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default underline
             * @memberof ButtonUnderline
             * @property {String} key
             * @static
             */
            key: 'underline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ButtonUnderline
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                command: 'underline',
                keystroke: {
                    fn: 'execCommand',
                    keys: CKEDITOR.CTRL + 85 /*U*/
                },
                style: 'coreStyles_underline'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @instance
         * @memberof ButtonUnderline
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            var cssClass = 'ae-button ' + this.getStateClasses();

            return React.createElement(
                'button',
                { 'aria-label': AlloyEditor.Strings.underline, 'aria-pressed': cssClass.indexOf('pressed') !== -1, className: cssClass, 'data-type': 'button-underline', onClick: this.execCommand, tabIndex: this.props.tabIndex, title: AlloyEditor.Strings.underline },
                React.createElement('span', { className: 'ae-icon-underline' })
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnderline.key] = AlloyEditor.ButtonUnderline = ButtonUnderline;
})();
'use strict';

(function () {
    'use strict';

    var POSITION_LEFT = 1;
    var POSITION_RIGHT = 2;

    /**
     * The ToolbarAdd class provides functionality for adding content to the editor.
     *
     * @class ToolbarAdd
     * @uses ToolbarButtons
     * @uses WidgetArrowBox
     * @uses WidgetDropdown
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     * @uses WidgetPosition
     */
    var ToolbarAdd = createReactClass({
        displayName: 'ToolbarAdd',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The toolbar configuration.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} config
             */
            config: PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The payload from "editorInteraction" event
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} editorEvent
             */
            editorEvent: PropTypes.object,

            /**
             * The gutter to be applied to the widget when rendered in exclusive mode
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} gutterExclusive
             */
            gutterExclusive: PropTypes.object,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Provides a callback which should be executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Function} onDismiss
             */
            onDismiss: PropTypes.func,

            /**
             * Whether the Toolbar should be shown on left or on right of the editable area. Could be one of these:
             * - ToolbarAdd.left
             * - ToolbarAdd.right
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Enum} position
             */
            position: PropTypes.oneOf([POSITION_LEFT, POSITION_RIGHT]),

            /**
             * The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
             *
             * @instance
             * @memberof ToolbarAdd
             * @property {Object} selectionData
             */
            selectionData: PropTypes.object
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default add
             * @memberof ToolbarAdd
             * @property {String} key
             * @static
             */
            key: 'add',

            /**
             * Defines the constant for positioning the Toolbar on left of the editable area.
             *
             * @default 1
             * @memberof ToolbarAdd
             * @property {String} left
             * @static
             */
            left: POSITION_LEFT,

            /**
             * Defines the constant for positioning the Toolbar on right of the editable area.
             *
             * @default 2
             * @memberof ToolbarAdd
             * @property {String} right
             * @static
             */
            right: POSITION_RIGHT
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-button',
                gutterExclusive: {
                    left: 10,
                    top: 0
                },
                keys: {
                    dismiss: [27],
                    next: [39, 40],
                    prev: [37, 38]
                },
                position: POSITION_LEFT
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method componentDidUpdate
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();

            // In case of exclusive rendering, focus the first descendant (button)
            // so the user will be able to start interacting with the buttons immediately.
            if (this.props.renderExclusive) {
                this.focus();
            }
        },

        /**
         * Lifecycle. Renders the buttons for adding content or hides the toolbar
         * if user interacted with a non-editable element.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method render
         * @return {Object|null} The content which should be rendered.
         */
        render: function render() {
            // Some operations such as `requestExclusive` may force editor to blur which will
            // invalidate the `props.editorEvent` stored value, without causing a `props` change.
            // For example, if the editor is empty, `ae_placeholder` plugin will remove
            // the target from the DOM and will prevent `add` toolbar from rendering.
            //
            // It should be safe to assume that if you have been able to render the toolbar
            // and request the exclusive mode, then rendering might be kept until the exclusive mode is left.
            if (!this.state.itemExclusive && this.props.editorEvent && this.props.editorEvent.data.nativeEvent.target && !this.props.editorEvent.data.nativeEvent.target.isContentEditable) {
                return null;
            }

            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return React.createElement(
                'div',
                { 'aria-label': AlloyEditor.Strings.add, className: className, 'data-tabindex': this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, role: 'toolbar', tabIndex: '-1' },
                React.createElement(
                    'div',
                    { className: 'ae-container' },
                    buttons
                )
            );
        },

        /**
         * Returns a list of buttons that will eventually render to HTML.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _getButtons
         * @protected
         * @return {Object} The buttons which have to be rendered.
         */
        _getButtons: function _getButtons() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this.getToolbarButtons(this.props.config.buttons);
            } else {
                if (this.props.selectionData && this.props.selectionData.region) {
                    buttons = React.createElement(
                        'button',
                        { 'aria-label': AlloyEditor.Strings.add, className: 'ae-button ae-button-add', onClick: this.props.requestExclusive.bind(this, ToolbarAdd.key), title: AlloyEditor.Strings.add },
                        React.createElement('span', { className: 'ae-icon-add' })
                    );
                }
            }

            return buttons;
        },

        /**
         * Returns the class name of the toolbar in case of both exclusive and normal mode.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _getToolbarClassName
         * @protected
         * @return {String} The class name which have to be applied to the DOM element.
         */
        _getToolbarClassName: function _getToolbarClassName() {
            var cssClass = 'ae-toolbar-add';

            if (this.props.renderExclusive) {
                cssClass = 'ae-toolbar ' + this.getArrowBoxClasses();
            }

            return cssClass;
        },

        /**
         * Calculates and sets the position of the toolbar in exclusive or normal mode.
         *
         * @instance
         * @memberof ToolbarAdd
         * @method _updatePosition
         * @protected
         */
        _updatePosition: function _updatePosition() {
            var region;

            // If component is not mounted, there is nothing to do
            if (!ReactDOM.findDOMNode(this)) {
                return;
            }

            if (this.props.renderExclusive) {
                this.updatePosition();
                this.show();
            } else {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var domNode = ReactDOM.findDOMNode(this);

                    var domElement = new CKEDITOR.dom.element(domNode);

                    var startRect = region.startRect || region;

                    var nativeEditor = this.props.editor.get('nativeEditor');

                    var clientRect = nativeEditor.editable().getClientRect();

                    var offsetLeft;

                    var position = this.props.config.position || this.props.position;

                    if (position === POSITION_LEFT) {
                        offsetLeft = clientRect.left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                    } else {
                        offsetLeft = clientRect.right + this.props.gutterExclusive.left + 'px';
                    }

                    domNode.style.left = offsetLeft;

                    domNode.style.top = Math.floor((region.bottom + region.top) / 2) + 'px';

                    if (nativeEditor.element.getStyle('overflow') !== 'auto') {
                        domNode.style.top = Math.floor(region.top - domNode.offsetHeight / 2 + startRect.height / 2) + 'px';
                    } else {
                        domNode.style.top = Math.floor(nativeEditor.element.$.offsetTop + startRect.height / 2 - domNode.offsetHeight / 2) + 'px';
                    }

                    domNode.style.opacity = 1;

                    domElement.removeClass('ae-arrow-box');

                    this.cancelAnimation();
                }
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarAdd.key] = AlloyEditor.ToolbarAdd = ToolbarAdd;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The ToolbarStyles class hosts the buttons for styling a text selection.
     *
     * @class ToolbarStyles
     * @uses ToolbarButtons
     * @uses WidgetArrowBox
     * @uses WidgetDropdown
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     * @uses WidgetPosition
     */

    var ToolbarStyles = createReactClass({
        displayName: 'ToolbarStyles',

        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * The toolbar configuration.
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {Object} config
             */
            config: PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The payload from "editorInteraction" event
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {Object} editorEvent
             */
            editorEvent: PropTypes.object,

            /**
             * The label that should be used for accessibility purposes.
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {String} label
             */
            label: PropTypes.string,

            /**
             * Provides a callback which should be executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {Function} onDismiss
             */
            onDismiss: PropTypes.func,

            /**
             * The data, returned from {{#crossLink "CKEDITOR.plugins.ae_selectionregion/getSelectionData:method"}}{{/crossLink}}
             *
             * @instance
             * @memberof ToolbarStyles
             * @property {Object} selectionData
             */
            selectionData: PropTypes.object
        },

        // Lifecycle. Provides static properties to the widget.
        statics: {
            /**
             * The name which will be used as an alias of the button in the configuration.
             *
             * @default styles
             * @memberof ToolbarStyles
             * @property {String} key
             * @static
             */
            key: 'styles'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method componentDidUpdate
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            this._updatePosition();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '.ae-input, .ae-button:not([disabled]), .ae-toolbar-element',
                keys: {
                    dismiss: [27],
                    next: [39, 40],
                    prev: [37, 38]
                }
            };
        },

        /**
         * Lifecycle. Renders the buttons for adding content or hides the toolbar
         * if user interacted with a non-editable element.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method render
         * @return {Object|null} The content which should be rendered.
         */
        render: function render() {
            var currentSelection = this._getCurrentSelection();

            if (currentSelection) {
                var getArrowBoxClassesFn = this._getSelectionFunction(currentSelection.getArrowBoxClasses);
                var arrowBoxClasses;

                if (getArrowBoxClassesFn) {
                    arrowBoxClasses = getArrowBoxClassesFn();
                } else {
                    arrowBoxClasses = this.getArrowBoxClasses();
                }

                var cssClasses = 'ae-toolbar-styles ' + arrowBoxClasses;

                var buttons = this.getToolbarButtons(currentSelection.buttons, {
                    manualSelection: this.props.editorEvent ? this.props.editorEvent.data.manualSelection : null,
                    selectionType: currentSelection.name
                });

                return React.createElement(
                    'div',
                    { 'aria-label': AlloyEditor.Strings.styles, className: cssClasses, 'data-tabindex': this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, role: 'toolbar', tabIndex: '-1' },
                    React.createElement(
                        'div',
                        { className: 'ae-container' },
                        buttons
                    )
                );
            }

            return null;
        },

        /**
         * Retrieve a function from String. It converts a fully qualified string into the mapped function.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method _getSelectionFunction
         * @param {Function|String} selectionFn A function, or a fully qualified string pointing to the desired one (e.g. 'AlloyEditor.SelectionTest.image').
         * @protected
         * @return {Function} The mapped function.
         */
        _getSelectionFunction: function _getSelectionFunction(selectionFn) {
            var Lang = AlloyEditor.Lang;
            var selectionFunction;

            if (Lang.isFunction(selectionFn)) {
                selectionFunction = selectionFn;
            } else if (Lang.isString(selectionFn)) {
                var parts = selectionFn.split('.');
                var currentMember = window;
                var property = parts.shift();

                while (property && Lang.isObject(currentMember) && Lang.isObject(currentMember[property])) {
                    currentMember = currentMember[property];
                    property = parts.shift();
                }

                if (Lang.isFunction(currentMember)) {
                    selectionFunction = currentMember;
                }
            }

            return selectionFunction;
        },

        /**
         * Analyzes the current editor selection and returns the selection configuration that matches.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method _getCurrentSelection
         * @protected
         * @return {Object} The matched selection configuration.
         */
        _getCurrentSelection: function _getCurrentSelection() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;
            var selection;

            if (eventPayload) {
                this.props.config.selections.some(function (item) {
                    var testFn = this._getSelectionFunction(item.test);
                    var result;

                    if (testFn) {
                        result = eventPayload.manualSelection === item.name || testFn({
                            data: eventPayload,
                            editor: this.props.editor
                        });
                    }

                    if (result) {
                        selection = item;
                    }

                    return result;
                }, this);
            }

            return selection;
        },

        /**
         * Calculates and sets the position of the toolbar.
         *
         * @instance
         * @memberof ToolbarStyles
         * @method _updatePosition
         * @protected
         */
        _updatePosition: function _updatePosition() {
            // If component is not mounted, there is nothing to do
            if (!ReactDOM.findDOMNode(this)) {
                return;
            }

            var currentSelection = this._getCurrentSelection();
            var result;

            // If current selection has a function called `setPosition`, call it
            // and check the returned value. If false, fallback to the default positioning logic.
            if (currentSelection) {
                var setPositionFn = this._getSelectionFunction(currentSelection.setPosition);

                if (setPositionFn) {
                    result = setPositionFn.call(this, {
                        editor: this.props.editor,
                        editorEvent: this.props.editorEvent,
                        selectionData: this.props.selectionData
                    });
                }
            }

            if (!result) {
                this.updatePosition();
                this.show();
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarStyles.key] = AlloyEditor.ToolbarStyles = ToolbarStyles;
})();
'use strict';

(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @class UI
     * @uses WidgetExclusive
     * @uses WidgetFocusManager
     */

    var UI = createReactClass({
        displayName: 'UI',

        mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],

        // Allows validating props being passed to the component.
        propTypes: {
            /**
             * Localized messages for live aria updates. Should include the following messages:
             * - noToolbar: Notification for no available toolbar in the editor.
             * - oneToolbar: Notification for just one available toolbar in the editor.
             * - manyToolbars: Notification for more than one available toolbar in the editor.
             *
             * @instance
             * @memberof UI
             * @property {Object} ariaUpdates
             */
            ariaUpdates: PropTypes.object,

            /**
             * The editor instance where the component is being used.
             *
             * @instance
             * @memberof UI
             * @property {Object} editor
             */
            editor: PropTypes.object.isRequired,

            /**
             * The delay (ms), after which key or mouse events will be processed.
             *
             * @instance
             * @memberof UI
             * @property {Number} eventsDelay
             */
            eventsDelay: PropTypes.number,

            /**
             * The toolbars configuration for this editor instance
             *
             * @instance
             * @memberof UI
             * @property {Object} toolbars
             */
            toolbars: PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         *
         * @instance
         * @memberof UI
         * @method getInitialState
         */
        getInitialState: function getInitialState() {
            return {
                hidden: false
            };
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @instance
         * @memberof UI
         * @method getDefaultProps
         * @return {Object} The default properties.
         */
        getDefaultProps: function getDefaultProps() {
            return {
                circular: true,
                descendants: '[class^=ae-toolbar-]',
                eventsDelay: 0,
                keys: {
                    next: 9
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * @instance
         * @memberof UI
         * @method componentDidMount
         */
        componentDidMount: function componentDidMount() {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
            editor.on('key', this._onEditorKey, this);

            // Set up events for hiding the UI when user stops interacting with the editor.
            // This may happen when he just clicks outside of the editor. However,
            // this does not include a situation when he clicks on some button, part of
            // editor's UI.

            // It is not easy to debounce _setUIHidden on mousedown, because if we
            // debounce it, when the handler is being invoked, the target might be no more part
            // of the editor's UI - onActionPerformed causes re-render.
            this._mousedownListener = function (event) {
                this._setUIHidden(event.target);
            }.bind(this);

            this._keyDownListener = CKEDITOR.tools.debounce(function (event) {
                this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);

            document.addEventListener('mousedown', this._mousedownListener);
            document.addEventListener('keydown', this._keyDownListener);
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * Fires `ariaUpdate` event passing ARIA related messages.
         * Fires `editorUpdate` event passing the previous and current properties and state.
         *
         * @instance
         * @memberof UI
         * @method componentDidUpdate
         */
        componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
            var domNode = ReactDOM.findDOMNode(this);

            var editor = this.props.editor.get('nativeEditor');

            if (domNode) {
                editor.fire('ariaUpdate', {
                    message: this._getAvailableToolbarsMessage(domNode)
                });
            }

            editor.fire('editorUpdate', {
                prevProps: prevProps,
                prevState: prevState,
                props: this.props,
                state: this.state
            });
        },

        _getAriaUpdateTemplate: function _getAriaUpdateTemplate(ariaUpdate) {
            if (!this._ariaUpdateTemplates) {
                this._ariaUpdateTemplates = {};
            }

            if (!this._ariaUpdateTemplates[ariaUpdate]) {
                this._ariaUpdateTemplates[ariaUpdate] = new CKEDITOR.template(this._getAriaUpdates()[ariaUpdate]);
            }

            return this._ariaUpdateTemplates[ariaUpdate];
        },

        /**
         * Returns the templates for ARIA messages.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _getAriaUpdates
         * @return {Object} ARIA relates messages. Default:
         * {
         *      noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
         *      oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
         *      manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
         *  }
         */
        _getAriaUpdates: function _getAriaUpdates() {
            return this.props.ariaUpdates || {
                noToolbar: AlloyEditor.Strings.ariaUpdateNoToolbar,
                oneToolbar: AlloyEditor.Strings.ariaUpdateOneToolbar,
                manyToolbars: AlloyEditor.Strings.ariaUpdateManyToolbars
            };
        },

        /**
         * Returns an ARIA message which represents the number of currently available toolbars.
         *
         * @instance
         * @memberof UI
         * @method _getAvailableToolbarsMessage
         * @protected
         * @param {CKEDITOR.dom.element} domNode The DOM node from which the available toolbars will be retrieved.
         * @return {String} The ARIA message for the number of available toolbars
         */
        _getAvailableToolbarsMessage: function _getAvailableToolbarsMessage(domNode) {
            var toolbarsNodeList = domNode.querySelectorAll('[role="toolbar"]');

            if (!toolbarsNodeList.length) {
                return this._getAriaUpdates().noToolbar;
            } else {
                var toolbarNames = Array.prototype.slice.call(toolbarsNodeList).map(function (toolbar) {
                    return toolbar.getAttribute('aria-label');
                });

                var ariaUpdate = toolbarNames.length === 1 ? 'oneToolbar' : 'manyToolbars';

                return this._getAriaUpdateTemplate(ariaUpdate).output({
                    toolbars: toolbarNames.join(',').replace(/,([^,]*)$/, ' and ' + '$1')
                });
            }
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         *
         * @instance
         * @memberof UI
         * @method componentWillUnmount
         */
        componentWillUnmount: function componentWillUnmount() {
            if (this._mousedownListener) {
                document.removeEventListener('mousedown', this._mousedownListener);
            }

            if (this._keyDownListener) {
                this._keyDownListener.detach();
                document.removeEventListener('keydown', this._keyDownListener);
            }
        },

        /**
         * Lifecycle. Renders the UI of the editor. This may include several toolbars and buttons.
         * The editor's UI also takes care of rendering the items in exclusive mode.
         *
         * @instance
         * @memberof UI
         * @method render
         * @return {Object} The content which should be rendered.
         */
        render: function render() {
            if (this.state.hidden) {
                return null;
            }

            var toolbars = Object.keys(this.props.toolbars).map(function (toolbar) {
                return AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function (toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    onDismiss: this._onDismissToolbarFocus,
                    selectionData: this.state.selectionData
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return React.createElement(
                'div',
                { className: 'ae-toolbars', onKeyDown: this.handleKey },
                toolbars
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _onActionPerformed
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function _onActionPerformed(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                itemExclusive: null,
                selectionData: editor.getSelectionData()
            });
        },

        /**
         * Executed when a dismiss key is pressed over a toolbar to return the focus to the editor.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _onDismissToolbarFocus
         */
        _onDismissToolbarFocus: function _onDismissToolbarFocus() {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _onEditorInteraction
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function _onEditorInteraction(event) {
            this.setState({
                editorEvent: event,
                hidden: false,
                itemExclusive: null,
                selectionData: event.data.selectionData
            });
        },

        /**
         * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _onEditorKey
         */
        _onEditorKey: function _onEditorKey(event) {
            var nativeEvent = event.data.domEvent.$;

            if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
                this.focus();
            }
        },

        /**
         * Checks if the target with which the user interacted is part of editor's UI or it is
         * the editable area. If none of these, sets the state of editor's UI to be hidden.
         *
         * @instance
         * @memberof UI
         * @protected
         * @method _setUIHidden
         * @param {DOMElement} target The DOM element with which user interacted lastly.
         */
        _setUIHidden: function _setUIHidden(target) {
            var domNode = ReactDOM.findDOMNode(this);

            if (domNode) {
                var editable = this.props.editor.get('nativeEditor').editable();
                var targetNode = new CKEDITOR.dom.node(target);

                if (!editable) {
                    this.setState({
                        hidden: true
                    });
                } else {
                    var res = editable.$ === target || editable.contains(targetNode) || new CKEDITOR.dom.element(domNode).contains(targetNode);

                    if (!res) {
                        this.setState({
                            hidden: true
                        });
                    }
                }
            }
        }
    });

    /**
     * Fired when component updates and when it is rendered in the DOM.
     * The payload consists from a `message` property containing the ARIA message.
     *
     * @event ariaUpdate
     */

    /**
     * Fired when component updates. The payload consists from an object with the following
     * properties:
     * - prevProps - The previous properties of the component
     * - prevState - The previous state of the component
     * - props - The current properties of the component
     * - state - The current state of the component
     *
     * @event ariaUpdate
     */

    AlloyEditor.UI = UI;
})();
    }
}());
