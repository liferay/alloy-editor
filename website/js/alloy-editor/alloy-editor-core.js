CKEDITOR.disableAutoInline = true;

(function() {
    if (window.AlloyEditor) {
        return;
    }

    (function() {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Debounce util function. If a function execution is expensive, it might be debounced. This means
     * that it will be executed after some amount of time after its last call. For example, if we attach a
     * a function on scroll event, it might be called hundreds times per second. In this case it may be
     * debounced with, let's say 100ms. The real execution of this function will happen 100ms after last
     * scroll event.
     *
     * @method debounce
     * @param {Function} callback The callback which has to be called after given timeout.
     * @param {Number} timeout Timeout in milliseconds after which the callback will be called.
     * @param {Object} context The context in which the callback will be called. This argument is optional.
     * @param {Array} args An array of arguments which the callback will receive.
     */
    CKEDITOR.tools.debounce = CKEDITOR.tools.debounce || function(callback, timeout, context, args) {
        var debounceHandle;

        var callFn = function() {
            var callContext = context || this;

            clearTimeout(debounceHandle);

            var result = [];

            for (var len = arguments.length, startIndex = 0; startIndex < len; ++startIndex) {
                result.push(arguments[startIndex]);
            }

            var callArgs = result.concat(args || []);

            debounceHandle = setTimeout(function() {
                callback.apply(callContext, callArgs);
            }, timeout);
        };

        callFn.detach = function() {
            clearTimeout(debounceHandle);
        };

        return callFn;
    };
}());
(function() {
    'use strict';

    /**
     * Link class utility. Provides methods for create, delete and update links.
     *
     * @class CKEDITOR.Link
     * @constructor
     * @param {Object} The CKEditor instance.
     */

    function Link(editor) {
        this._editor = editor;
    }

    Link.prototype = {
        constructor: Link,

        /**
         * Create a link with given URI as href.
         *
         * @method create
         * @param {String} URI The URI of the link.
         * @param {Object} attrs A config object with link attributes. These might be arbitrary DOM attributes.
         */
        create: function(URI, attrs) {
            var selection = this._editor.getSelection();

            var range = selection.getRanges()[0];

            if (range.collapsed) {
                var text = new CKEDITOR.dom.text(URI, this._editor.document);
                range.insertNode(text);
                range.selectNodeContents(text);
            }

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
            range.select();
        },

        /**
         * Retrieves a link from the current selection.
         *
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved link or null if not found.
         */
        getFromSelection: function() {
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
         * @param {CKEDITOR.dom.element} link The link element which link style should be removed.
         * @method remove
         */
        remove: function(link) {
            var editor = this._editor;

            if (link) {
                link.remove(editor);
            } else {
                var style = link || new CKEDITOR.style({
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
         * @param {String} URI The new URI of the link.
         * @param {CKEDITOR.dom.element} link The link element which href should be removed.
         * @method update
         */
        update: function(URI, link) {
            var style = link || this.getFromSelection();

            style.setAttributes({
                'data-cke-saved-href': URI,
                href: URI
            });
        }
    };

    CKEDITOR.Link = CKEDITOR.Link || Link;
}());
(function() {
    'use strict';

    if (CKEDITOR.plugins.get('selectionregion')) {
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
     * @class CKEDITOR.plugins.selectionregion
     * @constructor
     */
    function SelectionRegion() {}

    SelectionRegion.prototype = {
        constructor: SelectionRegion,

        /**
         * Creates selection from two points in page coordinates.
         *
         * @method createSelectionFromPoint
         * @param {Number} x X point in page coordinates.
         * @param {Number} y Y point in page coordinates.
         */
        createSelectionFromPoint: function(x, y) {
            this.createSelectionFromRange(x, y, x, y);
        },

        /**
         * Creates selection from range. A range consists from two points in page coordinates.
         *
         * @method createSelectionFromRange
         * @param {Number} startX X coordinate of the first point.
         * @param {Number} startY Y coordinate of the first point.
         * @param {Number} endX X coordinate of the second point.
         * @param {Number} endY Y coordinate of the second point.
         */
        createSelectionFromRange: function(startX, startY, endX, endY) {
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
         * @method getCaretRegion
         * @return {Object} Returns object with the following properties:
         * - bottom
         * - left
         * - right
         * - top
         */
        getCaretRegion: function() {
            var selection = this.getSelection();

            var bookmarks = selection.createBookmarks();
            var bookmarkNodeEl = bookmarks[0].startNode.$;

            bookmarkNodeEl.style.display = 'inline-block';

            var region = new CKEDITOR.dom.element(bookmarkNodeEl).getClientRect();

            bookmarkNodeEl.parentNode.removeChild(bookmarkNodeEl);

            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

            return {
                bottom: scrollPos.y + region.bottom,
                left: scrollPos.x + region.left,
                right: scrollPos.x + region.right,
                top: scrollPos.y + region.top
            };
        },

        /**
         * Returns data for the current selection.
         *
         * @method getSelectionData
         * @return {Object} Returns object with the following data:
         * - element - The currently selected element, if any
         * - text - The selected text
         * - region - The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionRegion:method"}}{{/crossLink}}
         */
        getSelectionData: function() {
            var selection = this.getSelection();

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
         * @method getSelectionRegion
         * @return {Object} Returns object which is being returned from
         * {{#crossLink "CKEDITOR.plugins.selectionregion/getClientRectsRegion:method"}}{{/crossLink}} with three more properties:
         * - direction - the direction of the selection. Can be one of these:
         *   1. CKEDITOR.SELECTION_TOP_TO_BOTTOM
         *   2. CKEDITOR.SELECTION_BOTTOM_TO_TOP
         * - height - The height of the selection region
         * - width - The width of the selection region
         */
        getSelectionRegion: function() {
            var region = this.getClientRectsRegion();

            region.direction = this.getSelectionDirection();

            region.height = region.bottom - region.top;
            region.width = region.right - region.left;

            return region;
        },

        /**
         * Returns true if the current selection is empty, false otherwise.
         *
         * @method isSelectionEmpty
         * @return {Boolean} Returns true if the current selection is empty, false otherwise.
         */
        isSelectionEmpty: function() {
            var ranges;

            var selection = this.getSelection();

            return (selection.getType() === CKEDITOR.SELECTION_NONE) ||
                ((ranges = selection.getRanges()) && ranges.length === 1 && ranges[0].collapsed);
        },

        /**
         * Returns object with data about the [client rectangles](https://developer.mozilla.org/en-US/docs/Web/API/Element.getClientRects) of the selection,
         * normalized across browses. All offsets below are in page coordinates.
         *
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
         */
        getClientRectsRegion: function() {
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            var rangeCount;
            var clientRects;

            if (nativeSelection.createRange) {
                var range = nativeSelection.createRange();
                clientRects = range.getClientRects();
            } else {
                rangeCount = nativeSelection.rangeCount;
                clientRects = (nativeSelection.rangeCount > 0) ? nativeSelection.getRangeAt(0).getClientRects() : [];
            }

            var bottom = 0;
            var left = Infinity;
            var right = -Infinity;
            var top = Infinity;

            var region;

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

                region = {
                    bottom: scrollPos.y + bottom,
                    left: scrollPos.x + left,
                    right: scrollPos.x + right,
                    top: scrollPos.y + top
                };

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
         * @method getSelectionDirection
         * @return {Number} Returns a number which represents selection direction. It might be one of these:
         * - CKEDITOR.SELECTION_TOP_TO_BOTTOM;
         * - CKEDITOR.SELECTION_BOTTOM_TO_TOP;
         */
        getSelectionDirection: function() {
            var selection = this.getSelection();
            var nativeSelection = selection.getNative();

            var direction = CKEDITOR.SELECTION_TOP_TO_BOTTOM;

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

    CKEDITOR.plugins.add(
        'selectionregion', {
            /**
             * Initializer lifecycle implementation for the SelectionRegion plugin.
             *
             * @method init
             * @protected
             * @param {Object} editor The current CKEditor instance.
             */
            init: function(editor) {
                var attr,
                    hasOwnProperty;

                hasOwnProperty = Object.prototype.hasOwnProperty;

                for (attr in SelectionRegion.prototype) {
                    if (hasOwnProperty.call(SelectionRegion.prototype, attr) && typeof editor[attr] === 'undefined') {
                        editor[attr] = SelectionRegion.prototype[attr];
                    }
                }
            }
        }
    );
}());
(function() {
    'use strict';

    /**
     * Table class utility. Provides methods for create, delete and update tables.
     *
     * @class CKEDITOR.Table
     * @constructor
     * @param {Object} The CKEditor instance.
     */

    function Table(editor) {
        this._editor = editor;
    }

    Table.prototype = {
        constructor: Table,

        /**
         * Creates a table.
         *
         * @param {Object} config Table configuration object
         * @return {Object} The created table
         */
        create: function(config) {
            var editor = this._editor;
            var table = this._createElement('table');

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

            if (!table.getAttribute('style')) {
                table.removeAttribute('style');
            }

            this.setAttributes(table, config.attrs);

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
         * @method getFromSelection
         * @return {CKEDITOR.dom.element} The retrieved table or null if not found.
         */
        getFromSelection: function() {
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
                    if (CKEDITOR.env.webkit) {
                        ranges[0].shrink(CKEDITOR.NODE_ELEMENT);
                    }

                    table = this._editor.elementPath(ranges[0].getCommonAncestor(true)).contains('table', 1);
                }
            }

            return table;
        },

        /**
         * Removes a table from the editor.
         *
         * @param {CKEDITOR.dom.element} table The table element which table style should be removed.
         * @method remove
         */
        remove: function(table) {
            var editor = this._editor;

            if (table) {
                table.remove(editor);
            } else {
                table = editor.elementPath().contains('table', 1);

                if (table) {
                    // If the table's parent has only one child remove it as well (unless it's a table cell, or the editable element) (#5416, #6289, #12110)
                    var parent = table.getParent(),
                        editable = editor.editable();

                    if (parent.getChildCount() == 1 && !parent.is('td', 'th') && !parent.equals(editable)) {
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
         * @param {Object} table The table to which the attributes should be assigned.
         * @param {Object} attrs The attributes which have to be assigned to the table.
         */
        setAttributes: function(table, attrs) {
            Object.keys(attrs).forEach(function(attr) {
                table.setAttribute(attr, attrs[attr]);
            });
        },

        /**
         * Creates a new CKEDITOR.dom.element using the passed tag name.
         *
         * @protected
         * @param {[type]} name [description]
         * @return {CKEDITOR.dom.element} Instance of CKEDITOR DOM element class.
         */
        _createElement: function(name) {
            return new CKEDITOR.dom.element(name, this._editor.document);
        }
    };

    CKEDITOR.Table = CKEDITOR.Table || Table;
}());

(function() {
    'use strict';

    /**
     * CKEDITOR.tools class utility which adds additional methods to those of CKEditor.
     *
     * @class CKEDITOR.tools
     */

    /**
     * Returns a new object containing all of the properties of all the supplied
     * objects. The properties from later objects will overwrite those in earlier
     * objects.
     *
     * Passing in a single object will create a shallow copy of it.
     *
     * @method merge
     * @param {Object} objects* One or more objects to merge.
     * @return {Object} A new merged object.
     */
    CKEDITOR.tools.merge = CKEDITOR.tools.merge || function() {
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
     * @param {DOMElement} element The element on which the event shoud be simualted.
     * @param {String} event The name of the event which have to be simulated.
     */
    CKEDITOR.tools.simulate = function(element, event) {
        var eventInstance = document.createEvent('Events');
        eventInstance.initEvent(event, true, false);
        element.dispatchEvent(eventInstance);
    };
}());
(function() {
    'use strict';

    if (CKEDITOR.plugins.get('uicore')) {
        return;
    }

    /**
     * UICore class which will handle user interactions with the editor. These interactions
     * might be triggered via mouse, keyboard or touch devices. The class fill fire an event via
     * CKEditor's event system - "editorInteraction". The UI may listen to this event and
     * execute some actions - for example to show/hide toolbars.
     *
     * By default if user presses the Esc key, 'editorInteraction' event won't be fired. However, this behaviour can be changed
     * by setting {{#crossLink "CKEDITOR.plugins.uicore/allowEsc:attribute"}}{{/crossLink}} config property in editor's configuration to true.
     *
     * @class CKEDITOR.plugins.uicore
     */

    /**
     * Fired when user interacts somehow with the browser. This may be clicking with the mouse, pressing keyboard button,
     * or touching screen. This even will be not fired after each interaction. It will be debounced. By default the timeout
     * is 50ms. This value can be overwritten via {{#crossLink "CKEDITOR.plugins.uicore/timeout:attribute"}}{{/crossLink}}
     * property of editor's configuration, like: editor.config.uicore.timeout = 100
     *
     * @event editorInteraction
     * @param {Object} data An object which contains the following properties:
     * - nativeEvent - The event as received from CKEditor.
     * - selectionData - The data, returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
     */

     /**
      * Fired by UI elements like Toolbars or Buttons when their state changes. The listener updates the live region with the provided data.
      *
      * @event ariaUpdate
      * @param {Object} data An object which contains the following properties:
      * - message - The provided message from the UI element.
      */

    /**
     * If set to true, the editor will still fire {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event,
     * if user presses Esc key.
     *
     * @attribute allowEsc
     * @default false
     * @type Boolean
     */

    /**
     * Specifies the default timeout after which the {{#crossLink "CKEDITOR.plugins.uicore/editorInteraction:event"}}{{/crossLink}} event
     * will be fired.
     *
     * @attribute timeout
     * @default 50 (ms)
     * @type Number
     */

    CKEDITOR.plugins.add(
        'uicore', {
            /**
             * Initializer lifecycle implementation for the UICore plugin.
             *
             * @method init
             * @protected
             * @param {Object} editor The current CKEditor instance.
             */
            init: function(editor) {
                var ariaElement,
                    ariaState = [],
                    handleAria,
                    handleUI,
                    uiTasksTimeout;

                ariaElement = this._createAriaElement(editor.id);

                uiTasksTimeout = editor.config.uicore ? editor.config.uicore.timeout : 50;

                handleAria = CKEDITOR.tools.debounce(
                    function(event) {
                        ariaElement.innerHTML = ariaState.join('. ');
                    },
                    uiTasksTimeout
                );

                handleUI = CKEDITOR.tools.debounce(
                    function(event) {
                        ariaState = [];

                        if (event.name !== 'keyup' || event.data.$.keyCode !== 27 || editor.config.allowEsc) {
                            editor.fire('editorInteraction', {
                                nativeEvent: event.data.$,
                                selectionData: editor.getSelectionData()
                            });
                        }
                    },
                    uiTasksTimeout
                );

                editor.on('ariaUpdate', function(event) {
                    // handleAria is debounced function, so if it is being called multiple times, it will
                    // be canceled until some time passes.
                    // For that reason here we explicitly append the current message to the list of messages
                    // and call handleAria. Since it is debounced, when some timeout passes,
                    // all the messages will be applied to the live region and not only the last one.

                    ariaState.push(event.data.message);

                    handleAria();
                });

                editor.on('contentDom', function() {
                    var editable = editor.editable();

                    editable.attachListener(editable, 'mouseup', handleUI);
                    editable.attachListener(editable, 'keyup', handleUI);
                });

                editor.on('destroy', function(event) {
                    handleUI.detach();
                });
            },

            /**
             * Creates and applies an HTML element to the body of the document which will contain ARIA messages.
             *
             * @method _createAriaElement
             * @protected
             * @param {String} id The provided id of the element. It will be used as prefix for the final element Id.
             * @return {HTMLElement} The created and applied to DOM element.
             */
            _createAriaElement: function(id) {
                var statusElement;

                statusElement = document.createElement('div');

                statusElement.className = 'sr-only';

                statusElement.setAttribute('aria-live', 'polite');
                statusElement.setAttribute('role', 'status');
                statusElement.setAttribute('id', id + 'LiveRegion');

                document.body.appendChild(statusElement);

                return statusElement;
            }
        }
    );
}());
(function() {
    'use strict';

    if (CKEDITOR.plugins.get('autolink')) {
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

    var REGEX_URL = /(https?\:\/\/|www\.)(-\.)?([^\s/?\.#-]+\.?)+(\/[^\s]*)?$/i;

    /**
     * CKEditor plugin which automatically generates links when user types text which looks like URL.
     *
     * @class CKEDITOR.plugins.autolink
     * @constructor
     */
    CKEDITOR.plugins.add(
        'autolink', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers the 'keyup' event on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                this._editor = editor;

                var editable = editor.editable();

                editable.attachListener(editable, 'keyup', this._onKeyUp, this);
            },

            /**
             * Retrieves the last word introduced by the user. Reads from the current
             * caret position backwards until it finds the first white space.
             *
             * @method _getLastWord
             * @return {String} The last word introduced by user.
             * @protected
             */
            _getLastWord: function() {
                var range = this._editor.getSelection().getRanges()[0];

                var offset = range.startOffset;

                var previousText = '';

                // The user pressed Enter, so we have to look on the previous node
                if (this._currentKeyCode === KEY_ENTER) {
                    var previousNode = range.startContainer.getPrevious();

                    var lastChild;

                    // The last child node may be a <BR>, ignore it and find the previous text node
                    if (previousNode) {
                        lastChild = previousNode.getLast();
                        while (lastChild && !lastChild.getText()) {
                            lastChild = lastChild.getPrevious();
                        }
                    }

                    // Check if the lastChild is a link
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
             * @method isValidURL
             * @param  {String} link The link we want to know if it is a valid URL.
             * @return {Boolean} Returns true if the link is a valid URL, false otherwise.
             * @protected
             */
            _isValidURL: function(link) {
                return REGEX_URL.test(link);
            },

            /**
             * Listens to the `keydown` event and if the keycode is `Backspace`, removes the previously
             * created link.
             *
             * @method _onKeyDown
             * @param {EventFacade} event EventFacade object
             * @protected
             */
            _onKeyDown: function(event) {
                var nativeEvent = event.data.$;

                var editable = this._editor.editable();

                editable.removeListener('keydown', this._onKeyDown);

                if (nativeEvent.keyCode === KEY_BACK) {
                    event.cancel();
                    event.data.preventDefault();

                    this._removeLink();
                }

                this._ckLink = null;
            },

            /**
             * Listens to the `Enter` and `Space` key events in order to check if the last word
             * introduced by the user should be replaced by a link element.
             *
             * @method _onKeyUp
             * @param {EventFacade} event EventFacade object
             * @protected
             */
            _onKeyUp: function(event) {
                var nativeEvent = event.data.$;

                this._currentKeyCode = nativeEvent.keyCode;

                if (DELIMITERS.indexOf(this._currentKeyCode) !== -1) {
                    var lastWord = this._getLastWord();

                    if (this._isValidURL(lastWord)) {
                        this._replaceContentByLink(lastWord);
                    }
                }
            },

            /**
             * Replaces content by a link element.
             *
             * @method _replaceContentByLink
             * @param {String} content The text that has to be replaced by an link element.
             * @protected
             */
            _replaceContentByLink: function(content) {
                var range = this._editor.createRange();
                var node = CKEDITOR.dom.element.get(this._startContainer);
                var offset = this._offset;

                // Select the content, so CKEDITOR.Link can properly replace it
                range.setStart(node, offset - content.length);
                range.setEnd(node, offset);
                range.select();

                var ckLink = new CKEDITOR.Link(this._editor);
                ckLink.create(content);
                this._ckLink = ckLink;

                this._subscribeToKeyEvent();

                // Now range is on the link and it is selected. We have to
                // return focus to the caret position.
                range = this._editor.getSelection().getRanges()[0];

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
             * Removes the created link element, and replaces it by its text.
             *
             * @method _removeLink
             * @protected
             */
            _removeLink: function() {
                var range = this._editor.getSelection().getRanges()[0];
                var caretOffset = range.startOffset;

                // Select the link, so CKEDITOR.Link can properly remove it
                var linkNode = this._startContainer.getNext() || this._startContainer;

                var newRange = this._editor.createRange();
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
             * @method _subscribeToKeyEvent
             * @protected
             */
            _subscribeToKeyEvent: function() {
                var editable = this._editor.editable();

                // Change the priority of keydown listener - 1 means the highest priority.
                // In Chrome on pressing `Enter` the listener is not being invoked.
                // See http://dev.ckeditor.com/ticket/11861 for more information.
                editable.attachListener(editable, 'keydown', this._onKeyDown, this, {}, 1);
            }
        }
    );
}());

/**
 * CKEditor plugin: Dragable image resizing
 * https://github.com/sstur/ck-dragresize
 * - Shows semi-transparent overlay while resizing
 * - Enforces Aspect Ratio (unless holding shift)
 * - Snap to size of other images in editor
 * - Escape while dragging cancels resize
 */
(function() {
    'use strict';

    var PLUGIN_NAME = 'dragresize';
    var IMAGE_SNAP_TO_SIZE = 7;

    var isWebkit = ('WebkitAppearance' in document.documentElement.style);

    if (isWebkit) {
        // CSS is added in a compressed form
        CKEDITOR.addCss('img::selection{color:rgba(0,0,0,0)}img.ckimgrsz{outline:1px dashed #000}#ckimgrsz{position:absolute;width:0;height:0;cursor:default;z-index:10001}#ckimgrsz span{display:none;position:absolute;top:0;left:0;width:0;height:0;background-size:100% 100%;opacity:.65;outline:1px dashed #000}#ckimgrsz i{position:absolute;display:block;width:5px;height:5px;background:#fff;border:1px solid #000}#ckimgrsz i.active,#ckimgrsz i:hover{background:#000}#ckimgrsz i.br,#ckimgrsz i.tl{cursor:nwse-resize}#ckimgrsz i.bm,#ckimgrsz i.tm{cursor:ns-resize}#ckimgrsz i.bl,#ckimgrsz i.tr{cursor:nesw-resize}#ckimgrsz i.lm,#ckimgrsz i.rm{cursor:ew-resize}body.dragging-br,body.dragging-br *,body.dragging-tl,body.dragging-tl *{cursor:nwse-resize!important}body.dragging-bm,body.dragging-bm *,body.dragging-tm,body.dragging-tm *{cursor:ns-resize!important}body.dragging-bl,body.dragging-bl *,body.dragging-tr,body.dragging-tr *{cursor:nesw-resize!important}body.dragging-lm,body.dragging-lm *,body.dragging-rm,body.dragging-rm *{cursor:ew-resize!important}');
    }

    /**
     * Initializes the plugin
     */
    CKEDITOR.plugins.add(PLUGIN_NAME, {
        onLoad: function() {
            if (!isWebkit) {
                return;
            }
        },
        init: function(editor) {
            if (!isWebkit) {
                return;
            }
            //onDomReady handler
            editor.on('contentDom', function(evt) {
                init(editor);
            });
        }
    });

    function init(editor) {
        var window = editor.window.$,
            document = editor.document.$;
        var snapToSize = (typeof IMAGE_SNAP_TO_SIZE === 'undefined') ? null : IMAGE_SNAP_TO_SIZE;

        var resizer = new Resizer(editor, {
            snapToSize: snapToSize
        });

        document.addEventListener('mousedown', function(e) {
            if (resizer.isHandle(e.target)) {
                resizer.initDrag(e);
            }
        }, false);

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

        editor.on('getData', function(e) {
            var html = e.data.dataValue || '';
            html = html.replace(/<div id="ckimgrsz"([\s\S]*?)<\/div>/i, '');
            html = html.replace(/\b(ckimgrsz)\b/g, '');
            e.data.dataValue = html;
        });

        editor.on('beforeUndoImage', function() {
            // Remove the handles before undo images are saved
            resizer.hide();
        });

        editor.on('afterUndoImage', function() {
            // Restore the handles after undo images are saved
            selectionChange();
        });

        editor.on('blur', function() {
            // Remove the handles when editor loses focus
            resizer.hide();
        });

        editor.on('beforeModeUnload', function self() {
            editor.removeListener('beforeModeUnload', self);
            resizer.hide();
        });

        // Update the selection when the browser window is resized
        var resizeTimeout;
        editor.window.on('resize', function() {
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
        init: function() {
            var container = this.container = this.document.createElement('div');
            container.id = 'ckimgrsz';
            this.preview = this.document.createElement('span');
            container.appendChild(this.preview);
            var handles = this.handles = {
                tl: this.createHandle('tl'),
                tm: this.createHandle('tm'),
                tr: this.createHandle('tr'),
                lm: this.createHandle('lm'),
                rm: this.createHandle('rm'),
                bl: this.createHandle('bl'),
                bm: this.createHandle('bm'),
                br: this.createHandle('br')
            };
            for (var n in handles) {
                container.appendChild(handles[n]);
            }
        },
        createHandle: function(name) {
            var el = this.document.createElement('i');
            el.classList.add(name);
            return el;
        },
        isHandle: function(el) {
            var handles = this.handles;
            for (var n in handles) {
                if (handles[n] === el) return true;
            }
            return false;
        },
        show: function(el) {
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
        hide: function() {
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
        initDrag: function(e) {
            if (e.button !== 0) {
                //right-click or middle-click
                return;
            }
            var resizer = this;
            var drag = new DragEvent(this.window, this.document);
            drag.onStart = function() {
                resizer.showPreview();
                resizer.isDragging = true;
                resizer.editor.getSelection().lock();
            };
            drag.onDrag = function() {
                resizer.calculateSize(this);
                resizer.updatePreview();
                var box = resizer.previewBox;
                resizer.updateHandles(box, box.left, box.top);
            };
            drag.onRelease = function() {
                resizer.isDragging = false;
                resizer.hidePreview();
                resizer.hide();
                resizer.editor.getSelection().unlock();
                // Save an undo snapshot before the image is permanently changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.onComplete = function() {
                resizer.resizeComplete();
                // Save another snapshot after the image is changed
                resizer.editor.fire('saveSnapshot');
            };
            drag.start(e);
        },
        updateHandles: function(box, left, top) {
            left = left || 0;
            top = top || 0;
            var handles = this.handles;
            positionElement(handles.tl, -3 + left, -3 + top);
            positionElement(handles.tm, Math.round(box.width / 2) - 3 + left, -3 + top);
            positionElement(handles.tr, box.width - 4 + left, -3 + top);
            positionElement(handles.lm, -3 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.rm, box.width - 4 + left, Math.round(box.height / 2) - 3 + top);
            positionElement(handles.bl, -3 + left, box.height - 4 + top);
            positionElement(handles.bm, Math.round(box.width / 2) - 3 + left, box.height - 4 + top);
            positionElement(handles.br, box.width - 4 + left, box.height - 4 + top);
        },
        showHandles: function() {
            var handles = this.handles;
            this.updateHandles(this.box);
            for (var n in handles) {
                handles[n].style.display = 'block';
            }
        },
        hideHandles: function() {
            var handles = this.handles;
            for (var n in handles) {
                handles[n].style.display = 'none';
            }
        },
        showPreview: function() {
            this.preview.style.backgroundImage = 'url("' + this.el.src + '")';
            this.calculateSize();
            this.updatePreview();
            this.preview.style.display = 'block';
        },
        updatePreview: function() {
            var box = this.previewBox;
            positionElement(this.preview, box.left, box.top);
            resizeElement(this.preview, box.width, box.height);
        },
        hidePreview: function() {
            var box = getBoundingBox(this.window, this.preview);
            this.result = {
                width: box.width,
                height: box.height
            };
            this.preview.style.display = 'none';
        },
        calculateSize: function(data) {
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
        resizeComplete: function() {
            resizeElement(this.el, this.result.width, this.result.height);
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
        start: function(e) {
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
        update: function(e) {
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
        mousemove: function(e) {
            this.update(e);
            this.onDrag && this.onDrag();
            if (e.which === 0) {
                //mouse button released outside window; mouseup wasn't fired (Chrome)
                this.mouseup(e);
            }
        },
        keydown: function(e) {
            //escape key cancels dragging
            if (e.keyCode === 27) {
                this.release();
            }
        },
        mouseup: function(e) {
            this.update(e);
            this.release();
            this.onComplete && this.onComplete();
        },
        release: function() {
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
        return function() {
            fn.apply(ctx, arguments);
        };
    }

    function positionElement(el, left, top) {
        el.style.left = String(left) + 'px';
        el.style.top = String(top) + 'px';
    }

    function resizeElement(el, width, height) {
        el.style.width = String(width) + 'px';
        el.style.height = String(height) + 'px';
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
}());

(function() {
    'use strict';

    var isIE = CKEDITOR.env.ie;

    if (CKEDITOR.plugins.get('dropimages')) {
        return;
    }

    /**
     * CKEditor plugin which allows Drag&Drop of images directly into the edit area. The image will be encoded
     * as Data URI.
     *
     * @class CKEDITOR.plugins.dropimages
     */
    CKEDITOR.plugins.add(
        'dropimages', {
            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'dragenter', 'dragover' and 'drop' events on the editing area.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                var editable;

                editable = editor.editable(editor.element.$);

                editable.attachListener(editable, 'dragenter', this._onDragEnter, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'dragover', this._onDragOver, this, {
                    editor: editor
                });

                editable.attachListener(editable, 'drop', this._onDragDrop, this, {
                    editor: editor
                });
            },

            /**
             * Accepts an array of dropped files to the editor. Then, it filters the images and sends them for further
             * processing to {{#crossLink "CKEDITOR.plugins.dropimages/_processFile:method"}}{{/crossLink}}
             *
             * @method _handleFiles
             * @protected
             * @param {Array} files Array of dropped files. Only the images from this list will be processed.
             * @param {Object} editor The current editor instance
             */
            _handleFiles: function(files, editor) {
                var i,
                    imageType,
                    file;

                for (i = 0; i < files.length; i++) {
                    file = files[i];
                    imageType = /image.*/;

                    if (file.type.match(imageType)) {
                        this._processFile(file, editor);
                    }
                }

                return false;
            },

            /**
             * Handles drag enter event. In case of IE, this function will prevent the event.
             *
             * @method _onDragEnter
             * @protected
             * @param {DOM event} event dragenter event, as received natively from CKEditor
             */
            _onDragEnter: function(event) {
                if (isIE) {
                    this._preventEvent(event);
                }
            },

            /**
             * Handles drag over event. In case of IE, this function will prevent the event.
             *
             * @method _onDragOver
             * @protected
             * @param {DOM event} event dragover event, as received natively from CKEditor
             */
            _onDragOver: function(event) {
                if (isIE) {
                    this._preventEvent(event);
                }
            },

            /**
             * Handles drag drop event. The function will create selection from the current points and
             * will send a list of files to be processed to
             * {{#crossLink "CKEDITOR.plugins.dropimages/_handleFiles:method"}}{{/crossLink}}
             *
             * @method _onDragDrop
             * @protected
             * @param {CKEDITOR.dom.event} event dragdrop event, as received natively from CKEditor
             */
            _onDragDrop: function(event) {
                var editor,
                    nativeEvent;

                nativeEvent = event.data.$;

                new CKEDITOR.dom.event(nativeEvent).preventDefault();

                editor = event.listenerData.editor;

                event.listenerData.editor.createSelectionFromPoint(nativeEvent.clientX, nativeEvent.clientY);

                this._handleFiles(nativeEvent.dataTransfer.files, editor);
            },

            /**
             * Prevents a native event.
             *
             * @method _preventEvent
             * @protected
             * @param {DOM event} event The event to be prevented.
             */
            _preventEvent: function(event) {
                event = new CKEDITOR.dom.event(event.data.$);

                event.preventDefault();
                event.stopPropagation();
            },

            /**
             * Processes an image file. The function creates an element and sets a source
             * a Data URI, then fires an event 'imagedrop' via CKEditor event system.
             *
             * @method _preventEvent
             * @protected
             * @param {DOM event} event The event to be prevented.
             */
            _processFile: function(file, editor) {
                var reader = new FileReader();

                reader.addEventListener('loadend', function() {
                    var bin,
                        el,
                        imageData;

                    bin = reader.result;

                    el = CKEDITOR.dom.element.createFromHtml('<img src="' + bin + '">');

                    editor.insertElement(el);

                    imageData = {
                        el: el,
                        file: file
                    };

                    editor.fire('imagedrop', imageData);
                });

                reader.readAsDataURL(file);
            }

            /**
             * Fired when an image is being added to the editor successfully.
             *
             * @event imagedrop
             * @param {CKEDITOR.dom.element} el The created image with src, created as Data URI
             */
        }
    );
}());
(function() {
    'use strict';

    if (CKEDITOR.plugins.get('placeholder')) {
        return;
    }

    /**
     * CKEditor plugin which allows adding a placeholder to the editor. In this case, if there
     * is no content to the editor, there will be hint to the user.
     *
     * @class CKEDITOR.plugins.placeholder
     */

    /**
     * Specifies the placeholder class which have to be aded to editor when editor is not focuced.
     *
     * @attribute placeholderClass
     * @default alloy-editor-placeholder
     * @type String
     */

    CKEDITOR.plugins.add(
        'placeholder', {

            /**
             * Initialization of the plugin, part of CKEditor plugin lifecycle.
             * The function registers a 'blur' listener to CKEditor's blur event.
             *
             * @method init
             * @param {Object} editor The current editor instance
             */
            init: function(editor) {
                editor.on('blur', this._onBlur, this);
            },

            /**
             * Handles the fired blur event. The function removes any data from CKEditor, because an
             * empty paragraph may still exist despite for the user the editor looks empty and
             * adds a class, specified via "placeholderClass" config attribute.
             *
             * @method init
             * @protected
             * @param {CKEDITOR.dom.event} editor Blur event, fired from CKEditor
             */
            _onBlur: function(event) {
                var editor,
                    editorNode;

                editor = event.editor;

                if (editor.getData() === '') {
                    editorNode = new CKEDITOR.dom.element(editor.element.$);

                    // Despite getData() returns empty string, the content still may have
                    // content - an empty paragrapgh. This prevents :empty selector in
                    // placeholder's CSS and placeholder does not appear.
                    // For that reason we will intentionally remove any content from editorNode.
                    editorNode.setHtml('');

                    editorNode.addClass(editor.config.placeholderClass);
                }
            }
        }
    );
}());
/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

(function() {
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
            cellsCount, $elected, $tr;

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
            rtl = (table.getComputedStyle('direction') === 'rtl');

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

            if (positionX >= pillar.x && positionX <= (pillar.x + pillar.width)) {
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
            setTimeout(function() {
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
                CKEDITOR.tools.setTimeout(function(leftCell, leftOldWidth, rightCell, rightOldWidth, tableWidth, sizeShift) {
                    // 1px is the minimum valid width (#11626).
                    leftCell && leftCell.setStyle('width', pxUnit(Math.max(leftOldWidth + sizeShift, 1)));
                    rightCell && rightCell.setStyle('width', pxUnit(Math.max(rightOldWidth - sizeShift, 1)));

                    // If we're in the last cell, we need to resize the table as well
                    if (tableWidth) {
                        table.setStyle('width', pxUnit(tableWidth + sizeShift * (rtl ? -1 : 1)));
                    }
                }, 0, this, [
                    leftCell, leftCell && getWidth(leftCell),
                    rightCell, rightCell && getWidth(rightCell), (!leftCell || !rightCell) && (getWidth(table) + getBorderWidth(table, 'left') + getBorderWidth(table, 'right')),
                    currentShift
                ]);
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

        resizer = CKEDITOR.dom.element.createFromHtml('<div data-cke-temp=1 contenteditable=false unselectable=on ' +
            'style="position:absolute;cursor:col-resize;filter:alpha(opacity=0);opacity:0;' +
            'padding:0;background-color:#004;background-image:none;border:0px none;z-index:10"></div>', document);

        // Clean DOM when editor is destroyed.
        editor.on('destroy', function() {
            resizer.remove();
        });

        // Place the resizer after body to prevent it
        // from being editable.
        document.getDocumentElement().append(resizer);

        this.attachTo = function(targetPillar) {
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

        var move = this.move = function(posX) {
            if (!pillar){
                return 0;
            }

            if (!isResizing && (posX < pillar.x || posX > (pillar.x + pillar.width))) {
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

    CKEDITOR.plugins.add('tableresize', {
        requires: 'tabletools',

        init: function(editor) {
            editor.on('contentDom', function() {
                var resizer,
                    editable = editor.editable();

                // In Classic editor it is better to use document
                // instead of editable so event will work below body.
                editable.attachListener(editable.isInline() ? editable : editor.document, 'mousemove', function(evt) {
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
                        table.setCustomData('_cke_table_pillars', (pillars = buildTableColumnPillars(table)));
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

/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

( function() {
	if (CKEDITOR.plugins.tabletools) return;

	var cellNodeRegex = /^(?:td|th)$/;

	function getSelectedCells( selection ) {
		var ranges = selection.getRanges();
		var retval = [];
		var database = {};

		function moveOutOfCellGuard( node ) {
			// Apply to the first cell only.
			if ( retval.length > 0 )
				return;

			// If we are exiting from the first </td>, then the td should definitely be
			// included.
			if ( node.type == CKEDITOR.NODE_ELEMENT && cellNodeRegex.test( node.getName() ) && !node.getCustomData( 'selected_cell' ) ) {
				CKEDITOR.dom.element.setMarker( database, node, 'selected_cell', true );
				retval.push( node );
			}
		}

		for ( var i = 0; i < ranges.length; i++ ) {
			var range = ranges[ i ];

			if ( range.collapsed ) {
				// Walker does not handle collapsed ranges yet - fall back to old API.
				var startNode = range.getCommonAncestor();
				var nearestCell = startNode.getAscendant( 'td', true ) || startNode.getAscendant( 'th', true );
				if ( nearestCell )
					retval.push( nearestCell );
			} else {
				var walker = new CKEDITOR.dom.walker( range );
				var node;
				walker.guard = moveOutOfCellGuard;

				while ( ( node = walker.next() ) ) {
					// If may be possible for us to have a range like this:
					// <td>^1</td><td>^2</td>
					// The 2nd td shouldn't be included.
					//
					// So we have to take care to include a td we've entered only when we've
					// walked into its children.

					if ( node.type != CKEDITOR.NODE_ELEMENT || !node.is( CKEDITOR.dtd.table ) ) {
						var parent = node.getAscendant( 'td', true ) || node.getAscendant( 'th', true );
						if ( parent && !parent.getCustomData( 'selected_cell' ) ) {
							CKEDITOR.dom.element.setMarker( database, parent, 'selected_cell', true );
							retval.push( parent );
						}
					}
				}
			}
		}

		CKEDITOR.dom.element.clearAllMarkers( database );

		return retval;
	}

	function getFocusElementAfterDelCells( cellsToDelete ) {
		var i = 0,
			last = cellsToDelete.length - 1,
			database = {},
			cell, focusedCell, tr;

		while ( ( cell = cellsToDelete[ i++ ] ) )
			CKEDITOR.dom.element.setMarker( database, cell, 'delete_cell', true );

		// 1.first we check left or right side focusable cell row by row;
		i = 0;
		while ( ( cell = cellsToDelete[ i++ ] ) ) {
			if ( ( focusedCell = cell.getPrevious() ) && !focusedCell.getCustomData( 'delete_cell' ) || ( focusedCell = cell.getNext() ) && !focusedCell.getCustomData( 'delete_cell' ) ) {
				CKEDITOR.dom.element.clearAllMarkers( database );
				return focusedCell;
			}
		}

		CKEDITOR.dom.element.clearAllMarkers( database );

		// 2. then we check the toppest row (outside the selection area square) focusable cell
		tr = cellsToDelete[ 0 ].getParent();
		if ( ( tr = tr.getPrevious() ) )
			return tr.getLast();

		// 3. last we check the lowerest  row focusable cell
		tr = cellsToDelete[ last ].getParent();
		if ( ( tr = tr.getNext() ) )
			return tr.getChild( 0 );

		return null;
	}

	function insertRow( selection, insertBefore ) {
		var cells = getSelectedCells( selection ),
			firstCell = cells[ 0 ],
			table = firstCell.getAscendant( 'table' ),
			doc = firstCell.getDocument(),
			startRow = cells[ 0 ].getParent(),
			startRowIndex = startRow.$.rowIndex,
			lastCell = cells[ cells.length - 1 ],
			endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
			endRow = new CKEDITOR.dom.element( table.$.rows[ endRowIndex ] ),
			rowIndex = insertBefore ? startRowIndex : endRowIndex,
			row = insertBefore ? startRow : endRow;

		var map = CKEDITOR.tools.buildTableMap( table ),
			cloneRow = map[ rowIndex ],
			nextRow = insertBefore ? map[ rowIndex - 1 ] : map[ rowIndex + 1 ],
			width = map[ 0 ].length;

		var newRow = doc.createElement( 'tr' );
		for ( var i = 0; cloneRow[ i ] && i < width; i++ ) {
			var cell;
			// Check whether there's a spanning row here, do not break it.
			if ( cloneRow[ i ].rowSpan > 1 && nextRow && cloneRow[ i ] == nextRow[ i ] ) {
				cell = cloneRow[ i ];
				cell.rowSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element( cloneRow[ i ] ).clone();
				cell.removeAttribute( 'rowSpan' );
				cell.appendBogus();
				newRow.append( cell );
				cell = cell.$;
			}

			i += cell.colSpan - 1;
		}

		insertBefore ? newRow.insertBefore( row ) : newRow.insertAfter( row );
	}

	function deleteRows( selectionOrRow ) {
		if ( selectionOrRow instanceof CKEDITOR.dom.selection ) {
			var cells = getSelectedCells( selectionOrRow ),
				firstCell = cells[ 0 ],
				table = firstCell.getAscendant( 'table' ),
				map = CKEDITOR.tools.buildTableMap( table ),
				startRow = cells[ 0 ].getParent(),
				startRowIndex = startRow.$.rowIndex,
				lastCell = cells[ cells.length - 1 ],
				endRowIndex = lastCell.getParent().$.rowIndex + lastCell.$.rowSpan - 1,
				rowsToDelete = [];

			// Delete cell or reduce cell spans by checking through the table map.
			for ( var i = startRowIndex; i <= endRowIndex; i++ ) {
				var mapRow = map[ i ],
					row = new CKEDITOR.dom.element( table.$.rows[ i ] );

				for ( var j = 0; j < mapRow.length; j++ ) {
					var cell = new CKEDITOR.dom.element( mapRow[ j ] ),
						cellRowIndex = cell.getParent().$.rowIndex;

					if ( cell.$.rowSpan == 1 )
						cell.remove();
					// Row spanned cell.
					else {
						// Span row of the cell, reduce spanning.
						cell.$.rowSpan -= 1;
						// Root row of the cell, root cell to next row.
						if ( cellRowIndex == i ) {
							var nextMapRow = map[ i + 1 ];
							nextMapRow[ j - 1 ] ? cell.insertAfter( new CKEDITOR.dom.element( nextMapRow[ j - 1 ] ) ) : new CKEDITOR.dom.element( table.$.rows[ i + 1 ] ).append( cell, 1 );
						}
					}

					j += cell.$.colSpan - 1;
				}

				rowsToDelete.push( row );
			}

			var rows = table.$.rows;

			// Where to put the cursor after rows been deleted?
			// 1. Into next sibling row if any;
			// 2. Into previous sibling row if any;
			// 3. Into table's parent element if it's the very last row.
			var cursorPosition = new CKEDITOR.dom.element( rows[ endRowIndex + 1 ] || ( startRowIndex > 0 ? rows[ startRowIndex - 1 ] : null ) || table.$.parentNode );

			for ( i = rowsToDelete.length; i >= 0; i-- )
				deleteRows( rowsToDelete[ i ] );

			return cursorPosition;
		} else if ( selectionOrRow instanceof CKEDITOR.dom.element ) {
			table = selectionOrRow.getAscendant( 'table' );

			if ( table.$.rows.length == 1 )
				table.remove();
			else
				selectionOrRow.remove();
		}

		return null;
	}

	function getCellColIndex( cell, isStart ) {
		var row = cell.getParent(),
			rowCells = row.$.cells;

		var colIndex = 0;
		for ( var i = 0; i < rowCells.length; i++ ) {
			var mapCell = rowCells[ i ];
			colIndex += isStart ? 1 : mapCell.colSpan;
			if ( mapCell == cell.$ )
				break;
		}

		return colIndex - 1;
	}

	function getColumnsIndices( cells, isStart ) {
		var retval = isStart ? Infinity : 0;
		for ( var i = 0; i < cells.length; i++ ) {
			var colIndex = getCellColIndex( cells[ i ], isStart );
			if ( isStart ? colIndex < retval : colIndex > retval )
				retval = colIndex;
		}
		return retval;
	}

	function insertColumn( selection, insertBefore ) {
		var cells = getSelectedCells( selection ),
			firstCell = cells[ 0 ],
			table = firstCell.getAscendant( 'table' ),
			startCol = getColumnsIndices( cells, 1 ),
			lastCol = getColumnsIndices( cells ),
			colIndex = insertBefore ? startCol : lastCol;

		var map = CKEDITOR.tools.buildTableMap( table ),
			cloneCol = [],
			nextCol = [],
			height = map.length;

		for ( var i = 0; i < height; i++ ) {
			cloneCol.push( map[ i ][ colIndex ] );
			var nextCell = insertBefore ? map[ i ][ colIndex - 1 ] : map[ i ][ colIndex + 1 ];
			nextCol.push( nextCell );
		}

		for ( i = 0; i < height; i++ ) {
			var cell;

			if ( !cloneCol[ i ] )
				continue;

			// Check whether there's a spanning column here, do not break it.
			if ( cloneCol[ i ].colSpan > 1 && nextCol[ i ] == cloneCol[ i ] ) {
				cell = cloneCol[ i ];
				cell.colSpan += 1;
			} else {
				cell = new CKEDITOR.dom.element( cloneCol[ i ] ).clone();
				cell.removeAttribute( 'colSpan' );
				cell.appendBogus();
				cell[ insertBefore ? 'insertBefore' : 'insertAfter' ].call( cell, new CKEDITOR.dom.element( cloneCol[ i ] ) );
				cell = cell.$;
			}

			i += cell.rowSpan - 1;
		}
	}

	function deleteColumns( selectionOrCell ) {
		var cells = getSelectedCells( selectionOrCell ),
			firstCell = cells[ 0 ],
			lastCell = cells[ cells.length - 1 ],
			table = firstCell.getAscendant( 'table' ),
			map = CKEDITOR.tools.buildTableMap( table ),
			startColIndex, endColIndex,
			rowsToDelete = [];

		// Figure out selected cells' column indices.
		for ( var i = 0, rows = map.length; i < rows; i++ ) {
			for ( var j = 0, cols = map[ i ].length; j < cols; j++ ) {
				if ( map[ i ][ j ] == firstCell.$ )
					startColIndex = j;
				if ( map[ i ][ j ] == lastCell.$ )
					endColIndex = j;
			}
		}

		// Delete cell or reduce cell spans by checking through the table map.
		for ( i = startColIndex; i <= endColIndex; i++ ) {
			for ( j = 0; j < map.length; j++ ) {
				var mapRow = map[ j ],
					row = new CKEDITOR.dom.element( table.$.rows[ j ] ),
					cell = new CKEDITOR.dom.element( mapRow[ i ] );

				if ( cell.$ ) {
					if ( cell.$.colSpan == 1 )
						cell.remove();
					// Reduce the col spans.
					else
						cell.$.colSpan -= 1;

					j += cell.$.rowSpan - 1;

					if ( !row.$.cells.length )
						rowsToDelete.push( row );
				}
			}
		}

		var firstRowCells = table.$.rows[ 0 ] && table.$.rows[ 0 ].cells;

		// Where to put the cursor after columns been deleted?
		// 1. Into next cell of the first row if any;
		// 2. Into previous cell of the first row if any;
		// 3. Into table's parent element;
		var cursorPosition = new CKEDITOR.dom.element( firstRowCells[ startColIndex ] || ( startColIndex ? firstRowCells[ startColIndex - 1 ] : table.$.parentNode ) );

		// Delete table rows only if all columns are gone (do not remove empty row).
		if ( rowsToDelete.length == rows )
			table.remove();

		return cursorPosition;
	}

	function insertCell( selection, insertBefore ) {
		var startElement = selection.getStartElement();
		var cell = startElement.getAscendant( 'td', 1 ) || startElement.getAscendant( 'th', 1 );

		if ( !cell )
			return;

		// Create the new cell element to be added.
		var newCell = cell.clone();
		newCell.appendBogus();

		if ( insertBefore )
			newCell.insertBefore( cell );
		else
			newCell.insertAfter( cell );
	}

	function deleteCells( selectionOrCell ) {
		if ( selectionOrCell instanceof CKEDITOR.dom.selection ) {
			var cellsToDelete = getSelectedCells( selectionOrCell );
			var table = cellsToDelete[ 0 ] && cellsToDelete[ 0 ].getAscendant( 'table' );
			var cellToFocus = getFocusElementAfterDelCells( cellsToDelete );

			for ( var i = cellsToDelete.length - 1; i >= 0; i-- )
				deleteCells( cellsToDelete[ i ] );

			if ( cellToFocus )
				placeCursorInCell( cellToFocus, true );
			else if ( table )
				table.remove();
		} else if ( selectionOrCell instanceof CKEDITOR.dom.element ) {
			var tr = selectionOrCell.getParent();
			if ( tr.getChildCount() == 1 )
				tr.remove();
			else
				selectionOrCell.remove();
		}
	}

	// Remove filler at end and empty spaces around the cell content.
	function trimCell( cell ) {
		var bogus = cell.getBogus();
		bogus && bogus.remove();
		cell.trim();
	}

	function placeCursorInCell( cell, placeAtEnd ) {
		var docInner = cell.getDocument(),
			docOuter = CKEDITOR.document;

		// Fixing "Unspecified error" thrown in IE10 by resetting
		// selection the dirty and shameful way (#10308).
		// We can not apply this hack to IE8 because
		// it causes error (#11058).
		if ( CKEDITOR.env.ie && CKEDITOR.env.version == 10 ) {
			docOuter.focus();
			docInner.focus();
		}

		var range = new CKEDITOR.dom.range( docInner );
		if ( !range[ 'moveToElementEdit' + ( placeAtEnd ? 'End' : 'Start' ) ]( cell ) ) {
			range.selectNodeContents( cell );
			range.collapse( placeAtEnd ? false : true );
		}
		range.select( true );
	}

	function cellInRow( tableMap, rowIndex, cell ) {
		var oRow = tableMap[ rowIndex ];
		if ( typeof cell == 'undefined' )
			return oRow;

		for ( var c = 0; oRow && c < oRow.length; c++ ) {
			if ( cell.is && oRow[ c ] == cell.$ )
				return c;
			else if ( c == cell )
				return new CKEDITOR.dom.element( oRow[ c ] );
		}
		return cell.is ? -1 : null;
	}

	function cellInCol( tableMap, colIndex ) {
		var oCol = [];
		for ( var r = 0; r < tableMap.length; r++ ) {
			var row = tableMap[ r ];
			oCol.push( row[ colIndex ] );

			// Avoid adding duplicate cells.
			if ( row[ colIndex ].rowSpan > 1 )
				r += row[ colIndex ].rowSpan - 1;
		}
		return oCol;
	}

	function mergeCells( selection, mergeDirection, isDetect ) {
		var cells = getSelectedCells( selection );

		// Invalid merge request if:
		// 1. In batch mode despite that less than two selected.
		// 2. In solo mode while not exactly only one selected.
		// 3. Cells distributed in different table groups (e.g. from both thead and tbody).
		var commonAncestor;
		if ( ( mergeDirection ? cells.length != 1 : cells.length < 2 ) || ( commonAncestor = selection.getCommonAncestor() ) && commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is( 'table' ) )
			return false;

		var cell,
			firstCell = cells[ 0 ],
			table = firstCell.getAscendant( 'table' ),
			map = CKEDITOR.tools.buildTableMap( table ),
			mapHeight = map.length,
			mapWidth = map[ 0 ].length,
			startRow = firstCell.getParent().$.rowIndex,
			startColumn = cellInRow( map, startRow, firstCell );

		if ( mergeDirection ) {
			var targetCell;
			try {
				var rowspan = parseInt( firstCell.getAttribute( 'rowspan' ), 10 ) || 1;
				var colspan = parseInt( firstCell.getAttribute( 'colspan' ), 10 ) || 1;

				targetCell = map[ mergeDirection == 'up' ? ( startRow - rowspan ) : mergeDirection == 'down' ? ( startRow + rowspan ) : startRow ][
					mergeDirection == 'left' ?
						( startColumn - colspan ) :
					mergeDirection == 'right' ? ( startColumn + colspan ) : startColumn ];

			} catch ( er ) {
				return false;
			}

			// 1. No cell could be merged.
			// 2. Same cell actually.
			if ( !targetCell || firstCell.$ == targetCell )
				return false;

			// Sort in map order regardless of the DOM sequence.
			cells[ ( mergeDirection == 'up' || mergeDirection == 'left' ) ? 'unshift' : 'push' ]( new CKEDITOR.dom.element( targetCell ) );
		}

		// Start from here are merging way ignorance (merge up/right, batch merge).
		var doc = firstCell.getDocument(),
			lastRowIndex = startRow,
			totalRowSpan = 0,
			totalColSpan = 0,
			// Use a documentFragment as buffer when appending cell contents.
			frag = !isDetect && new CKEDITOR.dom.documentFragment( doc ),
			dimension = 0;

		for ( var i = 0; i < cells.length; i++ ) {
			cell = cells[ i ];

			var tr = cell.getParent(),
				cellFirstChild = cell.getFirst(),
				colSpan = cell.$.colSpan,
				rowSpan = cell.$.rowSpan,
				rowIndex = tr.$.rowIndex,
				colIndex = cellInRow( map, rowIndex, cell );

			// Accumulated the actual places taken by all selected cells.
			dimension += colSpan * rowSpan;
			// Accumulated the maximum virtual spans from column and row.
			totalColSpan = Math.max( totalColSpan, colIndex - startColumn + colSpan );
			totalRowSpan = Math.max( totalRowSpan, rowIndex - startRow + rowSpan );

			if ( !isDetect ) {
				// Trim all cell fillers and check to remove empty cells.
				if ( trimCell( cell ), cell.getChildren().count() ) {
					// Merge vertically cells as two separated paragraphs.
					if ( rowIndex != lastRowIndex && cellFirstChild && !( cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary( { br: 1 } ) ) ) {
						var last = frag.getLast( CKEDITOR.dom.walker.whitespaces( true ) );
						if ( last && !( last.is && last.is( 'br' ) ) )
							frag.append( 'br' );
					}

					cell.moveChildren( frag );
				}
				i ? cell.remove() : cell.setHtml( '' );
			}
			lastRowIndex = rowIndex;
		}

		if ( !isDetect ) {
			frag.moveChildren( firstCell );

			firstCell.appendBogus();

			if ( totalColSpan >= mapWidth )
				firstCell.removeAttribute( 'rowSpan' );
			else
				firstCell.$.rowSpan = totalRowSpan;

			if ( totalRowSpan >= mapHeight )
				firstCell.removeAttribute( 'colSpan' );
			else
				firstCell.$.colSpan = totalColSpan;

			// Swip empty <tr> left at the end of table due to the merging.
			var trs = new CKEDITOR.dom.nodeList( table.$.rows ),
				count = trs.count();

			for ( i = count - 1; i >= 0; i-- ) {
				var tailTr = trs.getItem( i );
				if ( !tailTr.$.cells.length ) {
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
			return ( totalRowSpan * totalColSpan ) == dimension;
		}
	}

	function verticalSplitCell( selection, isDetect ) {
		var cells = getSelectedCells( selection );
		if ( cells.length > 1 )
			return false;
		else if ( isDetect )
			return true;

		var cell = cells[ 0 ],
			tr = cell.getParent(),
			table = tr.getAscendant( 'table' ),
			map = CKEDITOR.tools.buildTableMap( table ),
			rowIndex = tr.$.rowIndex,
			colIndex = cellInRow( map, rowIndex, cell ),
			rowSpan = cell.$.rowSpan,
			newCell, newRowSpan, newCellRowSpan, newRowIndex;

		if ( rowSpan > 1 ) {
			newRowSpan = Math.ceil( rowSpan / 2 );
			newCellRowSpan = Math.floor( rowSpan / 2 );
			newRowIndex = rowIndex + newRowSpan;
			var newCellTr = new CKEDITOR.dom.element( table.$.rows[ newRowIndex ] ),
				newCellRow = cellInRow( map, newRowIndex ),
				candidateCell;

			newCell = cell.clone();

			// Figure out where to insert the new cell by checking the vitual row.
			for ( var c = 0; c < newCellRow.length; c++ ) {
				candidateCell = newCellRow[ c ];
				// Catch first cell actually following the column.
				if ( candidateCell.parentNode == newCellTr.$ && c > colIndex ) {
					newCell.insertBefore( new CKEDITOR.dom.element( candidateCell ) );
					break;
				} else {
					candidateCell = null;
				}
			}

			// The destination row is empty, append at will.
			if ( !candidateCell )
				newCellTr.append( newCell );
		} else {
			newCellRowSpan = newRowSpan = 1;

			newCellTr = tr.clone();
			newCellTr.insertAfter( tr );
			newCellTr.append( newCell = cell.clone() );

			var cellsInSameRow = cellInRow( map, rowIndex );
			for ( var i = 0; i < cellsInSameRow.length; i++ )
				cellsInSameRow[ i ].rowSpan++;
		}

		newCell.appendBogus();

		cell.$.rowSpan = newRowSpan;
		newCell.$.rowSpan = newCellRowSpan;
		if ( newRowSpan == 1 )
			cell.removeAttribute( 'rowSpan' );
		if ( newCellRowSpan == 1 )
			newCell.removeAttribute( 'rowSpan' );

		return newCell;
	}

	function horizontalSplitCell( selection, isDetect ) {
		var cells = getSelectedCells( selection );
		if ( cells.length > 1 )
			return false;
		else if ( isDetect )
			return true;

		var cell = cells[ 0 ],
			tr = cell.getParent(),
			table = tr.getAscendant( 'table' ),
			map = CKEDITOR.tools.buildTableMap( table ),
			rowIndex = tr.$.rowIndex,
			colIndex = cellInRow( map, rowIndex, cell ),
			colSpan = cell.$.colSpan,
			newCell, newColSpan, newCellColSpan;

		if ( colSpan > 1 ) {
			newColSpan = Math.ceil( colSpan / 2 );
			newCellColSpan = Math.floor( colSpan / 2 );
		} else {
			newCellColSpan = newColSpan = 1;
			var cellsInSameCol = cellInCol( map, colIndex );
			for ( var i = 0; i < cellsInSameCol.length; i++ )
				cellsInSameCol[ i ].colSpan++;
		}
		newCell = cell.clone();
		newCell.insertAfter( cell );
		newCell.appendBogus();

		cell.$.colSpan = newColSpan;
		newCell.$.colSpan = newCellColSpan;
		if ( newColSpan == 1 )
			cell.removeAttribute( 'colSpan' );
		if ( newCellColSpan == 1 )
			newCell.removeAttribute( 'colSpan' );

		return newCell;
	}

	CKEDITOR.plugins.tabletools = {
		init: function( editor ) {
			var lang = editor.lang.table;

			function createDef( def ) {
				return CKEDITOR.tools.extend( def || {}, {
					contextSensitive: 1,
					refresh: function( editor, path ) {
						this.setState( path.contains( { td: 1, th: 1 }, 1 ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
					}
				} );
			}
			function addCmd( name, def ) {
				var cmd = editor.addCommand( name, def );
				editor.addFeature( cmd );
			}

			addCmd( 'cellProperties', new CKEDITOR.dialogCommand( 'cellProperties', createDef( {
				allowedContent: 'td th{width,height,border-color,background-color,white-space,vertical-align,text-align}[colspan,rowspan]',
				requiredContent: 'table'
			} ) ) );
			CKEDITOR.dialog.add( 'cellProperties', this.path + 'dialogs/tableCell.js' );

			addCmd( 'rowDelete', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					placeCursorInCell( deleteRows( selection ) );
				}
			} ) );

			addCmd( 'rowInsertBefore', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertRow( selection, true );
				}
			} ) );

			addCmd( 'rowInsertAfter', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertRow( selection );
				}
			} ) );

			addCmd( 'columnDelete', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					var element = deleteColumns( selection );
					element && placeCursorInCell( element, true );
				}
			} ) );

			addCmd( 'columnInsertBefore', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertColumn( selection, true );
				}
			} ) );

			addCmd( 'columnInsertAfter', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertColumn( selection );
				}
			} ) );

			addCmd( 'cellDelete', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					deleteCells( selection );
				}
			} ) );

			addCmd( 'cellMerge', createDef( {
				allowedContent: 'td[colspan,rowspan]',
				requiredContent: 'td[colspan,rowspan]',
				exec: function( editor ) {
					placeCursorInCell( mergeCells( editor.getSelection() ), true );
				}
			} ) );

			addCmd( 'cellMergeRight', createDef( {
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function( editor ) {
					placeCursorInCell( mergeCells( editor.getSelection(), 'right' ), true );
				}
			} ) );

			addCmd( 'cellMergeDown', createDef( {
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function( editor ) {
					placeCursorInCell( mergeCells( editor.getSelection(), 'down' ), true );
				}
			} ) );

			addCmd( 'cellVerticalSplit', createDef( {
				allowedContent: 'td[rowspan]',
				requiredContent: 'td[rowspan]',
				exec: function( editor ) {
					placeCursorInCell( verticalSplitCell( editor.getSelection() ) );
				}
			} ) );

			addCmd( 'cellHorizontalSplit', createDef( {
				allowedContent: 'td[colspan]',
				requiredContent: 'td[colspan]',
				exec: function( editor ) {
					placeCursorInCell( horizontalSplitCell( editor.getSelection() ) );
				}
			} ) );

			addCmd( 'cellInsertBefore', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertCell( selection, true );
				}
			} ) );

			addCmd( 'cellInsertAfter', createDef( {
				requiredContent: 'table',
				exec: function( editor ) {
					var selection = editor.getSelection();
					insertCell( selection );
				}
			} ) );

			// If the "menu" plugin is loaded, register the menu items.
			if ( editor.addMenuItems ) {
				editor.addMenuItems( {
					tablecell: {
						label: lang.cell.menu,
						group: 'tablecell',
						order: 1,
						getItems: function() {
							var selection = editor.getSelection(),
								cells = getSelectedCells( selection );
							return {
								tablecell_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablecell_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablecell_delete: CKEDITOR.TRISTATE_OFF,
								tablecell_merge: mergeCells( selection, null, true ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_merge_right: mergeCells( selection, 'right', true ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_merge_down: mergeCells( selection, 'down', true ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_split_vertical: verticalSplitCell( selection, true ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_split_horizontal: horizontalSplitCell( selection, true ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED,
								tablecell_properties: cells.length > 0 ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED
							};
						}
					},

					tablecell_insertBefore: {
						label: lang.cell.insertBefore,
						group: 'tablecell',
						command: 'cellInsertBefore',
						order: 5
					},

					tablecell_insertAfter: {
						label: lang.cell.insertAfter,
						group: 'tablecell',
						command: 'cellInsertAfter',
						order: 10
					},

					tablecell_delete: {
						label: lang.cell.deleteCell,
						group: 'tablecell',
						command: 'cellDelete',
						order: 15
					},

					tablecell_merge: {
						label: lang.cell.merge,
						group: 'tablecell',
						command: 'cellMerge',
						order: 16
					},

					tablecell_merge_right: {
						label: lang.cell.mergeRight,
						group: 'tablecell',
						command: 'cellMergeRight',
						order: 17
					},

					tablecell_merge_down: {
						label: lang.cell.mergeDown,
						group: 'tablecell',
						command: 'cellMergeDown',
						order: 18
					},

					tablecell_split_horizontal: {
						label: lang.cell.splitHorizontal,
						group: 'tablecell',
						command: 'cellHorizontalSplit',
						order: 19
					},

					tablecell_split_vertical: {
						label: lang.cell.splitVertical,
						group: 'tablecell',
						command: 'cellVerticalSplit',
						order: 20
					},

					tablecell_properties: {
						label: lang.cell.title,
						group: 'tablecellproperties',
						command: 'cellProperties',
						order: 21
					},

					tablerow: {
						label: lang.row.menu,
						group: 'tablerow',
						order: 1,
						getItems: function() {
							return {
								tablerow_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablerow_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablerow_delete: CKEDITOR.TRISTATE_OFF
							};
						}
					},

					tablerow_insertBefore: {
						label: lang.row.insertBefore,
						group: 'tablerow',
						command: 'rowInsertBefore',
						order: 5
					},

					tablerow_insertAfter: {
						label: lang.row.insertAfter,
						group: 'tablerow',
						command: 'rowInsertAfter',
						order: 10
					},

					tablerow_delete: {
						label: lang.row.deleteRow,
						group: 'tablerow',
						command: 'rowDelete',
						order: 15
					},

					tablecolumn: {
						label: lang.column.menu,
						group: 'tablecolumn',
						order: 1,
						getItems: function() {
							return {
								tablecolumn_insertBefore: CKEDITOR.TRISTATE_OFF,
								tablecolumn_insertAfter: CKEDITOR.TRISTATE_OFF,
								tablecolumn_delete: CKEDITOR.TRISTATE_OFF
							};
						}
					},

					tablecolumn_insertBefore: {
						label: lang.column.insertBefore,
						group: 'tablecolumn',
						command: 'columnInsertBefore',
						order: 5
					},

					tablecolumn_insertAfter: {
						label: lang.column.insertAfter,
						group: 'tablecolumn',
						command: 'columnInsertAfter',
						order: 10
					},

					tablecolumn_delete: {
						label: lang.column.deleteColumn,
						group: 'tablecolumn',
						command: 'columnDelete',
						order: 15
					}
				} );
			}

			// If the "contextmenu" plugin is laoded, register the listeners.
			if ( editor.contextMenu ) {
				editor.contextMenu.addListener( function( element, selection, path ) {
					var cell = path.contains( { 'td': 1, 'th': 1 }, 1 );
					if ( cell && !cell.isReadOnly() ) {
						return {
							tablecell: CKEDITOR.TRISTATE_OFF,
							tablerow: CKEDITOR.TRISTATE_OFF,
							tablecolumn: CKEDITOR.TRISTATE_OFF
						};
					}

					return null;
				} );
			}
		},

		getSelectedCells: getSelectedCells

	};
	CKEDITOR.plugins.add( 'tabletools', CKEDITOR.plugins.tabletools );
} )();

/**
 * Create a two-dimension array that reflects the actual layout of table cells,
 * with cell spans, with mappings to the original td elements.
 *
 * @param {CKEDITOR.dom.element} table
 * @member CKEDITOR.tools
 */
CKEDITOR.tools.buildTableMap = function( table ) {
	var aRows = table.$.rows;

	// Row and Column counters.
	var r = -1;

	var aMap = [];

	for ( var i = 0; i < aRows.length; i++ ) {
		r++;
		!aMap[ r ] && ( aMap[ r ] = [] );

		var c = -1;

		for ( var j = 0; j < aRows[ i ].cells.length; j++ ) {
			var oCell = aRows[ i ].cells[ j ];

			c++;
			while ( aMap[ r ][ c ] )
				c++;

			var iColSpan = isNaN( oCell.colSpan ) ? 1 : oCell.colSpan;
			var iRowSpan = isNaN( oCell.rowSpan ) ? 1 : oCell.rowSpan;

			for ( var rs = 0; rs < iRowSpan; rs++ ) {
				if ( !aMap[ r + rs ] )
					aMap[ r + rs ] = [];

				for ( var cs = 0; cs < iColSpan; cs++ ) {
					aMap[ r + rs ][ c + cs ] = aRows[ i ].cells[ j ];
				}
			}

			c += iColSpan - 1;
		}
	}
	return aMap;
};

(function() {
    'use strict';

    window.AlloyEditor = {
        editable: function(node, config) {
            config = config || {};

            config.srcNode = node;

            return new AlloyEditor.Core(config);
        },

        Buttons: {},

        Toolbars: {}
    };
}());
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
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an array, false otherwise.
         */
        isArray: function(value) {
            return Object.prototype.toString.call(value) === '[object Array]';
        },

        /**
         * Check if the passed value is boolean.
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is boolean, false otherwise.
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        /**
         * Check if the passed value is a function.
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a function, false otherwise.
         */
        isFunction: function(value) {
            return typeof(value) === 'function';
        },

        /**
         * Check if the passed value is NULL.
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is NULL, false otherwise.
         */
        isNull: function(value) {
            return value === null;
        },

        /**
         * Check if the passed value is number.
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is number, false otherwise.
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Check if the passed value is an object
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is an object, false otherwise.
         */
        isObject: function(value) {
            var valueType = typeof value;

            return (value && (valueType === 'object' || Lang.isFunction(value)));
        },

        /**
         * Check if the passed value is a string.
         *
         * @param {Any} value The value which have to be checked.
         * @return {Boolean} True if the passed value is a string, false otherwise.
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Adds all properties from the supplier to the receiver.
         * The function will add all properties, not only these owned by the supplier.
         *
         * @param {Object} receiver The object which will receive properties.
         * @param {Object} supplier The object which provides properties.
         * @return {Object} The modified receiver.
         */
        mix: function(receiver, supplier) {
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
         * @param {Any} value The value which have to be converted to Integer.
         * @return {Integer} The converted value.
         */
        toInt: function(value) {
            return parseInt(value, 10);
        }
    };

    AlloyEditor.Lang = Lang;
}());

(function () {
    'use strict';

    var OOP = {
        /**
         * Sets the prototype, constructor and superclass properties to support an inheritance strategy
         * that can chain constructors and methods. Static members will not be inherited.
         *
         * @param {Function} receiver The class which will extend another class.
         * @param {Function} supplier The class which will provide the properties the child class.
         * @param {Object} protoProps Prototype properties to add/override.
         * @param {Object} staticProps Static properties to add/overwrite.
         * @return {Function} The extended class.
         */
        extend: function(receiver, supplier, protoProps, staticProps) {
            if (!supplier || !receiver) {
                throw 'extend failed, verify dependencies';
            }

            var supplierProto = supplier.prototype, receiverProto = Object.create(supplierProto);
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
}());
(function() {
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
         * @param {String} attr The attribute which value should be retrieved.
         * @return {Any} The value of the attribute.
         */
        get: function(attr) {
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
         * @param {String} attr The attribute which value should be set.
         * @param {Any} value The value which should be set to the attribute.
         */
        set: function(attr, value) {
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
         * @param  {String|Function} stringOrFunction The function which should be called
         * @param  {Any|Array} args The arguments which will be provided to the called function
         * @return {Any} The returned value from the called function
         */
        _callStringOrFunction: function(stringOrFunction, args) {
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
         * @param {String} attr The name of the attribute which have to be initialized.
         */
        _init: function(attr) {
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
                if (hasDefaultValue) {
                    value = currentAttr.value;
                } else if (hasPassedValueViaConfig) {
                    value = this.__config__[attr];
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
         * @param {String} attr The attribute which should be checked if it is initialized.
         * @return {Boolean} Returns true if the attribute has been initialized, false otherwise.
         */
        _isInitialized: function(attr) {
            return Object.prototype.hasOwnProperty.call(this.__ATTRS__, attr);
        }
    };

    AlloyEditor.Attribute = Attribute;
}());
(function() {
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
         * @param {Object} config Configuration object
         */
        init: function(config) {
            this._callChain('initializer', config);
        },

        /**
         * Calls the `destructor` method of each class which extends Base starting from the parent to the child.
         * @return {[type]} [description]
         */
        destroy: function() {
            this._callChain('destructor');
        },

        /**
         * Calls a method of each class, which is being present in the hierarchy starting from parent to the child.
         *
         * @protected
         * @param {String} wat  The method, which should be invoked
         * @param {Object|Array} args The arguments with which the method should be invoked
         */
        _callChain: function(wat, args) {
            var arr = [];

            var ctor = this.constructor;

            while(ctor) {
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
}());

(function() {
    'use strict';

    var Selections = [{
        name: 'link',
        buttons: ['linkEdit'],
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            return !nativeEditor.isSelectionEmpty() && (new CKEDITOR.Link(nativeEditor).getFromSelection());
        }
    }, {
        name: 'image',
        buttons: ['imageLeft', 'imageRight'],
        test: function(payload) {
            var selectionData = payload.data.selectionData;

            return (selectionData.element && selectionData.element.getName() === 'img');
        }
    }, {
        name: 'text',
        buttons: ['styles', 'bold', 'italic', 'underline', 'link', 'twitter'],
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            var selectionEmpty = nativeEditor.isSelectionEmpty();

            var selectionData = payload.data.selectionData;

            return (!selectionData.element && selectionData.region && !selectionEmpty);
        }
    }, {
        name: 'table',
        buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableRemove'],
        getArrowBoxClasses: function() {
            return 'alloy-editor-arrow-box alloy-editor-arrow-box-bottom';
        },
        setPosition: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            var table = new CKEDITOR.Table(nativeEditor).getFromSelection();
            var clientRect = table.getClientRect();

            var toolbarNode = this.getDOMNode();
            var halfToolbarWidth = toolbarNode.offsetWidth/2;
            var scrollPos = new CKEDITOR.dom.window(window).getScrollPosition();

            var widgetXY = this.getWidgetXYPoint(clientRect.left + clientRect.width/2 - scrollPos.x, clientRect.top + scrollPos.y, CKEDITOR.SELECTION_BOTTOM_TO_TOP);

            this.moveToPoint([
                widgetXY[0],
                widgetXY[1]
            ], [
                clientRect.left + clientRect.width/2 - halfToolbarWidth - scrollPos.x,
                clientRect.top - toolbarNode.offsetHeight + scrollPos.y
            ]);

            return true;
        },
        test: function(payload) {
            var nativeEditor = payload.editor.get('nativeEditor');

            return !!(new CKEDITOR.Table(nativeEditor).getFromSelection());
        }
    }];

    AlloyEditor.Selections = Selections;
}());

(function () {
    'use strict';

    /**
     * ButtonActionStyle is a mixin that provides applying style implementation for a
     * button based on the `applyStyle` and `removeStyle` API of CKEDITOR.
     *
     * To execute properly, the component has to expose the following methods which can be obtained
     * out of the box using the ButtonStyle mixin:
     * - isActive: to check the active state
     * - getStyle: to return the style that should be applied
     *
     * The mixin exposes:
     * - {Function} applyStyle: the function to attached to the button
     *
     * @class ButtonActionStyle
     */
    var ButtonActionStyle = {
        /**
         * Removes or applies style to a selection.
         */
        applyStyle: function() {
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
}());
(function () {
    'use strict';

    /**
     * ButtonCommand is a mixin that executes a command via CKEDITOR's API.
     *
     * The mixin exposes:
     * - {string} command: the command that should be executed.
     * - {boolean} modifiesSelection: indicates that the command may cause the editor to have a different
     * selection than at the beginning. This is particularly important for commands that perform removal
     * operations on dom elements.
     * - {Function} execCommand: executes the provided command via CKEDITOR's API.
     *
     * @class ButtonCommand
     */
    var ButtonCommand = {
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            command: React.PropTypes.string.isRequired,
            modifiesSelection: React.PropTypes.bool
        },

        /**
         * Executes a CKEditor command and fires `actionPerformed` event.
         *
         * @param {Object=} data Optional data to be passed to CKEDITOR's `execCommand` method.
         */
        execCommand: function(data) {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand(this.props.command, data);

            if (this.props.modifiesSelection) {
                editor.selectionChange(true);
            }

            editor.fire('actionPerformed', this);
        }
    };

    AlloyEditor.ButtonCommand = ButtonCommand;
}());
(function () {
    'use strict';

    /**
     * ButtonStateClasses is a mixin that decorates the domElement of a component
     * with different CSS classes based on the current state of the element.
     *
     * To check for state, the component can expose the following methods:
     * - isActive: to check the active state
     * - isDisabled: to check the disabled state
     *
     * @class ButtonStateClasses
     */
    var ButtonStateClasses = {
        /**
         * Returns the list of state classes associated to the current element's state, according
         * to the results of the isActive and isDisabled methods.
         *
         * @method getStateClasses
         * @return {String} A string with the state CSS classes.
         */
        getStateClasses: function() {
            var stateClasses = '';

            // Check for active state
            if (AlloyEditor.Lang.isFunction(this.isActive) && this.isActive()) {
                stateClasses += 'alloy-editor-button-pressed';
            }

            // Check for disabled state
            if (AlloyEditor.Lang.isFunction(this.isDisabled) && this.isDisabled()) {
                stateClasses += ' alloy-editor-button-disabled';
            }

            return stateClasses;
        }
    };

    AlloyEditor.ButtonStateClasses = ButtonStateClasses;
}());
(function () {
    'use strict';

    /**
     * ButtonStyle is a mixin that provides a style prop and some methods to apply the resulting
     * style and checking if it is present in a given path or selection.
     *
     * The mixin exposes:
     * - {object} style: The style the button should handle as described by http://docs.ckeditor.com/#!/api/CKEDITOR.style.
     * - {Function} getStyle: Returns the CKEDITOR style associated with the element.
     * - {Function} isActive: Checks wether or not the button is active based on the element.
     *
     * @class ButtonStyle
     */
    var ButtonStyle = {
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            style: React.PropTypes.object
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         */
        componentWillMount: function() {
            this._style = new CKEDITOR.style(this.props.style);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            this._style = null;
        },

        /**
         * Returns instance of CKEDITOR.style which represents the current button style.
         * @return {CKEDITOR.style} The current style representation.
         */
        getStyle: function() {
            return this._style;
        },

        /**
         * Checks if style is active in the current selection.
         *
         * @return {Boolean} True if style is active, false otherwise.
         */
        isActive: function() {
            var result;

            var editor = this.props.editor.get('nativeEditor');

            var elementPath = editor.elementPath();

            result = this.getStyle().checkActive(elementPath, editor);

            return result;
        }
    };

    AlloyEditor.ButtonStyle = ButtonStyle;
}());
(function() {
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
         * @param {Array} buttons The buttons could be shown, prior to the state filtering.
         * @param {Object} additionalProps Additional props that should be passed down to the buttons.
         * @return {Array} An Array which contains the buttons that should be rendered.
         */
        getToolbarButtons: function(buttons, additionalProps) {
            var buttonProps = {};

            var toolbarButtons = this.filterExclusive(
                buttons.filter(function(button) {
                    return button && (AlloyEditor.Buttons[button] || AlloyEditor.Buttons[button.name]);
                })
                .map(function(button) {
                    if (AlloyEditor.Lang.isString(button)) {
                        button = AlloyEditor.Buttons[button];
                    } else if (AlloyEditor.Lang.isString(button.name)) {
                        buttonProps[AlloyEditor.Buttons[button.name].key] = button.cfg;
                        button = AlloyEditor.Buttons[button.name];
                    }

                    return button;
                })
            )
            .map(function(button) {
                var props = this.mergeExclusiveProps({
                    editor: this.props.editor,
                    key: button.key,
                    tabKey: button.key,
                    tabIndex: (this.props.trigger && this.props.trigger.props.tabKey === button.key) ? 0 : -1,
                    trigger: this.props.trigger
                }, button.key);

                props = this.mergeDropdownProps(props, button.key);

                if (additionalProps) {
                    props = CKEDITOR.tools.merge(props, additionalProps, buttonProps[button.key]);
                }

                return React.createElement(button, props);
            }, this);

            return toolbarButtons;
        }
    };

    AlloyEditor.ToolbarButtons = ToolbarButtons;
}());
(function() {
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
         * @method getArrowBoxClasses
         * @return {String} A string with the arrow box CSS classes.
         */
        getArrowBoxClasses: function() {
            var arrowBoxClasses = 'alloy-editor-arrow-box';

            if (AlloyEditor.Lang.isFunction(this.getInteractionPoint) && this.getInteractionPoint()) {
                if (this.getInteractionPoint().direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    arrowBoxClasses += ' alloy-editor-arrow-box-top';
                } else {
                    arrowBoxClasses += ' alloy-editor-arrow-box-bottom';
                }
            }

            return arrowBoxClasses;
        }
    };

    AlloyEditor.WidgetArrowBox = WidgetArrowBox;
}());
(function() {
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
         */
        componentWillReceiveProps: function (nextProps) {
            this.setState({
                itemDropdown: null
            });
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                itemDropdown: null
            };
        },

        /**
         * Merges the provided object with two more properties:
         * - expanded - boolean flag which indicates if an widget should be rendered exclusively.
         * - toggleDropdown - function, which can be used by an widget in order to obtain exclusive state.
         *
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to dropdown state.
         * @param {Object} itemKey They key of an React Widget which contains the dropdown.
         * @return {Object} The merged object.
         */
        mergeDropdownProps: function(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                expanded: this.state.itemDropdown === itemKey ? true : false,
                toggleDropdown: this.toggleDropdown.bind(this, itemKey)
            });
        },

        /**
         * Sets the active dropdown of the widget or discards the toggled item from the state.
         *
         * @param {Object} itemDropdown The widget which requests to toggle its dropdown.
         */
        toggleDropdown: function(itemDropdown) {
            this.setState({
                itemDropdown: itemDropdown !== this.state.itemDropdown ? itemDropdown : null
            });
        }
    };

    AlloyEditor.WidgetDropdown = WidgetDropdown;
}());
(function() {
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
         * @param {Object} itemExclusive The widget which exclusive state should be canceled.
         */
        cancelExclusive: function(itemExclusive) {
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
         * @param {Object} nextProps Object containing the current set of properties.
         */
        componentWillReceiveProps: function(nextProps) {
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
         * @param {Array} items The widgets to be filtered.
         * @return {Array|Object} The item with executive state.
         */
        filterExclusive: function(items) {
            return items.filter(function(item) {
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
         * @param {Object} obj The properties container which should be merged with the properties, related
         *    to exclusive state.
         * @param {Object} itemKey They key of an React Widget which should be rendered exclusively.
         * @return {Object} The merged object.
         */
        mergeExclusiveProps: function(obj, itemKey) {
            return CKEDITOR.tools.merge(obj, {
                cancelExclusive: this.cancelExclusive.bind(this, itemKey),
                renderExclusive: (this.state.itemExclusive === itemKey),
                requestExclusive: this.requestExclusive.bind(this, itemKey)
            });
        },

        /**
         * Requests and sets exclusive state of an widget.
         *
         * @param {Object} itemExclusive The widget which requests exclusive state.
         */
        requestExclusive: function(itemExclusive) {
            this.setState({
                itemExclusive: itemExclusive
            });
        }
    };

    AlloyEditor.WidgetExclusive = WidgetExclusive;
}());
(function() {
    'use strict';

    var DIRECTION_NEXT = 1;
    var DIRECTION_PREV = -1;

    /**
     * WidgetFocusManager is a mixin that provides keyboard navigation inside a widget. To do this,
     * it exposes the following props and methods:
     *
     * - {Boolean} circular: Indicates if focus should be set to the first/last descendant when the limits are reached.
     * - {String} descendants: String representing the CSS selector used to define the elements that should be handled.
     * - {Object} keys: Object representing the keys used to navigate between descendants. The format for the prop is:
     *  {next: value, prev: value} where value can be both a number or an array of numbers with the allowed keyCodes.
     * - {Function} focus: Focuses the current active descendant. Can be attached to the widget DOM node when nested.
     * - {Function} handleKey: Should be attached to the widget DOM node that should support navigation.
     *
     * @class WidgetFocusManager
     */
    var WidgetFocusManager = {
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            circular: React.PropTypes.bool.isRequired,
            descendants: React.PropTypes.string.isRequired,
            keys: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         */
        componentDidMount: function() {
            this._refresh();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         *
         * Refreshes the descendants list.
         */
        componentDidUpdate: function() {
            this._refresh();
        },

        /**
         * Focuses the current active descendant.
         *
         * Several Widgets can be nested in a component hierarchy by attaching this focus method to
         * the widget DOM node, transferring the DOM focus control to the inner FocusManager.
         *
         * @method focus
         */
        focus: function(event) {
            if (!event || this._isValidTarget(event.target)) {
                if (this._descendants) {
                    this._descendants[this._activeDescendant].focus();

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
         * @param {Object} event The Keyboard event that was detected on the widget DOM node.
         * @method handleKey
         */
        handleKey: function(event) {
            if (this._isValidTarget(event.target) && this._descendants) {
                var direction = this._getDirection(event);

                if (direction) {
                    event.stopPropagation();
                    event.preventDefault();

                    this._moveFocus(direction);
                }
            }
        },

        /**
         * Returns the direction, if any, in which the focus should be moved. In presence of the
         * shift key modifier, the direction of the movement is inverted.
         *
         * @param {object} event The Keyboard event.
         *
         * @protected
         * @method _getDirection
         */
        _getDirection: function(event) {
            var direction = 0;

            if (this.props.keys) {
                if (this._isValidKey(event.keyCode, this.props.keys.next)) { direction = DIRECTION_NEXT; }
                if (this._isValidKey(event.keyCode, this.props.keys.prev)) { direction = DIRECTION_PREV; }

                if (event.shifKey) { direction *= -1; }
            }

            return direction;
        },

        /**
         * Indicates if a given keyCode is valid for the given set of keys.
         *
         * @param {Number} keyCode An event keyCode.
         * @param {Array|Number} keys A key set. Can be a number an array of numbers representing the allowed keyCodes.
         *
         * @protected
         * @method _isValidKey
         * @return {Boolean} A boolean value indicating if the key is valid.
         */
        _isValidKey: function(keyCode, keys) {
            return AlloyEditor.Lang.isArray(keys) ? (keys.indexOf(keyCode) !== -1) : (keyCode === keys);
        },

        /**
         * Indicates if a given element is valid for focus management. User input elements such as
         * input, select or textarea are excluded.
         *
         * @param {DOMNode} element A DOM element.
         *
         * @protected
         * @method _isValidKey
         * @return {Boolean} A boolean value indicating if the element is valid.
         */
        _isValidTarget: function(element) {
            var tagName = element.tagName.toLowerCase();

            return (tagName !== 'input' && tagName !== 'select' && tagName !== 'textarea');
        },

        /**
         * Moves the focus among descendants in the especified direction.
         *
         * @param {number} direction The direction (1 or -1) of the focus movement among descendants.
         *
         * @protected
         * @method _moveFocus
         */
        _moveFocus: function(direction) {
            var numDescendants = this._descendants.length;

            var descendant = this._descendants[this._activeDescendant];

            descendant.setAttribute('tabIndex', -1);

            this._activeDescendant += direction;

            if (this.props.circular) {
                // Calculate proper modulo result since remainder operator doesn't behave in the
                // same way for negative numbers
                this._activeDescendant = ((this._activeDescendant % numDescendants) + numDescendants) % numDescendants;
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
         * @protected
         */
        _refresh: function() {
            var domNode = React.findDOMNode(this);

            if (domNode) {
                var descendants = domNode.querySelectorAll(this.props.descendants);

                this._descendants = Array.prototype.map.call(descendants, function(item) {
                    return item;
                }).sort(function(a, b) {
                    return (AlloyEditor.Lang.toInt(a.getAttribute('data-tabindex')) > AlloyEditor.Lang.toInt(b.getAttribute('data-tabindex')));
                });

                this._activeDescendant = 0;

                if (this.props.trigger && this.props.trigger.isMounted()) {
                    var triggerDescendant = this._descendants.indexOf(React.findDOMNode(this.props.trigger));

                    if (triggerDescendant !== -1) {
                        this._activeDescendant = triggerDescendant;
                        this.focus();
                    }
                }
            }
        }
    };

    AlloyEditor.WidgetFocusManager = WidgetFocusManager;
}());
(function() {
    'use strict';

    /**
     * Provides functionality for calculating the point of interaction of the user with the Editor.
     *
     * @class WidgetInteractionPoint
     */
    var WidgetInteractionPoint = {
        /**
         * Returns the position, in page coordinates, according to which a widget should appear.
         * Depending on the direction of the selection, the wdiget may appear above of or on bottom of the selection.
         *
         * It depends on the props editorEvent to analyze the following user-interaction parameters:
         * - {Object} selectionData The data about the selection in the editor as returned from
         * {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
         * - {Number} pos Contains the coordinates of the position, considered as most appropriate.
         * This may be the point where the user released the mouse, or just the beginning or the end of
         * the selection.
         *
         * @return {Object} An Object which contains the following properties:
         * direction, x, y, where x and y are in page coordinates and direction can be one of these:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         */
        getInteractionPoint: function() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null;

            if (!eventPayload) {
                return;
            }

            var selectionData = eventPayload.selectionData;
            var pos = {
                x: eventPayload.nativeEvent.pageX,
                y: eventPayload.nativeEvent.pageY
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
                    y = Math.max(pos.y, selectionData.region.bottom);
                }
            } else {
                x = selectionData.region.left + selectionData.region.width / 2;

                if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) {
                    y = selectionData.region.bottom;
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
         * @method _getXPoint
         * @protected
         * @param {Object} selectionData The data about the selection in the editor as
         * returned from {{#crossLink "CKEDITOR.plugins.selectionregion/getSelectionData:method"}}{{/crossLink}}
         * @param {Object} eventX The X coordinate received from the native event (mouseup).
         * @return {Number} The calculated X point in page coordinates.
         */
        _getXPoint: function(selectionData, eventX) {
            var region = selectionData.region;

            var left = region.startRect ? region.startRect.left : region.left;
            var right = region.endRect ? region.endRect.right : region.right;

            var x;

            if (left < eventX && right > eventX) {
                x = eventX;
            } else {
                var leftDist = Math.abs(left - eventX);
                var rightDist = Math.abs(right - eventX);

                if (leftDist < rightDist) { // user raised the mouse on left on the selection
                    x = left;
                } else {
                    x = right;
                }
            }

            return x;
        }
    };

    AlloyEditor.WidgetInteractionPoint = WidgetInteractionPoint;
}());
(function() {
    'use strict';

    /**
     * Calculates the position where an Widget should be displayed based on the point
     * where user interacted with the editor.
     *
     * @class WidgetPosition
     */
    var WidgetPosition = {
        mixins: [AlloyEditor.WidgetInteractionPoint],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            gutter: React.PropTypes.object
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         */
        getDefaultProps: function() {
            return {
                gutter: {
                    left: 0,
                    top: 10
                }
            };
        },

        /**
         * Cancels an scheduled animation frame.
         */
        cancelAnimation: function() {
            if (window.cancelAnimationFrame) {
                window.cancelAnimationFrame(this._animationFrameId);
            }
        },

        /**
         * Returns the position of the Widget taking in consideration the
         * {{#crossLink "WidgetPosition/gutter:attribute"}}{{/crossLink}} attribute.
         *
         * @protected
         * @param {Number} left The left offset in page coordinates where Toolbar should be shown.
         * @param {Number} top The top offset in page coordinates where Toolbar should be shown.
         * @param {Number} direction The direction of the selection. May be one of the following:
         * CKEDITOR.SELECTION_BOTTOM_TO_TOP or CKEDITOR.SELECTION_TOP_TO_BOTTOM
         * @return {Array} An Array with left and top offsets in page coordinates.
         */
        getWidgetXYPoint: function(left, top, direction) {
            var domNode = React.findDOMNode(this);

            var gutter = this.props.gutter;

            if (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM || direction === CKEDITOR.SELECTION_BOTTOM_TO_TOP) {
                left = left - gutter.left - (domNode.offsetWidth / 2);

                top = (direction === CKEDITOR.SELECTION_TOP_TO_BOTTOM) ? (top + gutter.top) :
                    (top - domNode.offsetHeight - gutter.top);

            } else if (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT ||
                direction === CKEDITOR.SELECTION_RIGHT_TO_LEFT) {

                left = (direction === CKEDITOR.SELECTION_LEFT_TO_RIGHT) ?
                    (left + gutter.left + domNode.offsetHeight / 2) :
                    (left - 3 * domNode.offsetHeight / 2 - gutter.left);

                top = top - gutter.top - (domNode.offsetHeight / 2);
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
         * @return {Boolean} True if the widget is visible, false otherwise
         */
        isVisible: function() {
            var domNode = this.getDOMNode();

            if (domNode) {
                var domElement = new CKEDITOR.dom.element(domNode);

                return domElement.hasClass('alloy-editor-visible');
            }

            return false;
        },

        moveToPoint: function(startPoint, endPoint) {
            var domElement = new CKEDITOR.dom.element(this.getDOMNode());

            domElement.setStyles({
                left: startPoint[0] + 'px',
                top: startPoint[1] + 'px',
                opacity: 0
            });

            domElement.removeClass('alloy-editor-invisible');

            this._animate(function() {
                domElement.addClass('alloy-editor-toolbar-transition alloy-editor-visible');
                domElement.setStyles({
                    left: endPoint[0],
                    top: endPoint[1],
                    opacity: 1
                });
            });
        },

        /**
         * Shows the widget with the default animation transition.
         */
        show: function() {
            var domNode = React.findDOMNode(this);

            if (!this.isVisible() && domNode) {
                var interactionPoint = this.getInteractionPoint();

                if (interactionPoint) {
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var finalX,
                        finalY,
                        initialX,
                        initialY;

                    finalX = initialX = domElement.getStyle('left');
                    finalY = initialY = domElement.getStyle('top');

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
         */
        updatePosition: function() {
            var interactionPoint = this.getInteractionPoint();

            var domNode = React.findDOMNode(this);

            if (interactionPoint && domNode) {
                var xy = this.getWidgetXYPoint(interactionPoint.x, interactionPoint.y, interactionPoint.direction);

                var domElement = new CKEDITOR.dom.element(domNode);

                domElement.setStyles({
                    left: xy[0] + 'px',
                    top: xy[1] + 'px'
                });
            }
        },

        /**
         * Requests an animation frame, if possible, to simulate an animation.
         *
         * @protected
         * @param {Function} callback The function to be executed on the scheduled frame.
         */
        _animate: function(callback) {
            if (window.requestAnimationFrame) {
                this._animationFrameId = window.requestAnimationFrame(callback);
            } else {
                callback();
            }
        }
    };

    AlloyEditor.WidgetPosition = WidgetPosition;
}());

(function () {
    'use strict';

    /**
     * The ButtonBold class provides functionality for styling an selection with strong (bold) style.
     *
     * @class ButtonBold
     */
    var ButtonBold = React.createClass({displayName: "ButtonBold",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'bold'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'bold',
                style: {
                    element: 'strong'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-bold", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-bold"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonBold.key] = AlloyEditor.ButtonBold = ButtonBold;
}());
(function () {
    'use strict';

    /**
     * The ButtonCameraImage class takes photo from camera and inserts it to the content.
     *
     * @class ButtonCameraImage
     */
    var ButtonCameraImage = React.createClass({displayName: "ButtonCameraImage",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'cameraImage'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         */
        getDefaultProps: function () {
            return {
                videoWidth: 320
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses the take photo button.
         */
        componentDidMount: function () {
            React.findDOMNode(this.refs.buttonTakePhoto).focus();
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            if (this._stream) {
                this._stream.stop();
                this._stream = null;
            }
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            getUserMedia.call(navigator, {
                video: true,
                audio: false
            }, this._handleStreamSuccess, this._handleStreamError);

            return (
                React.createElement("div", {className: "alloy-editor-camera"}, 
                    React.createElement("video", {ref: "videoContainer"}, "Video stream not available."), 
                    React.createElement("button", {className: "alloy-editor-camera-shoot", onClick: this.takePhoto, ref: "buttonTakePhoto"}, "Take photo"), 
                    React.createElement("canvas", {className: "alloy-editor-camera-canvas", ref: "canvasContainer"})
                )
            );
        },

        /**
         * Takes photo from the video stream and inserts in into editor's content.
         *
         * @method takePhoto
         */
        takePhoto: function() {
            var videoEl = React.findDOMNode(this.refs.videoContainer);
            var canvasEl = React.findDOMNode(this.refs.canvasContainer);

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
         * @param {Event} error The fired event in case of error.
         * @protected
         * @method _handleStreamError
         */
        _handleStreamError: function(error) {
            window.alert('An error occurred! ' + error);
        },

        /**
         * Starts streaming video in the video element and sets width/height to the video
         * and canvas elements.
         *
         * @param {Object} stream The video stream
         */
        _handleStreamSuccess: function(stream) {
            var videoEl = React.findDOMNode(this.refs.videoContainer);
            var canvasEl = React.findDOMNode(this.refs.canvasContainer);

            videoEl.addEventListener('canplay', function(event) {
                var height = videoEl.videoHeight / (videoEl.videoWidth/this.props.videoWidth);

                if (isNaN(height)) {
                    height = this.props.videoWidth / (4/3);
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

            React.findDOMNode(this.refs.buttonTakePhoto).disabled = false;
        }

        /**
         * Fired when an image is being taken from the camera and added as an element to the editor.
         *
         * @event imageCameraAdd
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.ButtonCameraImage = ButtonCameraImage;
}());
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
    var ButtonCamera = React.createClass({displayName: "ButtonCamera",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'camera'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    React.createElement(AlloyEditor.ButtonCameraImage, React.__spread({},  this.props))
                );
            } else {
                var disabled = !(navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia ||
                    navigator.msGetUserMedia);

                return (
                    React.createElement("button", {className: "alloy-editor-button", "data-type": "button-image-camera", disabled: disabled, onClick: this.props.requestExclusive.bind(ButtonCamera.key), tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-camera"})
                    )
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonCamera.key] = AlloyEditor.ButtonCamera = ButtonCamera;
}());
(function () {
    'use strict';

    /**
     * The ButtonCode class provides wraps a selection in `pre` element.
     *
     * @class ButtonCode
     */
    var ButtonCode = React.createClass({displayName: "ButtonCode",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'code'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'pre'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-code", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-code"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonCode.key] = AlloyEditor.ButtonCode = ButtonCode;
}());
(function () {
    'use strict';

    /**
     * The ButtonCommandListItem class is a UI class that renders a ButtonCommand that can be used inside
     * a list as an item, with a string representation of its behaviour.
     *
     * @class ButtonCommandListItem
     */
    var ButtonCommandListItem = React.createClass({displayName: "ButtonCommandListItem",
        mixins: [AlloyEditor.ButtonCommand],

        propTypes: {
            description: React.PropTypes.string.isRequired,
            icon: React.PropTypes.string
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonCommandListItem'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("button", {className: this._getClassName(), onClick: this.execCommand, tabIndex: this.props.tabIndex}, this.props.description)
            );
        },

        /**
         * Returns the class name of Widget.
         *
         * @return {String} The class name of the Widget.
         */
        _getClassName: function() {
            var className = 'alloy-editor-toolbar-element';

            if (this.props.icon) {
                className += ' alloy-editor-icon-' + this.props.icon;
            }

            return className;
        }
    });

    AlloyEditor.ButtonCommandListItem = ButtonCommandListItem;
}());
(function () {
    'use strict';

    /**
     * The ButtonH1 class provides wraps a selection in `h1` element.
     *
     * @class ButtonH1
     */
    var ButtonH1 = React.createClass({displayName: "ButtonH1",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'h1'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'h1'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-h1", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-h1"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonH1.key] = AlloyEditor.ButtonH1 = ButtonH1;
}());
(function () {
    'use strict';

    /**
     * The ButtonH2 class provides wraps a selection in `h2` element.
     *
     * @class ButtonH2
     */
    var ButtonH2 = React.createClass({displayName: "ButtonH2",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'h2'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'h2'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-h2", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-h2"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonH2.key] = AlloyEditor.ButtonH2 = ButtonH2;
}());
(function () {
    'use strict';

    /**
     * The ButtonHline class provides inserts horizontal line.
     *
     * @class ButtonHline
     */
    var ButtonHline = React.createClass({displayName: "ButtonHline",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'hline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("button", {className: "alloy-editor-button", "data-type": "button-hline", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-separator"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonHline.key] = AlloyEditor.ButtonHline = ButtonHline;
}());
(function () {
    'use strict';

    /**
     * The ButtonImageAlignLeft class provides functionality for aligning an image on left.
     *
     * @class ButtonImageAlignLeft
     */
    var ButtonImageAlignLeft = React.createClass({displayName: "ButtonImageAlignLeft",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'imageLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'img',
                    styles: {
                        float: 'left'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-image-align-left", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-left"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignLeft.key] = AlloyEditor.ButtonImageAlignLeft = ButtonImageAlignLeft;
}());
(function () {
    'use strict';

    /**
     * The ButtonImageAlignRight class provides functionality for aligning an image on right.
     *
     * @class ButtonImageAlignRight
     */
    var ButtonImageAlignRight = React.createClass({displayName: "ButtonImageAlignRight",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'imageRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'img',
                    styles: {
                        float: 'right'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-image-align-right", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-right"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonImageAlignRight.key] = AlloyEditor.ButtonImageAlignRight = ButtonImageAlignRight;
}());
(function () {
    'use strict';

    /**
     * The ButtonImage class inserts an image to the content.
     *
     * @class ButtonImage
     */
    var ButtonImage = React.createClass({displayName: "ButtonImage",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'image'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var inputSyle = {display: 'none'};

            return (
                React.createElement("div", null, 
                    React.createElement("button", {className: "alloy-editor-button", "data-type": "button-image", onClick: this.handleClick, tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-image"})
                    ), 

                    React.createElement("input", {onChange: this._onInputChange, ref: "fileInput", style: inputSyle, type: "file"})
                )
            );
        },

        /**
         * Simulates click on the input element. This will open browser's native file open dialog.
         *
         * @param {SyntheticEvent} event The received click event on the button.
         */
        handleClick: function(event) {
            CKEDITOR.tools.simulate(React.findDOMNode(this.refs.fileInput), 'click');
        },

        /**
         * On input change, reads the chosen file and creates an img element with src as Data URI.
         * Then, fires an {{#crossLink "ButtonImage/imageadd:event"}}{{/crossLink}} via CKEditor's
         * message system.
         *
         * @method _onInputChange
         * @protected
         */
        _onInputChange: function() {
            var reader = new FileReader();
            var inputEl = React.findDOMNode(this.refs.fileInput);

            reader.onload = function(event) {
                var editor = this.props.editor.get('nativeEditor');

                var el = CKEDITOR.dom.element.createFromHtml('<img src="' + event.target.result + '">');

                editor.insertElement(el);

                editor.fire('actionPerformed', this);

                var imageData = {
                    el: el,
                    file: inputEl.files[0]
                };

                editor.fire('imageAdd', imageData);
            }.bind(this);

            reader.readAsDataURL(inputEl.files[0]);

            inputEl.value = '';
        }

        /**
         * Fired when an image file is added as an element to the editor.
         *
         * @event imageadd
         * @param {CKEDITOR.dom.element} el The created img element in editor.
         */
    });

    AlloyEditor.Buttons[ButtonImage.key] = AlloyEditor.ButtonImage = ButtonImage;
}());
(function () {
    'use strict';

    /**
     * The ButtonItalic class provides functionality for styling an selection with italic (em) style.
     *
     * @class ButtonItalic
     */
    var ButtonItalic = React.createClass({displayName: "ButtonItalic",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'italic'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'italic',
                style: {
                    element: 'em'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-italic", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-italic"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonItalic.key] = AlloyEditor.ButtonItalic = ButtonItalic;
}());
(function () {
    'use strict';

    var KEY_ENTER = 13;
    var KEY_ESC = 27;

    /**
     * The ButtonEditLink class provides functionality for creating and editing a link in a document.
     * Provides UI for creating, editing and removing a link.
     *
     * @class ButtonLinkEdit
     */
    var ButtonLinkEdit = React.createClass({displayName: "ButtonLinkEdit",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'linkEdit'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the link input to immediately allow editing.
         */
        componentDidMount: function () {
            // We need to wait for the next rendering cycle before focusing to avoid undesired
            // scrolls on the page
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(this._focusLinkInput);
            } else {
                setTimeout(this._focusLinkInput, 0);
            }
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         */
        getInitialState: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();
            var href = link ? link.getAttribute('href') : '';

            return {
                element: link,
                linkHref: href
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var clearLinkStyle = {
                opacity: this.state.linkHref ? 1 : 0
            };

            return (
                React.createElement("div", {className: "alloy-editor-container-edit-link"}, 
                    React.createElement("button", {"aria-label": "Cancel", className: "alloy-editor-button", disabled: !this.state.element, onClick: this._removeLink}, 
                        React.createElement("span", {className: "alloy-editor-icon-unlink"})
                    ), 
                    React.createElement("div", {className: "alloy-editor-container-input"}, 
                        React.createElement("input", {className: "alloy-editor-input", onChange: this._handleLinkChange, onKeyDown: this._handleKeyDown, placeholder: "Type or paste link here", ref: "linkInput", type: "text", value: this.state.linkHref}), 
                        React.createElement("button", {className: "alloy-editor-button alloy-editor-icon-remove", onClick: this._clearLink, style: clearLinkStyle})
                    ), 
                    React.createElement("button", {"aria-label": "Confirm", className: "alloy-editor-button", disabled: !this.state.linkHref, onClick: this._updateLink}, 
                        React.createElement("span", {className: "alloy-editor-icon-ok"})
                    )
                )
            );
        },

        /**
         * Clears the link input. This only changes the component internal state, but does not
         * affect the link element of the editor. Only the _removeLink and _updateLink methods
         * are translated to the editor element.
         *
         * @protected
         * @method _clearLink
         */
        _clearLink: function() {
            this.setState({
                linkHref: ''
            });
        },

        /**
         * Focuses the user cursor on the widget's input.
         *
         * @protected
         * @method _focusLinkInput
         */
        _focusLinkInput: function() {
            React.findDOMNode(this.refs.linkInput).focus();
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates/updates the link.
         * - Escape: Discards the changes.
         *
         * @param {SyntheticEvent} event The keyboard event.
         *
         * @protected
         * @method _handleKeyDown
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
                event.preventDefault();
            }

            if (event.keyCode === KEY_ENTER) {
                this._updateLink();
            } else if (event.keyCode === KEY_ESC) {
                this.props.cancelExclusive();

                this.props.editor.get('nativeEditor').focus();
            }
        },

        /**
         * Updates the component state when the link input changes on user interaction.
         *
         * @param {SyntheticEvent} event The change event.
         *
         * @protected
         * @method _handleLinkChange
         */
        _handleLinkChange: function(event) {
            this.setState({
                linkHref: event.target.value
            });
        },

        /**
         * Removes the link in the editor element.
         *
         * @protected
         * @method _removeLink
         */
        _removeLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);
            var selection = editor.getSelection();
            var bookmarks = selection.createBookmarks();

            linkUtils.remove(this.state.element);

            selection.selectBookmarks(bookmarks);

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();

            editor.fire('actionPerformed', this);
        },

        /**
         * Updates the link in the editor element. If the element didn't exist previously, it will
         * create a new <a> element with the href specified in the link input.
         *
         * @protected
         * @method _updateLink
         */
        _updateLink: function() {
            var editor = this.props.editor.get('nativeEditor');
            var linkUtils = new CKEDITOR.Link(editor);

            if (this.state.linkHref) {
                if (this.state.element) {
                    linkUtils.update(this.state.linkHref, this.state.element);
                } else {
                    linkUtils.create(this.state.linkHref);
                }

                editor.fire('actionPerformed', this);
            }

            // We need to cancelExclusive with the bound parameters in case the button is used
            // inside another in exclusive mode (such is the case of the link button)
            this.props.cancelExclusive();
        }
    });

    AlloyEditor.Buttons[ButtonLinkEdit.key] = AlloyEditor.ButtonLinkEdit = ButtonLinkEdit;
}());
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
     */
    var ButtonLink = React.createClass({displayName: "ButtonLink",
        mixins: [AlloyEditor.ButtonStateClasses],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'link'
        },

        /**
         * Checks if the current selection is contained within a link.
         *
         * @return {Boolean} True if the selection is inside a link, false otherwise.
         */
        isActive: function() {
            return (new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection() !== null);
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            if (this.props.renderExclusive) {
                return (
                    React.createElement(AlloyEditor.ButtonLinkEdit, React.__spread({},  this.props))
                );
            } else {
                return (
                    React.createElement("button", {className: cssClass, "data-type": "button-link", onClick: this.props.requestExclusive.bind(ButtonLink.key), tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-link"})
                    )
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonLink.key] = AlloyEditor.ButtonLink = ButtonLink;
}());
(function () {
    'use strict';

    /**
     * The ButtonOrderedList class provides functionality for creating ordered lists in an editor.
     *
     * @class ButtonOrderedList
     */
    var ButtonOrderedList = React.createClass({displayName: "ButtonOrderedList",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'ol'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-ol", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-numbered-list"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonOrderedList.key] = AlloyEditor.ButtonOrderedList = ButtonOrderedList;
}());
(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignLeft class provides functionality for aligning a paragraph on left.
     *
     * @class ButtonParagraphAlignLeft
     */
    var ButtonParagraphAlignLeft = React.createClass({displayName: "ButtonParagraphAlignLeft",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphLeft'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'left'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-paragraph-align-left", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-left"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignLeft.key] = AlloyEditor.ButtonParagraphAlignLeft = ButtonParagraphAlignLeft;
}());
(function () {
    'use strict';

    /**
     * The ButtonParagraphAlignRight class provides functionality for aligning a paragraph on right.
     *
     * @class ButtonParagraphAlignRight
     */
    var ButtonParagraphAlignRight = React.createClass({displayName: "ButtonParagraphAlignRight",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphRight'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'right'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-paragraph-align-right", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-right"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphAlignRight.key] = AlloyEditor.ButtonParagraphAlignRight = ButtonParagraphAlignRight;
}());
(function () {
    'use strict';

    /**
     * The ButtonParagraphCenter class provides functionality for centering a paragraph.
     *
     * @class ButtonParagraphCenter
     */
    var ButtonParagraphCenter = React.createClass({displayName: "ButtonParagraphCenter",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphCenter'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'center'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-paragraph-center", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-center"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphCenter.key] = AlloyEditor.ButtonParagraphCenter = ButtonParagraphCenter;
}());
(function () {
    'use strict';

    /**
     * The ButtonParagraphJustify class provides functionality for justfying a paragraph.
     *
     * @class ButtonParagraphJustify
     */
    var ButtonParagraphJustify = React.createClass({displayName: "ButtonParagraphJustify",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'paragraphJustify'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                style: {
                    element: 'p',
                    styles: {
                        'text-align': 'justify'
                    }
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-paragraph-justify", onClick: this.applyStyle, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-align-justified"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonParagraphJustify.key] = AlloyEditor.ButtonParagraphJustify = ButtonParagraphJustify;
}());
(function () {
    'use strict';

    /**
     * The ButtonQuote class wraps a selection in `blockquote` element.
     *
     * @class ButtonQuote
     */
    var ButtonQuote = React.createClass({displayName: "ButtonQuote",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'quote'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-quote", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-quote"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonQuote.key] = AlloyEditor.ButtonQuote = ButtonQuote;
}());
(function () {
    'use strict';

    /**
     * The ButtonRemoveFormat class removes style formatting.
     *
     * @class ButtonRemoveFormat
     */
    var ButtonRemoveFormat = React.createClass({displayName: "ButtonRemoveFormat",
        mixins: [AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'removeFormat'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'removeFormat'
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("button", {className: "alloy-editor-button", "data-type": "button-removeformat", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-removeformat"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonRemoveFormat.key] = AlloyEditor.ButtonRemoveFormat = ButtonRemoveFormat;
}());
(function () {
    'use strict';

    /**
     * The ButtonStrike class styles a selection with strike style.
     *
     * @class ButtonStrike
     */
    var ButtonStrike = React.createClass({displayName: "ButtonStrike",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'strike'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'strike',
                style: {
                    element: 's'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-strike", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-strike"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonStrike.key] = AlloyEditor.ButtonStrike = ButtonStrike;
}());
(function () {
    'use strict';

    /**
     * The ButtonsStylesListHeader class provides the header of an list of style items.
     *
     * @class ButtonsStylesListHeader
     */
    var ButtonsStylesListHeader = React.createClass({displayName: "ButtonsStylesListHeader",
        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.styles && this.props.styles.length) {
                return (
                    React.createElement("span", {className: "alloy-editor-list-header"}, this.props.name)
                );
            } else {
                return null;
            }
        }
    });

    AlloyEditor.ButtonsStylesListHeader = ButtonsStylesListHeader;
}());
(function () {
    'use strict';

    /**
     * The ButtonStylesListItemRemove class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItemRemove
     */
    var ButtonStylesListItemRemove = React.createClass({displayName: "ButtonStylesListItemRemove",
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            removeBlocks: React.PropTypes.array
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonStylesListItemRemove'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                removeBlocks: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("button", {className: "alloy-editor-toolbar-element", onClick: this._removeStyles, tabIndex: this.props.tabIndex}, "Normal Text")
            );
        },

        /**
         * Removes all inline styles and configured block elements applied to the current selection.
         *
         * @protected
         * @method _removeStyles
         */
        _removeStyles: function() {
            var editor = this.props.editor.get('nativeEditor');

            editor.execCommand('removeFormat');

            this.props.removeBlocks.forEach(function(blockItem) {
                var blockStyle = new CKEDITOR.style({element: blockItem});

                editor.removeStyle(blockStyle);
            });

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.ButtonStylesListItemRemove = ButtonStylesListItemRemove;
}());
(function () {
    'use strict';

    /**
     * The ButtonStylesListItem class provides functionality for previewing a style definition
     * inside a list and applying it to the current editor selection.
     *
     * @class ButtonStylesListItem
     */
    var ButtonStylesListItem = React.createClass({displayName: "ButtonStylesListItem",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonActionStyle],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonStylesListItem'
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         */
        componentWillMount: function () {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            // We need to use dangerouselySetInnterHTML since we're not in control of the style
            // preview that is generated by CKEditor.
            return (
                React.createElement("button", {className: "alloy-editor-toolbar-element", dangerouslySetInnerHTML: {__html: this._preview}, onClick: this._onClick, tabIndex: this.props.tabIndex})
            );
        },

        /**
         * Applies the item style to the editor selection.
         *
         * @protected
         * @method _onClick
         */
        _onClick: function() {
            // Typically, we want the style to be the only one applied to the current selection, so
            // we execute the 'removeFormat' command first. Note that block styles won't be cleaned.
            // However, this is consistent with other editors implementations of this feature.
            this.props.editor.get('nativeEditor').execCommand('removeFormat');

            this.applyStyle();
        }
    });

    AlloyEditor.ButtonStylesListItem = ButtonStylesListItem;
}());
(function () {
    'use strict';

    /**
     * The ButtonStylesList class provides functionality for showing a list of styles that can be
     * applied to the current selection..
     *
     * @class ButtonStylesList
     */
    var ButtonStylesList = React.createClass({displayName: "ButtonStylesList",
        mixins: [AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'buttonStylesList'
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         *
         * Focuses on the list node to allow keyboard interaction.
         */
        componentDidMount: function () {
            React.findDOMNode(this).focus();
        },

        /**
         * Lifecycle. Invoked once, both on the client and server, immediately before the initial rendering occurs.
         */
        componentWillMount: function () {
            var blockStyles = [];
            var inlineStyles = [];
            var objectStyles = [];

            this.props.styles.forEach(function(item) {
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
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-toolbar-element',
                keys: {
                    next: [39, 40],
                    prev: [37, 38]
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the list.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("div", {className: "alloy-editor-dropdown", onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: "0"}, 
                    React.createElement(AlloyEditor.ButtonStylesListItemRemove, {editor: this.props.editor}), 

                    React.createElement(AlloyEditor.ButtonsStylesListHeader, {name: "Block styles", styles: this._blockStyles}), 
                    this._renderStylesItems(this._blockStyles), 

                    React.createElement(AlloyEditor.ButtonsStylesListHeader, {name: "Inline styles", styles: this._inlineStyles}), 
                    this._renderStylesItems(this._inlineStyles), 

                    React.createElement(AlloyEditor.ButtonsStylesListHeader, {name: "Object styles", styles: this._objectStyles}), 
                    this._renderStylesItems(this._objectStyles)
                )
            );
        },

        /**
         * Renders instances of ButtonStylesListItem with the preview of the correspondent block, inline or object styles.
         * @param {Array} styles List of styles for which preview should be rendered.
         *
         * @protected
         * @return {Array} Rendered instances of ButtonStylesListItem class
         */
        _renderStylesItems: function(styles) {
            var editor = this.props.editor;
            var trigger = this.props.trigger;
            var items;

            if (styles && styles.length) {
                items = styles.map(function(item) {
                    return React.createElement(AlloyEditor.ButtonStylesListItem, {key: item.name, editor: editor, name: item.name, style: item.style, tabIndex: (trigger && trigger.name === item.name) ? 0 : -1})
                });
            }

            return items;
        }
    });

    AlloyEditor.ButtonStylesList = ButtonStylesList;
}());
(function () {
    'use strict';

    /**
     * The ButtonStyles class provides functionality for styling a selection with a list of
     * configurable and customizable styles. The allowed styles follow CKEDITOR.Style configuration
     * (http://docs.ckeditor.com/#!/api/CKEDITOR.style)
     *
     * @class ButtonStyles
     */
    var ButtonStyles = React.createClass({displayName: "ButtonStyles",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'styles'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function () {
            return {
                styles: [
                    {
                        name: 'Head 1',
                        style: {
                            element: 'h1'
                        }
                    },
                    {
                        name: 'Head 2',
                        style: {
                            element: 'h2'
                        }
                    },
                    {
                        name: 'Big',
                        style: {
                            element: 'big'
                        }
                    },
                    {
                        name: 'Small',
                        style: {
                            element: 'small'
                        }
                    },
                    {
                        name: 'Code',
                        style: {
                            element: 'code'
                        }
                    }
                ]
            };
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         * The return value will be used as the initial value of this.state.
         */
        getInitialState: function() {
            return {
                expanded: false
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var activeStyle = 'Normal Text';

            this.props.styles.forEach(function(item) {
                if (this._checkActive(item.style)) {
                    activeStyle = item.name;
                }
            }.bind(this));

            var buttonStylesList;

            if (this.props.expanded) {
                buttonStylesList = React.createElement(AlloyEditor.ButtonStylesList, {editor: this.props.editor, styles: this.props.styles, trigger: this.props.trigger})
            }

            return (
                React.createElement("div", {className: "alloy-editor-container-styles alloy-editor-has-dropdown"}, 
                    React.createElement("button", {className: "alloy-editor-toolbar-element", onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex}, 
                        React.createElement("div", {className: "alloy-editor-container"}, 
                            React.createElement("span", {className: "alloy-editor-selected-style"}, activeStyle), 
                            React.createElement("span", {className: "alloy-editor-icon-arrow"})
                        )
                    ), 
                    buttonStylesList
                )
            );
        },

        /**
         * Checks if the given style definition is applied to the current selection in the editor.
         *
         * @protected
         * @method _checkActive
         *
         * @param {Object} styleConfig Style definition as per http://docs.ckeditor.com/#!/api/CKEDITOR.style.
         * @return {Boolean} Returns true if the style is applied to the selection, false otherwise.
         */
        _checkActive: function(styleConfig) {
            var nativeEditor = this.props.editor.get('nativeEditor');

            // Styles with wildcard element (*) won't be considered active by CKEditor. Defaulting
            // to a 'span' element works for most of those cases with no defined element.
            styleConfig = CKEDITOR.tools.merge({element: 'span'}, styleConfig);

            var style = new CKEDITOR.style(styleConfig);

            return style.checkActive(nativeEditor.elementPath(), nativeEditor);
        }
    });

    AlloyEditor.Buttons[ButtonStyles.key] = AlloyEditor.ButtonStyles = ButtonStyles;
}());
(function () {
    'use strict';

    /**
     * The ButtonSubscript class provides functionality for applying subscript style to a text selection.
     *
     * @class ButtonSubscript
     */
    var ButtonSubscript = React.createClass({displayName: "ButtonSubscript",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'subscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'subscript',
                style: {
                    element: 'sub'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-subscript", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-subscript"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonSubscript.key] = AlloyEditor.ButtonSubscript = ButtonSubscript;
}());
(function () {
    'use strict';

    /**
     * The ButtonSuperscript class provides functionality for applying superscript style to a text selection.
     *
     * @class ButtonSuperscript
     */
    var ButtonSuperscript = React.createClass({displayName: "ButtonSuperscript",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'superscript'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'superscript',
                style: {
                    element: 'sup'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-superscript", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-superscript"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonSuperscript.key] = AlloyEditor.ButtonSuperscript = ButtonSuperscript;
}());
(function () {
    'use strict';

    /**
     * The ButtonTableCell class provides functionality to work with table cells.
     *
     * @class ButtonTableCell
     */
    var ButtonTableCell = React.createClass({displayName: "ButtonTableCell",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableCell'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("div", {className: "alloy-editor-container alloy-editor-has-dropdown"}, 
                    React.createElement("button", {className: "alloy-editor-button", onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-cell"})
                    ), 
                    this._renderDropdown()
                )
            );
        },

        /**
         * Renders instances of ButtonCommandListItem passing the command which has to be executed and the description
         * of the command.
         *
         * @method _renderActions
         * @protected
         * @return {Array} Rendered instances of ButtonCommandListItem class.
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellInsertBefore", description: "Insert cell left", editor: editor, key: "cellinsertbefore"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellInsertAfter", description: "Insert cell right", editor: editor, key: "cellinsertafter"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellDelete", description: "Delete cell", editor: editor, key: "celldelete", modifiesSelection: true}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellMerge", description: "Merge cells", editor: editor, key: "cellmerge"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellMergeDown", description: "Merge cell below", editor: editor, key: "cellmergedown"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellMergeRight", description: "Merge cell right", editor: editor, key: "cellmergeright"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellHorizontalSplit", description: "Split cells horizontally", editor: editor, key: "cellsplithorizontal"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "cellVerticalSplit", description: "Split cells vertically", editor: editor, key: "cellsplitvertical"})
            ];

            return actions;
        },

        /*
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @method _renderDropdown
         * @protected
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise.
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    React.createElement("div", {className: "alloy-editor-dropdown"}, 
                        this._renderActions()
                    )
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableCell.key] = AlloyEditor.ButtonTableCell = ButtonTableCell;
}());
(function () {
    'use strict';

    /**
     * The ButtonTableColumn class provides functionality to work with table columns.
     *
     * @class ButtonTableColumn
     */
    var ButtonTableColumn = React.createClass({displayName: "ButtonTableColumn",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableColumn'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("div", {className: "alloy-editor-container alloy-editor-has-dropdown"}, 
                    React.createElement("button", {className: "alloy-editor-button", onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-column"})
                    ), 
                    this._renderDropdown()
                )
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @protected
         * @method _renderActions
         *
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "columnInsertBefore", description: "Insert column left", editor: editor, key: "columninsertbefore"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "columnInsertAfter", description: "Insert column right", editor: editor, key: "columninsertafter"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "columnDelete", description: "Delete column", editor: editor, key: "columndelete", modifiesSelection: true})
            ];

            return actions;
        },

        /*
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    React.createElement("div", {className: "alloy-editor-dropdown"}, 
                        this._renderActions()
                    )
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableColumn.key] = AlloyEditor.ButtonTableColumn = ButtonTableColumn;
}());
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
    var ButtonTableEdit = React.createClass({displayName: "ButtonTableEdit",
        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            cancelExclusive: React.PropTypes.func.isRequired,
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableEdit'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         */
        getDefaultProps: function () {
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
         */
        componentDidMount: function () {
            React.findDOMNode(this.refs.rows).focus();
        },

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                cols: 3,
                rows: 3
            };
        },

        /**
         * Creates a table.
         *
         * @protected
         * @method _createTable
         */
        _createTable: function() {
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
         * @protected
         * @param {String} inputName The name of the input which value should be updated.
         * @param {SyntheticEvent} event The provided event.
         */
        _handleChange: function(inputName, event) {
            var state = {};
            state[inputName] = event.target.value;

            this.setState(state);
        },

        /**
         * Monitors key interaction inside the input element to respond to the keys:
         * - Enter: Creates the table.
         * - Escape: Discards the changes.
         *
         * @param {SyntheticEvent} event The keyboard event.
         * @protected
         * @method _handleKeyDown
         */
        _handleKeyDown: function(event) {
            if (event.keyCode === KEY_ENTER || event.keyCode === KEY_ESC) {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var time = Date.now();
            var rowsId = time + 'rows';
            var colsId = time + 'cols';

            return (
                React.createElement("div", {className: "alloy-editor-container-edit-table"}, 
                    React.createElement("label", {htmlFor: rowsId}, "Rows"), 
                    React.createElement("div", {className: "alloy-editor-container-input small"}, 
                        React.createElement("input", {className: "alloy-editor-input", id: rowsId, onChange: this._handleChange.bind(this, 'rows'), min: "1", onKeyDown: this._handleKeyDown, placeholder: "Rows", ref: "rows", type: "number", value: this.state.rows})
                    ), 

                    React.createElement("label", {htmlFor: colsId}, "Cols"), 
                    React.createElement("div", {className: "alloy-editor-container-input small"}, 
                        React.createElement("input", {className: "alloy-editor-input", id: colsId, onChange: this._handleChange.bind(this, 'cols'), min: "1", onKeyDown: this._handleKeyDown, placeholder: "Colums", ref: "cols", type: "number", value: this.state.cols})
                    ), 

                    React.createElement("button", {"aria-label": "Confirm", className: "alloy-editor-button", onClick: this._createTable}, 
                        React.createElement("span", {className: "alloy-editor-icon-ok"})
                    )
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonTableEdit.key] = AlloyEditor.ButtonTableEdit = ButtonTableEdit;
}());
(function () {
    'use strict';

    /**
     * The ButtonTableRemove class provides functionality for removing a table
     *
     * @class ButtonTableRemove
     */
    var ButtonTableRemove = React.createClass({displayName: "ButtonTableRemove",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableRemove'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("button", {className: "alloy-editor-button", "data-type": "button-table-remove", onClick: this._removeTable, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-close"})
                )
            );
        },

        /**
         * Removes the table in the editor element.
         *
         * @protected
         * @method _removeTable
         */
        _removeTable: function() {
            var editor = this.props.editor.get('nativeEditor');
            var tableUtils = new CKEDITOR.Table(editor);

            tableUtils.remove();

            editor.fire('actionPerformed', this);
        }
    });

    AlloyEditor.Buttons[ButtonTableRemove.key] = AlloyEditor.ButtonTableRemove = ButtonTableRemove;
}());
(function () {
    'use strict';

    /**
     * The ButtonTableRow class provides functionality to work with table rows.
     *
     * @class ButtonTableRow
     */
    var ButtonTableRow = React.createClass({displayName: "ButtonTableRow",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'tableRow'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            return (
                React.createElement("div", {className: "alloy-editor-container alloy-editor-has-dropdown"}, 
                    React.createElement("button", {className: "alloy-editor-button", onClick: this.props.toggleDropdown, tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-row"})
                    ), 
                    this._renderDropdown()
                )
            );
        },

        /**
         * Renders instances of ButtonCommandListItem with the description of the row action that will be executed.
         *
         * @protected
         * @method _renderActions
         *
         * @return {Array} Rendered instances of ButtonCommandListItem class
         */
        _renderActions: function() {
            var editor = this.props.editor;

            var actions = [
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "rowInsertBefore", description: "Insert row above", editor: editor, key: "rowinsertbefore"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "rowInsertAfter", description: "Insert row below", editor: editor, key: "rowinsertafter"}),
                React.createElement(AlloyEditor.ButtonCommandListItem, {command: "rowDelete", description: "Delete row", editor: editor, key: "rowdelete", modifiesSelection: true})
            ];

            return actions;
        },

        /**
         * Renders the button dropdown with the associated command items when the button is expanded.
         *
         * @return {Element} Returns the dropdown element if the button is expanded, null otherwise
         */
        _renderDropdown: function() {
            if (this.props.expanded) {
                return (
                    React.createElement("div", {className: "alloy-editor-dropdown"}, 
                        this._renderActions()
                    )
                );
            }

            return null;
        }
    });

    AlloyEditor.Buttons[ButtonTableRow.key] = AlloyEditor.ButtonTableRow = ButtonTableRow;
}());
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
    var ButtonTable = React.createClass({displayName: "ButtonTable",
        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'table'
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.props.renderExclusive) {
                return (
                    React.createElement(AlloyEditor.ButtonTableEdit, React.__spread({},  this.props))
                );
            } else {
                return (
                    React.createElement("button", {className: "alloy-editor-button", "data-type": "button-table", onClick: this.props.requestExclusive, tabIndex: this.props.tabIndex}, 
                        React.createElement("span", {className: "alloy-editor-icon-table"})
                    )
                );
            }
        }
    });

    AlloyEditor.Buttons[ButtonTable.key] = AlloyEditor.ButtonTable = ButtonTable;
}());
(function () {
    'use strict';

    /**
     * The ButtonTwitter class provides functionality for creating a link which
     * allows people to tweet part of the content in the editor.
     *
     * @class ButtonTwitter
     */
    var ButtonTwitter = React.createClass({displayName: "ButtonTwitter",
        mixins: [AlloyEditor.ButtonStateClasses],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'twitter'
        },

        /**
         * Creates or removes the twitter link on the selection.
         */
        handleClick: function() {
            var editor = this.props.editor.get('nativeEditor');

            var linkUtils = new CKEDITOR.Link(editor);

            if (this.isActive()) {
                linkUtils.remove(linkUtils.getFromSelection());
            } else {
                linkUtils.create(
                    this._getHref(),
                    {
                        'class': 'alloy-editor-twitter-link',
                        'target': '_blank'
                    }
                );
            }

            editor.fire('actionPerformed', this);
        },

        /**
         * Checks if the current selection is contained within a link that points to twitter.com/intent/tweet.
         *
         * @return {Boolean} True if the selection is inside a twitter link, false otherwise.
         */
        isActive: function() {
            var link = new CKEDITOR.Link(this.props.editor.get('nativeEditor')).getFromSelection();

            return (link && (link.getAttribute('href').indexOf('twitter.com/intent/tweet') !== -1));
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-twitter", onClick: this.handleClick, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-twitter"})
                )
            );
        },

        /**
         * Generates the appropriate twitter url based on the selected text and the configuration
         * options received via props.
         *
         * @protected
         * @return {String} A valid twitter url with the selected text and given configuration.
         */
        _getHref: function() {
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
}());
(function () {
    'use strict';

    /**
     * The ButtonUnorderedlist class provides functionality for creating unordered lists in an editor.
     *
     * @class ButtonUnorderedlist
     */
    var ButtonUnorderedlist = React.createClass({displayName: "ButtonUnorderedlist",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'ul'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-ul", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-bulleted-list"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnorderedlist.key] = AlloyEditor.ButtonUnorderedlist = ButtonUnorderedlist;
}());
(function () {
    'use strict';

    /**
     * The ButtonUnderline class provides functionality for underlying a text selection.
     *
     * @class ButtonUnderline
     */
    var ButtonUnderline = React.createClass({displayName: "ButtonUnderline",
        mixins: [AlloyEditor.ButtonStyle, AlloyEditor.ButtonStateClasses, AlloyEditor.ButtonCommand],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            editor: React.PropTypes.object.isRequired
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'underline'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                command: 'underline',
                style: {
                    element: 'u'
                }
            };
        },

        /**
         * Lifecycle. Renders the UI of the button.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var cssClass = 'alloy-editor-button ' + this.getStateClasses();

            return (
                React.createElement("button", {className: cssClass, "data-type": "button-underline", onClick: this.execCommand, tabIndex: this.props.tabIndex}, 
                    React.createElement("span", {className: "alloy-editor-icon-underline"})
                )
            );
        }
    });

    AlloyEditor.Buttons[ButtonUnderline.key] = AlloyEditor.ButtonUnderline = ButtonUnderline;
}());
(function () {
    'use strict';

    /**
     * The ToolbarAdd class provides functionality for adding content to the editor.
     *
     * @class ToolbarAdd
     */
    var ToolbarAdd = React.createClass({displayName: "ToolbarAdd",
        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        /**
         * Allows validating props being passed to the component.
         *
         * @type {Object}
         */
        propTypes: {
            gutterExclusive: React.PropTypes.object
        },

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'add'
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-button',
                gutterExclusive: {
                    left: 10,
                    top: 0
                },
                keys: {
                    next: [38, 39],
                    prev: [37, 40]
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         */
        componentDidMount: function () {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function (prevProps, prevState) {
            this._updatePosition();

            // In case of exclusive rendering, focus the first descendant (button)
            // so the user will be able to start interacting with the buttons immediately.
            if (this.props.renderExclusive) {
                this.focus();
            }
        },

        /**
         * Lifecycle. Renders the buttons for adding content.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var buttons = this._getButtons();
            var className = this._getToolbarClassName();

            return (
                React.createElement("div", {className: className, "data-tabindex": this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: "-1"}, 
                    React.createElement("div", {className: "alloy-editor-container"}, 
                        buttons
                    )
                )
            );
        },

        /**
         * Returns a list of buttons that will eventually render to HTML.
         *
         * @protected
         * @return {Object} The buttons which have to be rendered.
         */
        _getButtons: function() {
            var buttons;

            if (this.props.renderExclusive) {
                buttons = this.getToolbarButtons(this.props.config.buttons);
            } else {
                if (this.props.selectionData && this.props.selectionData.region) {
                    buttons = (
                        React.createElement("button", {className: "alloy-editor-button alloy-editor-button-add", onClick: this.props.requestExclusive.bind(this, ToolbarAdd.key)}, 
                            React.createElement("span", {className: "alloy-editor-icon-add"})
                        )
                    );
                }
            }

            return buttons;
        },

        /**
         * Returns the class name of the toolbar in case of both exclusive and normal mode.
         *
         * @protected
         * @return {String} The class name which have to be applied to the DOM element.
         */
        _getToolbarClassName: function() {
            var cssClass = 'alloy-editor-toolbar-add';

            if (this.props.renderExclusive) {
                cssClass = 'alloy-editor-toolbar ' + this.getArrowBoxClasses();
            }

            return cssClass;
        },

        /**
         * Calculates and sets the position of the toolbar in exclusive or normal mode.
         *
         * @protected
         * @method _updatePosition
         */
        _updatePosition: function() {
            var region;

            if (this.props.renderExclusive) {
                this.updatePosition();
                this.show();

            } else {
                if (this.props.selectionData) {
                    region = this.props.selectionData.region;
                }

                if (region) {
                    var domNode = React.findDOMNode(this);
                    var domElement = new CKEDITOR.dom.element(domNode);

                    var startRect = region.startRect || region;
                    var left = this.props.editor.get('nativeEditor').editable().getClientRect().left;

                    domNode.style.left = left - domNode.offsetWidth - this.props.gutterExclusive.left + 'px';
                    domNode.style.top = region.top - domNode.offsetHeight/2 + startRect.height/2 + 'px';
                    domNode.style.opacity = 1;

                    domElement.removeClass('alloy-editor-arrow-box');

                    this.cancelAnimation();
                }
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarAdd.key] = AlloyEditor.ToolbarAdd = ToolbarAdd;
}());
(function () {
    'use strict';

    /**
     * The ToolbarStyles class hosts the buttons for styling a text selection.
     *
     * @class ToolbarStyles
     */
    var ToolbarStyles = React.createClass({displayName: "ToolbarStyles",
        mixins: [AlloyEditor.WidgetDropdown, AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager, AlloyEditor.ToolbarButtons, AlloyEditor.WidgetPosition, AlloyEditor.WidgetArrowBox],

        /**
         * Lifecycle. Provides static properties to the widget.
         * - key: The name which will be used as an alias of the button in the configuration.
         */
        statics: {
            key: 'styles'
        },

        /**
         * Lifecycle. Invoked once, only on the client (not on the server),
         * immediately after the initial rendering occurs.
         */
        componentDidMount: function () {
            this._updatePosition();
        },

        /**
         * Lifecycle. Invoked immediately after the component's updates are flushed to the DOM.
         * This method is not called for the initial render.
         *
         * @param {Object} prevProps The previous state of the component's properties.
         * @param {Object} prevState Component's previous state.
         */
        componentDidUpdate: function (prevProps, prevState) {
            this._updatePosition();
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '.alloy-editor-button, .alloy-editor-toolbar-element',
                keys: {
                    next: [38, 39],
                    prev: [37, 40]
                }
            };
        },

        /**
         * Lifecycle. Renders the buttons in the toolbar according to the current selection.
         *
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            var currentSelection = this._getCurrentSelection();

            if (currentSelection) {
                var arrowBoxClasses;

                if (AlloyEditor.Lang.isFunction(currentSelection.getArrowBoxClasses)) {
                    arrowBoxClasses = currentSelection.getArrowBoxClasses();
                } else {
                    arrowBoxClasses = this.getArrowBoxClasses();
                }

                var cssClasses = 'alloy-editor-toolbar-styles ' + arrowBoxClasses;

                var buttons = this.getToolbarButtons(
                    currentSelection.buttons,
                    {
                        selectionType: currentSelection.name
                    }
                );

                return (
                    React.createElement("div", {className: cssClasses, "data-tabindex": this.props.config.tabIndex || 0, onFocus: this.focus, onKeyDown: this.handleKey, tabIndex: "-1"}, 
                        React.createElement("div", {className: "alloy-editor-container"}, 
                            buttons
                        )
                    )
                );
            } else {
                return false;
            }
        },

        /**
         * Analyzes the current editor selection and returns the selection configuration, if any,
         * that matches.
         *
         * @protected
         */
        _getCurrentSelection: function() {
            var eventPayload = this.props.editorEvent ? this.props.editorEvent.data : null,
                selection;

            if (eventPayload) {
                this.props.config.selections.some(function(item) {
                    var result = item.test({
                        data: eventPayload,
                        editor: this.props.editor
                    });

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
         * @protected
         * @method _updatePosition
         */
        _updatePosition: function() {
            var currentSelection = this._getCurrentSelection();

            var result;

            // If current selection has a function called `setPosition`, call it
            // and check the returned value. If false, fallback to the default positioning logic.
            if (currentSelection && AlloyEditor.Lang.isFunction(currentSelection.setPosition)) {
                result = currentSelection.setPosition.call(this, {
                    editor: this.props.editor,
                    editorEvent: this.props.editorEvent,
                    selectionData: this.props.selectionData
                });
            }

            if (!result) {
                this.updatePosition();
                this.show();
            }
        }
    });

    AlloyEditor.Toolbars[ToolbarStyles.key] = AlloyEditor.ToolbarStyles = ToolbarStyles;
}());
(function () {
    'use strict';

    /**
     * The main editor UI class manages a hierarchy of widgets (toolbars and buttons).
     *
     * @class UI
     */
    var UI = React.createClass({displayName: "UI",
        mixins: [AlloyEditor.WidgetExclusive, AlloyEditor.WidgetFocusManager],

        /**
         * Lifecycle. Invoked once before the component is mounted.
         */
        getInitialState: function() {
            return {
                hidden: false
            };
        },

        /**
         * Lifecycle. Returns the default values of the properties used in the widget.
         *
         * @return {Object} The default properties.
         */
        getDefaultProps: function() {
            return {
                circular: true,
                descendants: '[class*=alloy-editor-toolbar-]',
                eventsDelay: 0,
                keys: {
                    next: 9
                }
            };
        },

        /**
         * Lifecycle. Invoked once, only on the client, immediately after the initial rendering occurs.
         */
        componentDidMount: function () {
            var editor = this.props.editor.get('nativeEditor');

            editor.on('editorInteraction', this._onEditorInteraction, this);
            editor.on('actionPerformed', this._onActionPerformed, this);
            editor.on('key', this._onEditorKey, this);

            // Set up events for hiding the UI when user stops interacting with the editor.
            // This may happen when he just clicks outside of the editor. However,
            // this does not include a situation when he clicks on some button, part of
            // editor's UI.

            // It is not easy to debounce _setUIHidden on click, because if we
            // debounce it, when the handler is being invoked, the target may be no more part
            // of the editor's UI - onActionPerformed causes re-render.
            this._clickListener = function (event) {
                this._setUIHidden(event.target);
            }.bind(this);

            this._keyDownListener = CKEDITOR.tools.debounce(function(event) {
                this._setUIHidden(document.activeElement);
            }, this.props.eventsDelay, this);

            document.addEventListener('click', this._clickListener);
            document.addEventListener('keydown', this._keyDownListener);
        },

        /**
         * Lifecycle. Invoked immediately before a component is unmounted from the DOM.
         */
        componentWillUnmount: function() {
            if (this._clickListener) {
                document.removeEventListener('click', this._clickListener);
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
         * @return {Object} The content which should be rendered.
         */
        render: function() {
            if (this.state.hidden) {
                return null;
            }

            var toolbars = Object.keys(this.props.toolbars).map(function(toolbar) {
                return AlloyEditor.Toolbars[toolbar] || window[toolbar];
            });

            toolbars = this.filterExclusive(toolbars).map(function(toolbar) {
                var props = this.mergeExclusiveProps({
                    config: this.props.toolbars[toolbar.key],
                    editor: this.props.editor,
                    editorEvent: this.state.editorEvent,
                    key: toolbar.key,
                    selectionData: this.state.selectionData,
                    selections: this.props.selections,
                    trigger: this.state.trigger
                }, toolbar.key);

                return React.createElement(toolbar, props);
            }.bind(this));

            return (
                React.createElement("div", {className: "alloy-editor-toolbars", onKeyDown: this.handleKey}, 
                    toolbars
                )
            );
        },

        /**
         * Listener to the editor's `actionPerformed` event. Sets state and redraws the UI of the editor.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onActionPerformed: function(event) {
            var editor = this.props.editor.get('nativeEditor');

            editor.focus();

            this.setState({
                itemExclusive: null,
                selectionData: editor.getSelectionData(),
                trigger: event.data
            });
        },

        /**
         * Listener to the editor's `userInteraction` event. Retrieves the data about the user selection and
         * provides it via component's state property.
         *
         * @protected
         * @param {SynteticEvent} event The provided event
         */
        _onEditorInteraction: function(event) {
            this.setState({
                editorEvent: event,
                hidden: false,
                itemExclusive: null,
                selectionData: event.data.selectionData,
                trigger: null
            });
        },

        /**
         * Focuses on the active toolbar when the combination ALT+F10 is pressed inside the editor.
         *
         * @protected
         */
        _onEditorKey: function(event) {
            var nativeEvent = event.data.domEvent.$;

            if (nativeEvent.altKey && nativeEvent.keyCode === 121) {
                this.focus();
            }
        },

        /**
         * Checks if the target with which the user interacted is part of editor's UI or it is
         * the editable area. If none of these, sets the state of editor's UI to be hidden.
         *
         * @param {DOMElement} target The DOM element with which user interacted lastly.
         */
        _setUIHidden: function(target) {
            var domNode = React.findDOMNode(this);

            if (domNode) {
                var editable = this.props.editor.get('nativeEditor').editable();
                var targetNode = new CKEDITOR.dom.node(target);

                var res = (editable.$ === target) || editable.contains(targetNode) ||
                    (new CKEDITOR.dom.element(domNode)).contains(targetNode);

                if (!res) {
                    this.setState({
                        hidden: true
                    });
                }
            }
        }
    });

    AlloyEditor.UI = UI;
}());
(function() {
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
         * instace, passing it the provided configuration attributes.
         *
         * @method initializer
         * @protected
         * @param config {Object} Configuration object literal for the editor.
         */
        initializer: function(config) {
            var node = this.get('srcNode');

            var editor = CKEDITOR.inline(node);

            editor.config.allowedContent = this.get('allowedContent');

            editor.config.toolbars = this.get('toolbars');

            editor.config.removePlugins = this.get('removePlugins');
            editor.config.extraPlugins = this.get('extraPlugins');
            editor.config.placeholderClass = this.get('placeholderClass');

            editor.config.pasteFromWordRemoveStyles = false;
            editor.config.pasteFromWordRemoveFontStyles = false;

            AlloyEditor.Lang.mix(editor.config, config);

            this._editor = editor;

            this._renderUI();
        },

        /**
         * Destructor lifecycle implementation for the AlloyEdtor class. Destroys the CKEditor
         * instance and destroys all created toolbars.
         *
         * @method destructor
         * @protected
         */
        destructor: function() {
            React.unmountComponentAtNode(this._editorUIElement);

            this._editorUIElement.parentNode.removeChild(this._editorUIElement);

            var editorInstance = CKEDITOR.instances[this.get('srcNode')];

            if (editorInstance) {
                editorInstance.destroy();
            }
        },

        /**
         * Retrieves the native CKEditor instance. Having this, the developer may use the API of CKEditor OOTB.
         *
         * @method _getNativeEditor
         * @protected
         * @return {Object} The current instance of CKEditor.
         */
        _getNativeEditor: function() {
            return this._editor;
        },

        /**
         * Renders the specified from the user toolbars
         *
         * @protected
         */
        _renderUI: function() {
            var editorUIElement = document.createElement('div');
            editorUIElement.className = 'alloy-editor-ui';

            var uiNode = this.get('uiNode') || document.body;

            if (AlloyEditor.Lang.isString(uiNode)) {
                uiNode = document.getElementById(uiNode);
            }

            uiNode.appendChild(editorUIElement);

            this._mainUI = React.render(React.createElement(AlloyEditor.UI, {
                editor: this,
                eventsDelay: this.get('eventsDelay'),
                toolbars: this.get('toolbars')
            }), editorUIElement);

            this._editorUIElement = editorUIElement;
        },

        /**
         * Validates the allowed content attribute. Look
         * [here](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent) for more information about the
         * supported values.
         *
         * @param {Any} The value to be checked
         * @protected
         * @return {Boolean} True if the current value is valid configuration, false otherwise
         */
        _validateAllowedContent: function(value) {
            return AlloyEditor.Lang.isString(value) || AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isBoolean(value);
        },

        /**
         * Validates the value of toolbars attribute
         *
         * @param {Any} The value to be checked
         * @return {Boolean} True if the current value is valid toolbars configuration, false otherwise
         */
        _validateToolbars: function(value) {
            return AlloyEditor.Lang.isObject(value) || AlloyEditor.Lang.isNull(value);
        }
    }, {
        ATTRS: {
            /**
             * Configures the allowed content for the current instance of AlloyEditor.
             * Look on the [official CKEditor API](http://docs.ckeditor.com/#!/api/CKEDITOR.config-cfg-allowedContent)
             * for more information about the valid values.
             *
             * @attribute allowedContent
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
             * The delay (timeout), in ms, after which events such like key or mouse events will be processed.
             *
             * @attribute eventsDelay
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
             * @attribute extraPlugins
             * @default 'uicore,selectionregion,dragresize,dropimages,placeholder,tabletools,tableresize,autolink'
             * @writeOnce
             * @type {String}
             */
            extraPlugins: {
                validator: AlloyEditor.Lang.isString,
                value: 'uicore,selectionregion,dragresize,dropimages,placeholder,tabletools,tableresize,autolink',
                writeOnce: true
            },

            /**
             * Retrieves the native CKEditor instance. Having this, the developer may use the full API of CKEditor.
             *
             * @attribute nativeEditor
             * @readOnly
             * @type {Object}
             */
            nativeEditor: {
                getter: '_getNativeEditor',
                readOnly: true
            },

            /**
             * Specifies the class, which should be added by Placeholder plugin
             * {{#crossLink "CKEDITOR.plugins.placeholder}}{{/crossLink}}
             * when editor is not focused.
             *
             * @attribute placeholderClass
             * @default 'alloy-editor-placeholder'
             * @writeOnce
             * @type {String}
             */
            placeholderClass: {
                validator: AlloyEditor.Lang.isString,
                value: 'alloy-editor-placeholder',
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
             * @attribute removePlugins
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
             * Specifies the type of selections, which will be handled by
             * @attribute selections
             * @type {Object}
             */
            selections: {
                validator: AlloyEditor.Lang.isArray,
                value: AlloyEditor.Selections
            },

            /**
             * The Node ID or HTMl node, which should be turned to an instance of AlloyEditor.
             *
             * @attribute srcNode
             * @type String | Node
             * @writeOnce
             */
            srcNode: {
                writeOnce: true
            },

            /**
             * TODO: Explain the configuration below
             */
            toolbars: {
                validator: '_validateToolbars',
                value: {
                    add: {
                        buttons: ['image', 'camera', 'hline', 'table'],
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
             * @attribute uiNode
             * @type String | Node
             * @writeOnce
             */
            uiNode: {
                writeOnce: true
            }
        }
    });

    AlloyEditor.Core = Core;
}());

}());